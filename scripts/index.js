window.addEventListener(
  "scroll",
  () => {
    console.log(window.pageYOffset);
  },
  false
);
const video = document.getElementsByClassName("video-to-scroll")[0];

console.log("length: ", video);
// function loop(){
//   video.currentTime = window.pageYOffset/250
//   window.requestAnimationFrame(loop)

// }
// window.requestAnimationFrame(loop)

setInterval(() => {
  video.currentTime = window.pageYOffset / 200;
}, 33.33);
