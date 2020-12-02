"use strict";
import { frameIndex } from "./utils.js";
//Selecting HTML elements
const logoSection = document.querySelector(".logo-container");
const canvas = document.querySelector("#image-sq-player");
const ctx = canvas.getContext("2d");

//Initialize first image
let currentImg = new Image();
const imageArray = new Array();
const imgCount = 113;
currentImg.src = frameIndex(0);
//Preload all images
let loadProgress = 0;
function increaseProgress(){
  loadProgress++;
  console.log(Math.ceil(loadProgress/imgCount*100), "%");
}
function preloadImages() {
  for (let i = 0; i < imgCount; i++) {
    try {
      let img = new Image();
      img.src = frameIndex(i);
      imageArray[i] = img;
      img.onload = () => increaseProgress()
    } catch (error) {
      console.log("Error loading image: ", error);
    }
  }
}
preloadImages();

currentImg.onload = () => {
  console.log("First Image loaded");
  canvas.classList.add("loaded");
  drawImageActualSize();
};

function handleLoad() {
  drawImageActualSize();
}
function handleResize() {
  drawImageActualSize();
}

//Draw the actual size of the image, the canvas is centered by the css
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
  try {
    
  } catch (error) {
    
  }
  ctx.drawImage(
    imageArray[Math.floor(delay)],
    0,
    0,
    canvas.width,
    canvas.height
  );
}, 1000 / 25);
