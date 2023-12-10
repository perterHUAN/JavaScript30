const toggle = document.querySelector(".toggle");
const video = document.querySelector(".viewer")
function togglePlay() {
    const method = video.paused ? "play" : "pause";
    video[method]();
}

function updateToggle() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
}

toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
// video.addEventListener("ended", handleToggle);



const ranges = document.querySelectorAll("input[type='range']");

function handleRange() {
    video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener("change", handleRange));


const skips = document.querySelectorAll("button[data-skip");

function handleSkip() {
    updatePlay(video.currentTime + parseFloat(this.dataset.skip));
    updateProgress();
}

skips.forEach(skip => skip.addEventListener("click", handleSkip));


const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress .progress__filled");


// 按下鼠标并滑动
let isDown = false;
function updateProgress() {
    progressBar.setAttribute("style",`flex-basis: ${video.currentTime / video.duration * 100}%`);
}
function updatePlay(newCurrentTime) {
    video.currentTime = newCurrentTime;
}
function handleMoveProgress(event, notIgnore=true) {
    if(!isDown && notIgnore) return;
    
    const newCurrentTime = event.offsetX / progress.offsetWidth * video.duration;
    updatePlay(newCurrentTime);
}
progress.addEventListener('mousedown', () => isDown = true);
progress.addEventListener('mouseup', () => isDown = false);
progress.addEventListener('mousemove',handleMoveProgress);
progress.addEventListener('click', (event) => handleMoveProgress(event, false));

video.addEventListener('timeupdate', updateProgress);