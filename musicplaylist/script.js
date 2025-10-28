// Lightbox + Player Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('closeBtn');
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeDisplay = document.getElementById('current-time');
const trackTitle = document.getElementById('track-title');
const playlistImages = document.querySelectorAll('.songs img');

let currentIndex = 0;
let currentPlaylist = [];
let tracks = [];

// Lightbox Functions
function openLightbox(imgSrc) {
  lightboxImg.src = imgSrc;
  lightbox.classList.add('show');
}

function closeLightbox() {
  lightbox.classList.remove('show');
  setTimeout(() => (lightbox.style.display = 'none'), 300);
  audioPlayer.pause();
}

closeBtn.addEventListener('click', closeLightbox);

// Highlight Playlist
function highlightPlaying(playlist) {
  document.querySelectorAll('.playlist').forEach(p => p.classList.remove('active'));
  playlist.classList.add('active');
}

// Play/Pause Button
playBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = '⏸️';
  } else {
    audioPlayer.pause();
    playBtn.textContent = '▶️';
  }
});

// Volume Control
volumeSlider.addEventListener('input', () => {
  audioPlayer.volume = volumeSlider.value;
});

// Progress Bar Update
audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress || 0;
  const minutes = Math.floor(audioPlayer.currentTime / 60);
  const seconds = Math.floor(audioPlayer.currentTime % 60);
  currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
});

// Seekable Progress
progressBar.addEventListener('input', () => {
  const newTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
});

// Playlist Image Click
playlistImages.forEach(img => {
  img.addEventListener('click', (event) => {
    const parent = img.closest('.playlist');
    const title = parent.querySelector('h2').textContent;
    highlightPlaying(parent);
    trackTitle.textContent = title;
    const audioSrc = event.target.getAttribute('data-audio');
    if (audioSrc) audioPlayer.src = audioSrc;
    openLightbox(event.target.src);
  });
});

// Track Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlistImages.length;
  playlistImages[currentIndex].click();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlistImages.length) % playlistImages.length;
  playlistImages[currentIndex].click();
});

// Autoplay Next Song
audioPlayer.addEventListener('ended', () => {
  nextBtn.click();
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    playBtn.click();
  } else if (e.code === 'ArrowUp') {
    audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.1);
    volumeSlider.value = audioPlayer.volume;
  } else if (e.code === 'ArrowDown') {
    audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.1);
    volumeSlider.value = audioPlayer.volume;
  }
});
