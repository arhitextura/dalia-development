"use strict";
import { frameIndex, centerImageOffset } from "./utils.js";
//Selecting HTML elements
const logoSection = document.querySelector(".logo-container");
const canvas = document.querySelector("#image-sq-player");
const ctx = canvas.getContext("2d");
const svgLogo = document.querySelector(".logo_svg_dalia");
const logoText = document.querySelector(".logo-span");
const logoContainer = document.querySelector(".logo-content");
const loader = document.querySelector(".sk-folding-cube");
const imagesLoadedEvent = new Event("imagesLoaded");
//Initialize first image
let currentImg = new Image();
const imageArray = new Array();
const imgCount = 113;
currentImg.src = frameIndex(0);
//Preload all images
let loadProgress = 0;
function increaseProgress() {
  loadProgress++;
  if (Math.ceil((loadProgress / imgCount) * 100) > 99) {
    canvas.dispatchEvent(imagesLoadedEvent);
  }
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
canvas.addEventListener("imagesLoaded", () => {
  loader.style.display = "none";
});
currentImg.onload = () => {
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
  const offset = centerImageOffset(canvas.width, canvas.height);
  console.log(offset);
  ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
}

currentImg.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize, false);

//Animation
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
  duration: 2900,
  triggerHook: 0,
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

scene.on("end", () => {
  if (svgLogo.classList.contains("finished_animation")) {
    svgLogo.classList.remove("finished_animation");
  } else {
    svgLogo.classList.add("finished_animation");
  }
  if (canvas.classList.contains("loaded")) {
    canvas.classList.remove("loaded");
  } else {
    canvas.classList.add("loaded");
  }
  if (logoText.classList.contains("loaded")) {
    logoText.classList.remove("loaded");
  } else {
    logoText.classList.add("loaded");
  }
});
