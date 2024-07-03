import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import Group from '../img/error.svg';

const inputDatetime = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

buttonStart.addEventListener('click', onButtonStartTimer);

buttonStart.disabled = true;

let userSelectedDate;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      buttonStart.disabled = false;
      userSelectedDate = selectedDates[0].getTime();
    } else {
      iziToast.error({
        backgroundColor: '#ef4040',
        close: false,
        closeOnClick: true,
        progressBarColor: 'white',
        title: 'Error',
        titleColor: 'white',
        position: 'topRight',
        messageColor: 'white',
        messageSize: '16px',
        message: 'Please choose a date in the future',
      });
      buttonStart.disabled = true;
    }
  },
};
flatpickr(inputDatetime, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onButtonStartTimer() {
  buttonStart.disabled = true;
  inputDatetime.disabled = true;

  timerId = setInterval(() => {
    const result = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(result);

    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);

    if (result < 1000) {
      clearInterval(timerId);
      inputDatetime.disabled = false;
    }
  }, 1000);
}
