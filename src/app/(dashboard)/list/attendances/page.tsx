"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import CafteriaAccessTrackerTable from "@/components/cafteria-access-tracker-table";
import { loadModels } from "@/hooks/useLoadModels";
import { getStudentDetailsById, getStudentImages } from "@/lib/actions/admin.action";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

interface DetectedStudent {
  firstName: string;
  lastName: string;
  studentId: string;
  profilePicture: string;
}

interface StudentImage {
  photos: { photoUrl: string; photoId: string }[];
}

type StudentImages = StudentImage[];

interface MatchResult {
  isMatch?: boolean;
  message: string;
}

const CafteriaAccessTracker = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectedStudent, setDetectedStudent] =
    useState<Partial<DetectedStudent> | null>(null);
  const [studentImages, setStudentImages] = useState<StudentImages>([]);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  console.log(detectedStudent, "detected student");
  // Fetch student images once on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const images = await getStudentImages();
        setStudentImages(images);
      } catch (error) {
        console.error("Error fetching student images:", error);
      } finally {
        setLoading(false);
      }
    };

    const initialize = async () => {
      await loadModels({ setLoaded });
      fetchImages();
    };

    initialize();
  }, []);

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

  const compareFace = useCallback(async () => {
    if (!webcamRef.current?.video || !loaded || studentImages.length === 0) return;

    const video = webcamRef.current.video;
    const webcamDetection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!webcamDetection) {
      setMatchResult({ message: "No face detected!" });
      return;
    }

    let closestMatch: StudentImage | null = null;
    let smallestDistance = Number.MAX_VALUE;

    for (const studentImage of studentImages) {
      const referencePhotoUrl = studentImage.photos[0]?.photoUrl;

      if (!referencePhotoUrl) continue;

      let referencePhoto = imageCache.current.get(referencePhotoUrl);
      if (!referencePhoto) {
        try {
          referencePhoto = await loadImage(referencePhotoUrl);
          imageCache.current.set(referencePhotoUrl, referencePhoto);
        } catch (error) {
          console.error("Error loading reference photo:", error);
          continue;
        }
      }

      const referencePhotoDetection = await faceapi
        .detectSingleFace(referencePhoto, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!referencePhotoDetection) continue;

      const distance = faceapi.euclideanDistance(
        webcamDetection.descriptor,
        referencePhotoDetection.descriptor!
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestMatch = studentImage;
      }
    }

    if (smallestDistance < 0.6 && closestMatch) {
      console.log(closestMatch, 'closest match')
      const studentId = closestMatch.photos[0]?.studentId;
      console.log(studentId, 'student id ')
      const { data } = await getStudentDetailsById(studentId);
      console.log(data, 'from studetn data')
      if (data) setDetectedStudent(data);
 
      setMatchResult({
        isMatch: true,
        message: "Student recognized successfully!",
      });
    } else {
      setMatchResult({
        isMatch: false,
        message: "No match found in the database.",
      });
    }
  }, [loaded, studentImages]);

  const loadImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

  useEffect(() => {
    const drawInterval = setInterval(drawFaceCanvas, 500);
    const compareInterval = setInterval(compareFace, 5000);

    return () => {
      clearInterval(drawInterval);
      clearInterval(compareInterval);
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
              matchResult?.isMatch ? "text-green-400" : "text-red-400"
            }`}
          >
            {matchResult?.message}
          </h3>
          <div className="relative h-full">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="absolute top-0 left-0 rounded-2xl w-full"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 rounded-2xl w-full pointer-events-none"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-cardBackground rounded-2xl flex flex-col items-center p-5 shadow-md">
          {detectedStudent && (
            <CafteriaAccessTrackerTable detectedStudent={detectedStudent} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CafteriaAccessTracker;
