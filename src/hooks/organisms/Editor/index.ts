import { FACE } from '@/constants';
import { useLazy } from '@/hooks/useLazy';
import { drawText, drawMosaic, drawEmoji, putImage } from '@/libs/canvas';
import { loadModels } from '@/libs/face-api';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import * as faceapi from 'face-api.js';

interface Face {
  hidden: boolean;
  box: faceapi.Box;
  type: (typeof FACE.TYPES)[number];
  mosaicSize: number;
  expression: (typeof FACE.EXPRESSIONS)[number];
  image?: File;
}

export const useEditor = (file: File) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const fullSizeCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [faceList, setFaceList] = useState<Face[]>([]);

  const activeFace = useMemo(() => faceList[activeIndex], [activeIndex, faceList]);

  const getCtx = useCallback((fullSize?: boolean) => {
    if (!canvasRef.current || !fullSizeCanvasRef.current) return;
    return (fullSize ? fullSizeCanvasRef.current : canvasRef.current).getContext('2d');
  }, []);

  const getCanvas = useCallback((fullSize?: boolean) => {
    if (!canvasRef.current || !fullSizeCanvasRef.current) return;
    return fullSize ? fullSizeCanvasRef.current : canvasRef.current;
  }, []);

  const drawOriginImage = useCallback(
    async (fullSize?: boolean) => {
      const canvas = getCanvas(fullSize);
      const ctx = getCtx(fullSize);
      const img = await faceapi.fetchImage(URL.createObjectURL(file));

      if (!canvas || !ctx) return;

      canvas.width = fullSize ? img.width : 600;
      canvas.height = fullSize ? img.height : 600 * (img.height / img.width);

      if (fullSize) ctx.drawImage(img, 0, 0, img.width, img.height);
      else ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

      return img;
    },
    [file, getCanvas, getCtx],
  );

  const detectAllFaces = useCallback(async (img: HTMLImageElement, fullSize?: boolean) => {
    await loadModels();
    const fData = await faceapi.detectAllFaces(img).withFaceExpressions();

    if (fullSize) return fData;

    return faceapi.resizeResults(fData, {
      width: FACE.PREVIEW_SIZE,
      height: FACE.PREVIEW_SIZE * (img.height / img.width),
    });
  }, []);

  const applyFaceDrawing = useCallback(
    async (faceNo: number, face: Face, fullSize?: boolean) => {
      const ctx = getCtx(fullSize);
      if (!ctx) return;

      const { box, hidden, mosaicSize, type, expression, image } = face;

      if (!fullSize) drawText(ctx, `Face ${faceNo + 1}`, { x: box.x, y: box.y - 10 });

      if (!hidden) return;

      if (type === 'mosaic') drawMosaic(ctx, box, mosaicSize);
      else if (type === 'emoji') await drawEmoji(ctx, box, expression);
      else if (type === 'own') {
        if (image) await putImage(ctx, box, image);
        else {
          ctx.strokeRect(box.x, box.y, box.width, box.height);
          drawText(ctx, 'No image', { x: box.x, y: box.bottom + 20 }, 14);
        }
      }

      if (!fullSize || !anchorRef.current || !fullSizeCanvasRef.current) return;
      anchorRef.current.href = fullSizeCanvasRef.current.toDataURL('image/png');
    },
    [getCtx],
  );

  const init = useCallback(async () => {
    const img = await drawOriginImage();
    if (!img) return;

    const faceData = await detectAllFaces(img);

    setFaceList(
      Array.from(faceData).map(({ detection: { box }, expressions }, i) => {
        const exps = expressions.asSortedArray();
        const exp = exps.reduce((prev, curt) => (curt.probability > prev.probability ? curt : prev), exps[0]);
        const expression = FACE.EXPRESSIONS.find((e) => e === exp.expression) || 'neutral';
        const face: Face = { hidden: true, box, mosaicSize: FACE.DEFAULT_MOSAIC_SIZE, type: 'mosaic', expression };
        applyFaceDrawing(i, face);
        return face;
      }),
    );
    setIsLoading(false);
  }, [detectAllFaces, applyFaceDrawing, drawOriginImage]);

  const downloadFullSize = useCallback(async () => {
    setIsDownloading(true);
    const img = await drawOriginImage(true);
    if (!img || !anchorRef.current) return;

    const fData = await detectAllFaces(img, true);
    await Promise.all(
      Array.from(fData).map(async ({ detection: { box } }, i) => {
        await applyFaceDrawing(i, { ...faceList[i], box }, true);
      }),
    );
    setIsDownloading(false);
    anchorRef.current.click();
  }, [detectAllFaces, applyFaceDrawing, drawOriginImage, faceList]);

  const updateFaceList = useCallback(
    async (face: Face) => {
      await drawOriginImage();

      setFaceList((prev) =>
        prev.map((data, i) => {
          const updates = i === activeIndex ? face : data;
          (async () => await applyFaceDrawing(i, updates))();
          return updates;
        }),
      );
    },
    [activeIndex, drawOriginImage, applyFaceDrawing],
  );

  const lazyUpdateFaceList = useLazy(updateFaceList, 500);

  useEffect(() => {
    init();
  }, [init]);

  return {
    isLoading,
    faceList,
    activeFace,
    isDownloading,

    setActiveIndex,
    updateFaceList,
    lazyUpdateFaceList,
    downloadFullSize,

    canvasRef,
    anchorRef,
    fullSizeCanvasRef,
  };
};
