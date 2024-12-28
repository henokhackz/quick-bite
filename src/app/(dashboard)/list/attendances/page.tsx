"use client";
import CafteriaAccessTrackerTable from "@/components/cafteria-access-tracker-table";
import Webcam from "react-webcam";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { loadModels } from "@/hooks/useLoadModels";
import { getStudentById, getStudentImages } from "@/lib/actions/admin.action";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

interface DetectedStudent {
  firstName: string;
  lastName: string;
  photo1: string;
  studentId: string;
}

interface studentImage {
  id: string;
  photo1: string;
  photo2: string;
}
interface MatchResult {
  isMatch?: boolean;
  message: string;
}

const CafteriaAccessTracker = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectedStudent, setDetectedStudent] =
    useState<DetectedStudent | null>(null);
  const [studentImages, setStudentImages] = useState<studentImage[]>([]);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  // Fetch student images from database once on mount
  useEffect(() => {
    const initialize = async () => {
      try {
        await loadModels({ setLoaded });
        setLoading(true);
        const data = await getStudentImages();
        setStudentImages(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error initializing:", error);
      }
    };
    initialize();
  }, []);

  // Draw face landmarks on canvas
  const drawFaceCanvas = useCallback(async () => {
    if (webcamRef.current?.video && loaded && canvasRef.current) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      canvas.width = displaySize.width;
      canvas.height = displaySize.height;

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }
  }, [loaded]);

  // Compare faces between webcam and student images
  const compareFace = useCallback(async () => {
    if (webcamRef.current?.video && loaded && studentImages.length) {
      const video = webcamRef.current.video;
      const webcamDetection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      console.log(
        typeof webcamDetection?.descriptor,
        "webcamDetection",
        webcamDetection
      );

      if (!webcamDetection) {
        setMatchResult({
          message: "No one's here—probably in the cafeteria already!",
        });
        return;
      }

      let closestMatch: studentImage | null = null;
      let smallestDistance = Number.MAX_VALUE;

      for (const studentImage of studentImages) {
        let referencePhoto1: HTMLImageElement | null =
          imageCache.current.get(studentImage.photo1) || null;
        let referencePhoto2: HTMLImageElement | null =
          imageCache.current.get(studentImage.photo2) || null;

        // Load reference images only if not cached
        if (!referencePhoto1) {
          try {
            referencePhoto1 = await loadImage(studentImage.photo1);
            imageCache.current.set(studentImage.photo1, referencePhoto1);
          } catch (error) {
            console.error("Error loading reference image 1:", error);
            continue;
          }
        }

        if (!referencePhoto2) {
          try {
            referencePhoto2 = await loadImage(studentImage.photo2);
            imageCache.current.set(studentImage.photo2, referencePhoto2);
          } catch (error) {
            console.error("Error loading reference image 2:", error);
            continue;
          }
        }

        const referencePhoto1Detection = await faceapi
          .detectSingleFace(
            referencePhoto1,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        const referencePhoto2Detection = await faceapi
          .detectSingleFace(
            referencePhoto2,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!referencePhoto1Detection || !referencePhoto2Detection) continue;

        const photo1Distance = faceapi.euclideanDistance(
          webcamDetection.descriptor,
          referencePhoto1Detection?.descriptor!
        );
        const photo2Distance = faceapi.euclideanDistance(
          webcamDetection.descriptor,
          referencePhoto2Detection?.descriptor!
        );
        const smallerDistance = Math.min(photo1Distance, photo2Distance);

        if (smallerDistance < smallestDistance) {
          smallestDistance = smallerDistance;
          closestMatch = studentImage;
        }
      }
      console.error(smallestDistance, "smallestDistance");

      if (smallestDistance < 0.5 && closestMatch) {
        const { data } = await getStudentById(closestMatch.id);
        if (data) {
          setDetectedStudent(data);
        }

        setMatchResult({
          isMatch: true,
          message:
            "Detected: A student with a permanent spot in the cafeteria line!",
        });
      } else {
        setMatchResult({
          isMatch: false,
          message:
            "We see you, but the database says you’re playing hide-and-seek!",
        });
      }
    }
  }, [loaded, studentImages]);

  // Load image utility function
  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img") as HTMLImageElement;
      img.crossOrigin = "anonymous";
      img.src = url;

      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  // Start face drawing and comparison at intervals
  useEffect(() => {
    const drawInterval = setInterval(drawFaceCanvas, 300);
    const compareInterval = setInterval(compareFace, 7000);

    return () => {
      clearInterval(drawInterval);
      clearInterval(compareInterval);
      imageCache.current.clear();
      canvasRef.current
        ?.getContext("2d")
        ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (webcamRef.current?.video) {
        webcamRef.current.video.srcObject = null;
      }
    };
  }, [drawFaceCanvas, compareFace]);

  if (!loaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5">
      <div className="bg-cardBackground rounded-lg p-5 w-full h-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 h-full bg-cardBackground rounded-2xl shadow-md">
          <h3
            className={`text-sm font-semibold ${
              matchResult?.isMatch ? "text-gray-400 " : "text-red-400"
            }`}
          >
            {matchResult?.message}
          </h3>
          {!matchResult?.isMatch && matchResult?.isMatch != undefined && (
            <audio src="/error.mp3" autoPlay />
          )}
          <div className="p-5 w-full flex flex-col gap-4 relative h-full">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="absolute top-0 left-0 rounded-2xl w-full p-5"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 rounded-2xl w-full p-5 pointer-events-none"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full bg-cardBackground rounded-2xl flex flex-col items-center justify-start p-5 py-12 shadow-md">
          {detectedStudent && (
            <CafteriaAccessTrackerTable detectedStudent={detectedStudent} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CafteriaAccessTracker;
