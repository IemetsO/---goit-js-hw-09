import flatpickr from 'flatpickr';


const buttonEl = document.querySelector('[data-start]');
const pickerEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const fp = flatpickr(pickerEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minDate: 'today',
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0]) {
      buttonEl.classList.add('active');
    } else {
      window.alert('Please choose a date in the future');
    }
  },
});

buttonEl.addEventListener('click', () => {
  if (!buttonEl.classList.contains('active')) {
    return;
  }
  timer.start();
});

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    const clientTime = new Date(pickerEl.value);
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const presentTime = Date.now();
      const deltaTime = clientTime - presentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      if (deltaTime < 1000) {
        this.stop();
      }
      updateClock({ days, hours, minutes, seconds });
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
 
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClock({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

