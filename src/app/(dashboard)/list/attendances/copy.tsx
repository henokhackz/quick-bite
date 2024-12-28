'use client';

import Webcam from 'react-webcam';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { loadModels } from '@/hooks/useLoadModels';
import { fetchStudentImages } from '@/hooks/useFetchStudentImages';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const Page = () => {
  const [loaded, setLoaded] = useState(false);
  const [matchResult, setMatchResult] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    loadModels({setLoaded});
    fetchStudentImages()
  }, []);



 


  const drawFaceCanvas = useCallback(async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      loaded &&
      canvasRef.current
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const displaySize = { width: video.videoWidth, height: video.videoHeight };

      // Set canvas size
      canvas.width = displaySize.width;
      canvas.height = displaySize.height;

      // Detect faces
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      // Resize detections to fit video dimensions
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // Clear previous drawings
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      // Draw detections
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }
  }, [loaded]);

  const compareFace = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video && loaded) {
      try {
        const video = webcamRef.current.video;

        // Detect single face from webcam
        const webcamDetection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!webcamDetection) {
          setMatchResult('No face detected in webcam feed.');
          return;
        }

        // Detect face from reference image
        const imageDetection = await faceapi
          .detectSingleFace(await faceapi.fetchImage('/mifeligew-photo.jpg'))
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!imageDetection) {
          setMatchResult('No face detected in reference image.');
          return;
        }

        // Compare descriptors
        const distance = faceapi.euclideanDistance(
          webcamDetection.descriptor,
          imageDetection.descriptor
        );
         
        if (distance <0.5) {
          console.log(distance, 'distance')
          setMatchResult('Welcome to the student cafe, bro!');
        } else {
          setMatchResult('No match found.');
        }
      } catch (error) {
        console.error('Error comparing faces:', error);
        setMatchResult('An error occurred while comparing faces.');
      }
    }
  }, [loaded]);

  useEffect(() => {
    const drawInterval = setInterval(() => {
      drawFaceCanvas();
    }, 100);
    const compareInterval = setInterval(() => {
      compareFace();
    }, 1000);
    return () => {
      clearInterval(drawInterval);
      clearInterval(compareInterval);
    }
  }, [drawFaceCanvas]);

  return (
    <div className="p-5 w-full flex flex-col gap-4">
      <div className="w-full md:w-1/2 rounded-2xl p-5 bg-cardBackground relative">
        <div className="relative" style={{ width: 1280, height: 720 }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="absolute top-0 left-0"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 pointer-events-none"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-4 bg-cardBackground">
        <div className="flex flex-col gap-4">
          <p className="text-red-400 font-bold">{matchResult}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
