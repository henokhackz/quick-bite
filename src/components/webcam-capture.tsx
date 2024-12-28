'use client'
import { Camera } from "lucide-react";
import { useCallback, useRef } from "react";
import Webcam from "react-webcam";

// Define video constraints for the webcam
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export const WebcamCapture = ({ pictures, setPictures }: { pictures: File[], setPictures: React.Dispatch<React.SetStateAction<File[]>> }) => {

  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    let imageSrc;

    if (webcamRef.current !== null) {
      // Capture the screenshot from the webcam
      // @ts-ignore
      imageSrc = webcamRef.current.getScreenshot();
      const blob = new Blob([imageSrc!], { type: "image/jpeg" });
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });

      setPictures(prevPictures => [...prevPictures, file]);
    }
  }, [webcamRef, setPictures]);

  return (
    <div className="h-full w-full ">
      <Webcam
        audio={false}
        height={1280}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={720}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture} className=" text-cardForeground py-2 px-4 rounded-md">
        <Camera/>
      </button>
    </div>
  );
};
