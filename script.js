const video = document.querySelector('.player__video-viewer');
const toggleBtn = document.querySelector('.player__button');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSlider = document.querySelector('input[name="playbackRate"]');
const rewindBtn = document.querySelector('.rewind');
const forwardBtn = document.querySelector('.forward');

function togglePlay() {
  if (video.paused) {
    video.play();
    toggleBtn.textContent = '❚ ❚';
  } else {
    video.pause();
    toggleBtn.textContent = '►';
  }
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleVolume() {
  video.volume = this.value;
}

function handlePlayback() {
  video.playbackRate = this.value;
}

function rewind() {
  video.currentTime -= 10;
}

function forward() {
  video.currentTime += 25;
}

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
toggleBtn.addEventListener('click', togglePlay);
progress.addEventListener('click', scrub);
volumeSlider.addEventListener('input', handleVolume);
playbackSlider.addEventListener('input', handlePlayback);
rewindBtn.addEventListener('click', rewind);
forwardBtn.addEventListener('click', forward);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

video.volume = 0.75;
video.playbackRate = 1;