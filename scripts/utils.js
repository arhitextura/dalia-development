export function centerImageOffset(imgWidth, imgHeight) {
    const xOffset = Math.floor((window.innerWidth - imgWidth) / 2)
    const yOffset = Math.floor((window.innerHeight - imgHeight) / 2)
    return { xOffset: xOffset, yOffset: yOffset }
}

/**
 * Get the image path with padding of 0 based on an index integer
 * @param {Intger} index The number of the frame
 * @argument {String} frameIndex(index, **extension**) - A string with extension
 * @returns {String} `../images/sequence/mobile320/Dalia-blooming/dalia_blooming_phone_414_812_0000index`
 */
export function frameIndex (index) {
    return `../images/sequence/mobile320/Dalia-blooming/dalia_blooming_phone_414_812_${index
      .toString()
      .padStart(5, "0")}.${arguments[1]||'png'}`;

  };