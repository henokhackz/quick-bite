import * as faceapi from 'face-api.js';


interface LoadModelsProps {
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const loadModels = async ({setLoaded}:LoadModelsProps) => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      ]);
      setLoaded(true);
      console.log('Models loaded');
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };
