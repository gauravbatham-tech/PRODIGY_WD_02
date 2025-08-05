let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');
const themeToggle = document.getElementById('themeToggle');

function startStopwatch() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 10);
    running = true;
    startBtn.textContent = 'Pause';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  } else {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    startBtn.textContent = 'Resume';
  }
}

function resetStopwatch() {
  clearInterval(tInterval);
  difference = 0;
  running = false;
  timeDisplay.textContent = '00:00:00.000';
  startBtn.textContent = 'Start';
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  laps.innerHTML = '';
  lapCounter = 0;
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  let hours = Math.floor(updatedTime / (1000 * 60 * 60));
  let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
  let milliseconds = updatedTime % 1000;

  timeDisplay.textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(num, digits = 2) {
  return num.toString().padStart(digits, '0');
}

function recordLap() {
  if (!running) return;
  lapCounter++;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCounter}: ${timeDisplay.textContent}`;
  laps.appendChild(lapItem);
}

function toggleTheme() {
  document.body.classList.toggle('light');
}

startBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
themeToggle.addEventListener('click', toggleTheme);

// Optional: Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 's') startStopwatch();
  if (e.key === 'l') recordLap();
  if (e.key === 'r') resetStopwatch();
});
