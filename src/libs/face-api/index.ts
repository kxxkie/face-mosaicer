import * as faceapi from 'face-api.js';

export const loadModels = async () => {
  const MODEL_URL = '/models';
  await Promise.all([
    faceapi.loadSsdMobilenetv1Model(MODEL_URL),
    faceapi.loadFaceRecognitionModel(MODEL_URL),
    faceapi.loadFaceExpressionModel(MODEL_URL),
  ]);
};

export const EXPRESSIONS = ['happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised', 'neutral'] as const;

export type Expression = (typeof EXPRESSIONS)[number];
