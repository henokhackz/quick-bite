'use client';
import CafteriaAccessTrackerTable from '@/components/cafteria-access-tracker-table'
import Image from 'next/image'
import Webcam from 'react-webcam';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { loadModels } from '@/hooks/useLoadModels';
import { getStudentImages } from "@/lib/actions/admin.action";


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  
const CafteriaAccessTracker = () => {
    
    const [loaded, setLoaded] = useState(false);
  const [matchResult, setMatchResult] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcamRef = useRef<Webcam>(null);

//   fetch students images from database
const fetchStudentImages = useCallback(async () => {
    try {
      const data = await getStudentImages()
      console.log(data, 'from database')

    } catch (error) {
      console.error('Error fetching student images:', error);
      return [];
    }
  }, []);


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
    <div className='min-h-screen p-5 '>

      <div className='bg-cardBackground rounded-lg p-5 w-full h-full flex flex-col md:flex-row gap-4'>
          <div className='w-full md:w-1/2 h-full bg-cardBackground rounded-2xl border border-gray-400'>
          <div className="p-5 w-full flex flex-col gap-4">
      <div className="w-fullrounded-2xl p-5 bg-cardBackground relative">
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
          </div> 
          <div className='w-full md:w-1/2 h-full bg-cardBackground rounded-2xl flex flex-col items-center justify-start p-5 py-12 shadow-md'>
            <div className='w-full flex gap-2 items-center mb-6 '>
            <Image src={'/food.jpg'} alt='food' width={500} height={500} className='w-[100px] h-[100px] object-cover rounded-full animate-pulse duration-1000'/>
             <div className='flex flex-col'>
             <h3 className='text-2xl font-bold text-cardForeground'>Spicy Grilled Chicken Salad </h3>
             <p className='font-medium text-xs text-gray-500'> A zesty and refreshing salad made with tender grilled chicken, crisp mixed greens, juicy cherry tomatoes, and a tangy spicy dressing</p>

             </div>
            </div>
            <div className='flex gap-2  w-full'>
            <CafteriaAccessTrackerTable />
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default CafteriaAccessTracker
