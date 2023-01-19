import * as faceapi from 'face-api.js';
import { Expression } from '@/libs/face-api';

export const pixelMosaic = (ctx: CanvasRenderingContext2D, box: { x: number; y: number; w: number; h: number }) => {
  let r, g, b;
  r = g = b = 0;

  const src = ctx.getImageData(box.x, box.y, box.w, box.h);
  const dst = ctx.createImageData(box.w, box.h);

  for (let i = 0; i < src.data.length; i += 4) {
    r += src.data[i];
    g += src.data[i + 1];
    b += src.data[i + 2];
  }

  r /= src.data.length / 4;
  g /= src.data.length / 4;
  b /= src.data.length / 4;

  r = Math.ceil(r);
  g = Math.ceil(g);
  b = Math.ceil(b);

  for (let i = 0; i < src.data.length; i += 4) {
    dst.data[i] = r;
    dst.data[i + 1] = g;
    dst.data[i + 2] = b;
    dst.data[i + 3] = 255;
  }

  ctx.putImageData(dst, box.x, box.y);
};

export const drawMosaic = (ctx: CanvasRenderingContext2D, box: faceapi.Box, size: number) => {
  for (let i = box.x; i < box.x + box.width; i += size) {
    for (let j = box.y; j < box.y + box.height; j += size) {
      pixelMosaic(ctx, { x: i, y: j, w: size, h: size });
    }
  }
};

export const drawEmoji = async (ctx: CanvasRenderingContext2D, box: faceapi.Box, expression: Expression) => {
  const img = await faceapi.fetchImage(`/emojis/${expression}-face.svg`);
  const size = Math.max(box.width, box.height);

  const x = box.width > box.height ? box.x : box.x - (size - box.width) / 4;
  const y = box.width > box.height ? box.y - (size - box.height) / 4 : box.y;

  ctx.drawImage(img, x, y, size, size);
};

export const putImage = async (ctx: CanvasRenderingContext2D, box: faceapi.Box, file: File) => {
  const img = await faceapi.fetchImage(URL.createObjectURL(file));

  const bigger = box.width > box.height;
  const width = bigger ? box.width : box.height * (img.width / img.height);
  const height = bigger ? box.width * (img.height / img.width) : box.height;
  const x = bigger ? box.x : box.x - (width - box.width) / 2;
  const y = bigger ? box.y - (height - box.height) / 2 : box.y;

  ctx.drawImage(img, x, y, width, height);
};

export const drawText = (ctx: CanvasRenderingContext2D, text: string, pos: { x: number; y: number }, size = 20) => {
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 4;
  ctx.font = `${size}px Arial`;
  ctx.fillStyle = 'white';
  ctx.lineJoin = 'round';
  ctx.strokeText(text, pos.x, pos.y);
  ctx.fillText(text, pos.x, pos.y);
};
