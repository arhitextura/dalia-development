const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const img = new Image();
const imageArray = [];
const imgCount = 111;
const pathToImage = ''
const currentFrame = index =>{
  return  `../images/sequence/mobile320/Ink/Ink_${index.toString().padStart(5, '0')}.jpg`;
}
img.src = currentFrame(40);
console.log(img);
console.log(ctx);
img.addEventListener('load', e=>{
  ctx.drawImage(img, 0, 0)
  
})