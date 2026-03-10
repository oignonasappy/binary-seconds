import { findBestPacking } from './lib';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

console.log(
  `new Date(): ${new Date()}\n` +
  `new Date().getTime(): ${new Date().getTime()}\n` +
  `new Date().getSeconds(): ${new Date().getSeconds()}\n` +
  `new Date().getUTCSeconds(): ${new Date().getUTCSeconds()}\n` +
  `new Date().getTime() / 1000: ${new Date().getTime() / 1000}\n` +
  `Math.log2(new Date().getTime() / 1000): ${Math.log2(new Date().getTime() / 1000)}`
);

// ここで、32個の全てが同じ大きさの正方形を、決められた並べ方で、与えられた広さの長方形の空間に最大限広く敷き詰めるには？そしてそれをプログラムで求めるには？
// 正方形の1つあたりの大きさは自由に決まる。
// 正方形の敷き詰め方は、必ず均一にn×nの長方形の形に並べる。つまりは1×32,2×16,4×8,8×4,16×2,32×1のどれかである...
// ...って、これらの敷き詰め方の中で最も広く並べられるものを探すだけか。

const canvas = document.createElement("canvas");
app.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

const dpr = window.devicePixelRatio || 1;

setInterval(() => {
  canvas.width = canvas.getBoundingClientRect().width * dpr;
  canvas.height = canvas.getBoundingClientRect().height * dpr;

  const { sideLength, rows, cols, totalArea } = findBestPacking(32, canvas.width, canvas.height)
  console.log(
    `sideLength: ${sideLength}\n` +
    `rows: ${rows}\n` +
    `cols: ${cols}\n` +
    `totalArea: ${totalArea}`
  );

  ctx.fillStyle = "#fff";
  ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 4, 4);
}, 1000);