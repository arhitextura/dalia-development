

const videoSection = document.querySelector("#main-page");
const video = videoSection.querySelector("video");
//End Section
const text = videoSection.querySelector(".logo");
const end = document.querySelector("#despre");

// const videoDurationInSeconds = await videoDuration();

//Scroll Magic
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
  duration: 1200,
  triggerElement: videoSection,
  triggerHook: 0,
})
  .addIndicators()
  .setPin(videoSection)
  .addTo(controller);

//Video animation

const accelAmount = 0.15;
let SCROLLPOS = 0;
let delay = 0;

scene.on("update", (e) => {
  SCROLLPOS = e.scrollPos / 1000;
  // console.log(e.scrollPos);
});
scene.on("progress", (e)=>{
  console.log(e.progress);
})
setInterval(() => {
  delay += (SCROLLPOS - delay ) * accelAmount;
  
  video.currentTime = delay;
}, 1000/25);
