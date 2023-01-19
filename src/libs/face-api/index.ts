import * as faceapi from 'face-api.js';

export const loadModels = async () => {
  const MODEL_URL = '/models';
  await Promise.all([
    faceapi.loadSsdMobilenetv1Model(MODEL_URL),
    // faceapi.loadFaceLandmarkModel(MODEL_URL),
    faceapi.loadFaceRecognitionModel(MODEL_URL),
    faceapi.loadAgeGenderModel(MODEL_URL),
    faceapi.loadFaceExpressionModel(MODEL_URL),
    // faceapi.nets.tinyFaceDetector.load(MODEL_URL),
    // faceapi.nets.ageGenderNet.load(MODEL_URL),
    // faceapi.nets.faceExpressionNet.load(MODEL_URL),
    // faceapi.nets.faceLandmark68Net.load(MODEL_URL),
    // faceapi.nets.faceRecognitionNet.load(MODEL_URL),
  ]);
};

export const EXPRESSIONS = ['happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised', 'neutral'] as const;

export type Expression = (typeof EXPRESSIONS)[number];
