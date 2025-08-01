let [sec, min, hr] = [0, 0, 0];
let display = document.getElementById("display");
let timer = null;

function stopwatch() {
  sec++;
  if (sec == 60) { sec = 0; min++; }
  if (min == 60) { min = 0; hr++; }

  let h = hr < 10 ? "0" + hr : hr;
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;

  display.innerText = `${h}:${m}:${s}`;
}

function start() {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  clearInterval(timer);
  timer = null;
  [sec, min, hr] = [0, 0, 0];
  display.innerText = "00:00:00";
}
