// components/webcam.tsx
'use client';

import { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'lucide-react';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

type WebcamCaptureProps = {
  setPictures: React.Dispatch<React.SetStateAction<File[]>>;
};

const WebcamCapture = ({ setPictures }: WebcamCaptureProps) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `photo-${Date.now()}.jpg`, {
          type: 'image/jpeg',
        });
        setPictures([file]); // replace previous photo
      });
  }, [setPictures]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="rounded-lg border shadow w-full max-w-md"
      />
      <button
        onClick={capture}
        type="button"
        className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <Camera size={18} />
        Capture
      </button>
    </div>
  );
};

export default WebcamCapture;
