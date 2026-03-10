import { findBestPacking } from './lib';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

const canvas = document.createElement("canvas");
app.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

const dpr = window.devicePixelRatio || 1;

setInterval(() => {
  canvas.width = canvas.getBoundingClientRect().width * dpr;
  canvas.height = canvas.getBoundingClientRect().height * dpr;

  const BITS = 32;
  const { sideLength, rows, cols } = findBestPacking(BITS, canvas.width, canvas.height)

  const seconds = Math.round(Date.now() / 1000);
  // const seconds = Math.round(new Date("2038-01-19 12:14:07").getTime() / 1000);
  // const seconds = Math.round(new Date("2038-01-19 12:14:08").getTime() / 1000);

  ctx.fillStyle = "#fff";
  for (let i = 0; i < BITS; i++) {
    if (seconds & Math.pow(2, i)) {
      ctx.fillRect(
        canvas.width / 2 - sideLength * cols / 2 + sideLength * (i % cols),
        canvas.height / 2 - sideLength * rows / 2 + sideLength * Math.floor(i / cols),
        sideLength,
        sideLength
      );
    }
  }

  ctx.fillStyle = "#f44";
  ctx.fillRect(
    canvas.width / 2 - sideLength * cols / 2 + sideLength * (cols - 1),
    canvas.height / 2 - sideLength * rows / 2 + sideLength * (rows - 1),
    sideLength,
    sideLength
  );

}, 1000);