export function centerImageOffset(imgWidth, imgHeight) {
    const xOffset = Math.floor((window.innerWidth - imgWidth) / 2)
    const yOffset = Math.floor((window.innerHeight - imgHeight) / 2)
    return { xOffset: xOffset, yOffset: yOffset }
}

export function loadImageSequenceBasedOnWidth(){
    
}