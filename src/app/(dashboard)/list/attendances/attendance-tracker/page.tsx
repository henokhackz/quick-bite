"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import CafteriaAccessTrackerTable from "@/components/cafteria-access-tracker-table";
import { loadModels } from "@/hooks/useLoadModels";
import { getStudentImages} from "@/lib/actions/admin.action";
import QRScannerComponent from "@/components/qrcode-scanner";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

interface DetectedStudent {
  photo1: string;
  firstName: string;
  lastName: string;
  studentId: string;
  profilePicture: string;
  id: string;
  photos: { photoUrl: string; photoId: string; studentId: string }[];
}

interface StudentImage {
  photos: { photoUrl: string; photoId: string; studentId: string }[];
}

type Mode = "face" | "qr";

const CafteriaAccessTracker = () => {
  const [mode, setMode] = useState<Mode>("face");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectedStudent, setDetectedStudent] = useState<Partial<DetectedStudent> | null>(null);
  const [studentImages, setStudentImages] = useState<StudentImage[]>([]);
  const [matchResult, setMatchResult] = useState<{ isMatch?: boolean; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<Map<string, Float32Array>>(new Map());
  const detectionIntervalRef = useRef<number | null>(null);

  // Load models and student images
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await loadModels({ setLoaded });
      const images = await getStudentImages();
      setStudentImages(images);
      setLoading(false);
    };
    initialize();
  }, []);

  // Pre-cache descriptors
  const prepareStudentDescriptors = useCallback(async () => {
    for (const studentImage of studentImages) {
      const url = studentImage.photos[0]?.photoUrl;
      if (!url || imageCache.current.has(url)) continue;

      try {
        const img = await loadImage(url);
        const desc = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (desc?.descriptor) imageCache.current.set(url, desc.descriptor);
      } catch {
        console.warn(`Failed to load descriptor for ${url}`);
      }
    }
  }, [studentImages]);

  useEffect(() => {
    if (loaded && studentImages.length > 0) prepareStudentDescriptors();
  }, [loaded, studentImages, prepareStudentDescriptors]);

  const loadImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

  const drawFaceCanvas = useCallback(async () => {
    if (!webcamRef.current?.video || !canvasRef.current || !loaded) return;
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const size = { width: video.videoWidth, height: video.videoHeight };
    canvas.width = size.width;
    canvas.height = size.height;

    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();
    const resized = faceapi.resizeResults(detections, size);
    faceapi.draw.drawDetections(canvas, resized);
    faceapi.draw.drawFaceLandmarks(canvas, resized);
  }, [loaded]);

  const compareFace = useCallback(async () => {
    if (!webcamRef.current?.video || !loaded || imageCache.current.size === 0) return;
    const video = webcamRef.current.video;

    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection?.descriptor) {
      setMatchResult({ message: "No face detected!" });
      return;
    }

    let bestMatch: StudentImage | null = null;
    let minDistance = 0.6;

    for (const studentImage of studentImages) {
      const url = studentImage.photos[0]?.photoUrl;
      const descriptor = url && imageCache.current.get(url);
      if (!descriptor) continue;

      const distance = faceapi.euclideanDistance(detection.descriptor, descriptor);
      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = studentImage;
      }
    }

    if (bestMatch) {
      setDetectedStudent(bestMatch);
      setMatchResult({ isMatch: true, message: "Match found!" });
    } else {
      setMatchResult({ isMatch: false, message: "No match found." });
    }
  }, [loaded, studentImages]);

  // Face detection loop
  useEffect(() => {
    if (mode !== "face" || !loaded) return;

    const detectFaces = () => {
      drawFaceCanvas();
      compareFace();
      detectionIntervalRef.current = requestAnimationFrame(detectFaces);
    };
    detectionIntervalRef.current = requestAnimationFrame(detectFaces);

    return () => {
      if (detectionIntervalRef.current) {
        cancelAnimationFrame(detectionIntervalRef.current);
      }
    };
  }, [mode, loaded, drawFaceCanvas, compareFace]);


  return (
    <div className="flex flex-col gap-6 p-4 items-center justify-start min-h-screen bg-gray-100">
      <div className="flex gap-4 items-center justify-between px-12  w-full">
        <button
          onClick={() => setMode("face")}
          className={`px-4 py-2 rounded ${mode === "face" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Face Recognition
        </button>
        <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setMode("qr")}
          className={`px-4 py-2 rounded ${mode === "qr" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          QR Code
        </button>
        <Link href={'/list/attendances'} className="text-gray-800 border-gray-800 border py-2  bg-transparent px-5 rounded-lg">End Attendance </Link>

        </div>
      </div>

      {loading && <p className="text-gray-500">Loading models and images...</p>}

      {mode === "face" && (
        <div className="relative w-full max-w-md">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-lg shadow-lg"
          />
          <canvas ref={canvasRef} className="absolute top-0 left-0 rounded-lg" />
          {matchResult && <p className="mt-2 text-lg text-red-500">{matchResult.message}</p>}
        </div>
      )}

      {mode === "qr" && <QRScannerComponent/>}

      {detectedStudent && (
        <CafteriaAccessTrackerTable detectedStudent={detectedStudent as DetectedStudent} setError={setError} />
      )}
    </div>
  );
};

export default CafteriaAccessTracker;
