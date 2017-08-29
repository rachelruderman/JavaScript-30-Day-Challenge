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
    })
}

getVideo()
