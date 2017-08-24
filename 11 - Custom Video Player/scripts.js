//Get Our elements//
  const player = document.querySelector('.player')
  const video = player.querySelector('.viewer')
  const progress = player.querySelector('.progress')
  const progressBar = player.querySelector('.progress__filled')
  const toggle = player.querySelector('.toggle')
  const skipButtons = player.querySelectorAll('[data-skip]')
  const ranges = player.querySelectorAll('.player__slider')

//Build Our Functions//
function togglePlay(){
  const method = video.paused ? 'play' : 'pause'
  //because the method name is in a string here, we can access the method name and call it
  video[method]()
  //call it
  // if(video.paused){
    //paused is a property that lives on the video; there is no playing property
  //   video.play()
  // }else{
  //   video.pause()
// }
}

function updateButton(){
  console.log('Update the button')
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon;
  //why can we use 'this'? because it's bound to the video
}

function skip(){
  console.log(this.dataset.skip)
  //data-skip attribute in html can be neg or positive number, and on absolutely anything
  video.currentTime += parseFloat(this.dataset.skip)
  //parseFloat converts the string into a true number
}

function handleRangeUpdate(){
  video[this.name] = this.value
  console.log(this.name)
  console.log(this.value)
}

//Hook Up Event Listeners//
video.addEventListener('click', togglePlay)
//every time it's clicked, it will trigger a play or pause event, which will trigger updateButton
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
