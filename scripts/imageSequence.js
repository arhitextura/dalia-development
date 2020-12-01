'use strict'
import { centerImageOffset } from './utils.js'
const canvas = document.querySelector("#image-sq-player")
const ctx = canvas.getContext("2d")
const img = new Image();
const imageArray = [];
const imgCount = 113;
const pathToImage = ''
const currentFrame = index => {
  return `../images/sequence/mobile320/Dalia-blooming/dalia_blooming_phone_414_812_${index.toString().padStart(5, '0')}.png`;
}

window.onload = () => {
  canvas.classList.add('loaded')
}

img.src = currentFrame(0);
canvas.onload = () => {
  canvas.width = window.innerWidth
}

function handleLoad() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const imgOffset = centerImageOffset(img.naturalWidth, img.naturalHeight)
  ctx.drawImage(img, imgOffset.xOffset, imgOffset.yOffset)
}
function handleResize() {
  console.log("Resize happemed");
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const imgOffset = centerImageOffset(img.naturalWidth, img.naturalHeight)

  ctx.drawImage(img, imgOffset.xOffset, imgOffset.yOffset)
}

img.addEventListener('load', handleLoad)

window.addEventListener('resize', handleResize, false)
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
  duration: 1500,
  triggerHook: 1,
})
  // .addIndicators()
  // .setPin(canvas)
  .addTo(controller);


const accelAmount = 0.15;
let progress = 0;
let delay = 0;

scene.on('progress', e => {
  progress = e.progress * 113
  console.log(e);
  if (e.progress >= 1.0) {
    canvas.classList.remove('loaded');
  } else {
    if (!canvas.classList.contains('loaded')) {
      canvas.classList.add('loaded');
    }
  }
})
window.setInterval(() => {
  delay += (progress - delay) * accelAmount;
  // img.src = currentFrame(Math.floor(e.progress * 113))
  img.src = currentFrame(Math.floor(delay))
}, 1000 / 25)