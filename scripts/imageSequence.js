"use strict";
import { centerImageOffset } from "./utils.js";
const logoSection = document.querySelector(".logo-container");
const canvas = document.querySelector("#image-sq-player");
const ctx = canvas.getContext("2d");
let currentImg = new Image();
const imageArray = [];
const imgCount = 113;
const pathToImage = "";
const frameIndex = (index) => {
  return `../images/sequence/mobile320/Dalia-blooming/dalia_blooming_phone_414_812_${index
    .toString()
    .padStart(5, "0")}.png`;
};
//init frame
currentImg.src = frameIndex(0);
function preloadImages() {
  for (let i = 0; i < imgCount; i++) {
    try {
      imageArray[i] = new Image();
      imageArray[i].src = frameIndex(i);
    } catch (error) {
      console.log("Error loading image: ", error);
    }
  }
  console.log(imageArray);
}
preloadImages();
window.onload = () => {
  canvas.classList.add("loaded");
};

function handleLoad() {
  drawImageActualSize();
}
function handleResize() {
  drawImageActualSize();
}
function drawImageActualSize() {
  canvas.width = currentImg.naturalWidth;
  canvas.height = currentImg.naturalHeight;
  ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
}

currentImg.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize, false);

//Animation
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
  duration: 2500,
  triggerHook: 1,
})
  // .addIndicators()
  .setPin(logoSection)
  .addTo(controller);

const accelAmount = 0.15;
let progress = 0;
let delay = 0;

scene.on("progress", (e) => {
  progress = e.progress * 113;
});
scene.on("end", (e) => {
  if (canvas.classList.contains("loaded")) {
    canvas.classList.remove("loaded");
  } else {
    canvas.classList.add("loaded");
  }
});
window.setInterval(() => {
  delay += (progress - delay) * accelAmount;
  currentImg = imageArray[Math.floor(delay)];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    imageArray[Math.floor(delay)],
    0,
    0,
    canvas.width,
    canvas.height
  );
}, 1000 / 25);
