const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  //this is how you get access to a user's video
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  //this returns a promise
    .then(localMediaStream => {
      console.log(localMediaStream)
      //src needs to be a url
      //this is how we get a live feed
      video.src = window.URL.createObjectURL(localMediaStream)
      video.play()
    })
    //we need a .catch in case you're not given the access to the webcam
    .catch(err => {
      console.error(`OH NO!!!`, err)
    })
}

function paintToCanvas(){
  //set canvas height/width to video  height/width
  const width = video.videoWidth
  const height = video.videoHeight
  console.log(width, height)
  canvas.width = width
  canvas.height = height
//you don't have to return setInterval, but if you do then you'll have access to it later
  return setInterval(() => {
    //start at the top left hand corner of the canvas, and then paint the width and the height
    ctx.drawImage(video, 0, 0, width, height)
    //take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height)
    //mess with them
    pixels = redEffect(pixels)
    // pixels = rgbSplit(pixels)
    //put them back
    ctx.putImageData(pixels, 0, 0)
  }, 16)
}

function takePhoto(){
  //audio when picture snapped
  snap.currentTime = 0
  snap.play()

  //take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg')
  //this data is an alphabetical representation of the image
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src="${data}" alt="Lovely Lady" />`
  link.textContent = 'Download Image'
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels){
  //we're not using array helpers b/c the data is in a special kind of array in JS (ClampedArray)
  for(let i = 0; i < pixels.data.length; i+=4){
    pixels.data[i] = pixels.data[i+0] + 100 //red
    pixels.data[i+1] = pixels.data[i+1] + 50//green
    pixels.data[i+2] = pixels.data[i+2] + 0.5 //blue
  }
  return pixels
}

function rgbSplit(pixels){
  //essentially just pulling apart the different red green blues
  for(let i = 0; i < pixels.data.length; i+=4){
    pixels.data[i-150] = pixels.data[i+0] + 100 //red
    pixels.data[i+100] = pixels.data[i+1] + 50//green
    pixels.data[i-550] = pixels.data[i+2] + 0.5 //blue
  }
  return pixels
}

getVideo()

//the video emits this event once it's playing, which will trigger paintToCanvas
video.addEventListener('canplay', paintToCanvas)
