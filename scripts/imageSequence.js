'use strict'
import { centerImageOffset } from './utils.js'
const logoSection = document.querySelector(".logo-container")
const canvas = document.querySelector("#image-sq-player")
const ctx = canvas.getContext("2d")
const img = new Image();
const imageArray = [];
const imgCount = 113;
const pathToImage = ''
const currentFrame = index => {
  return `https://raw.githubusercontent.com/arhitextura/dalia-development/master/images/sequence/mobile320/Dalia-blooming/dalia_blooming_phone_414_812_${index.toString().padStart(5, '0')}.png`;
}
//init frame
img.src = currentFrame(0);
// canvas.onload = () => {
//   canvas.width = window.innerWidth
// }

window.onload = () => {
  canvas.classList.add('loaded')
}

function handleLoad() {
  drawImageActualSize();
}
function handleResize() {
  
  drawImageActualSize();
}
function drawImageActualSize () {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0,0, canvas.width, canvas.height)
}

img.addEventListener('load', handleLoad)
window.addEventListener('resize', handleResize, false)

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

scene.on('progress', e => {
  progress = e.progress * 113
})
scene.on("end", e => {
  if(canvas.classList.contains('loaded')){
    canvas.classList.remove('loaded')
  } else {
    canvas.classList.add('loaded')
  }
})
window.setInterval(() => {
  delay += (progress - delay) * accelAmount;
  img.src = currentFrame(Math.floor(delay))
}, 1000 / 25)