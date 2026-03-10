import { findBestPacking } from './lib';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

const canvas = document.createElement("canvas");
app.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

const dpr = window.devicePixelRatio || 1;

const url = new URL(window.location.href);
const BITS = url.searchParams.get("64bit") !== null ? 64 : 32;

setInterval(() => {
  canvas.width = canvas.getBoundingClientRect().width * dpr;
  canvas.height = canvas.getBoundingClientRect().height * dpr;

  const { sideLength, rows, cols } = findBestPacking(BITS, canvas.width, canvas.height)

  const seconds = Math.round(Date.now() / 1000);
  // const seconds = Math.round(new Date("2038-01-19 12:14:07").getTime() / 1000);
  // const seconds = Math.round(new Date("2038-01-19 12:14:08").getTime() / 1000);

  ctx.fillStyle = "#fff";
  for (let i = 0; i < BITS; i++) {
    if (seconds & Math.pow(2, i)) {
      ctx.fillRect(
        canvas.width / 2 - sideLength * cols / 2 + sideLength * (i % cols) - 1,
        canvas.height / 2 - sideLength * rows / 2 + sideLength * Math.floor(i / cols) - 1,
        sideLength + 2,
        sideLength + 2
      );
    }
  }

  ctx.fillStyle = "#f44";
  ctx.fillRect(
    canvas.width / 2 - sideLength * cols / 2 + sideLength * (cols - 1) - 1,
    canvas.height / 2 - sideLength * rows / 2 + sideLength * (rows - 1) - 1,
    sideLength + 2,
    sideLength + 2
  );

}, 1000);