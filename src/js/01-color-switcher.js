const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);

let timerId = null;

function onStartClick() {
  if (startButton.classList.contains('disabled')) {
    console.log('кнопка не активна');
    return;
  }

  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.classList.add('disabled');
  console.log('кнопка активна');
}

function onStopClick() {
  clearInterval(timerId);
  startButton.classList.remove('disabled');
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

