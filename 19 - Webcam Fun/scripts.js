const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  //this is how you get acces to a user's video
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
  link.textContent = 'Download Image'
  strip.insertBefore(link, strip.firstChild)
}

getVideo()

//the video emits this event once it's playing, which will trigger paintToCanvas
video.addEventListener('canplay', paintToCanvas)
