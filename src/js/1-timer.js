'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import imageUrl from '../img/close.png';

const startBtn = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');
let userSelectedDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        iconUrl: imageUrl,
        theme: 'dark',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);


startBtn.addEventListener('click', () => {
  if (!userSelectedDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a date and time.',
      titleColor: '#fff',
      titleSize: '16px',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      iconUrl: imageUrl,
      theme: 'dark',
    });
    return;
  }
  startBtn.disabled = true;
  datePicker.disabled = true;

  const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };

  const interval = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    if (diff <= 0) {
      clearInterval(interval);
      iziToast.success({
        title: 'Completed',
        message: 'The countdown has finished!',
        titleColor: '#fff',
        titleSize: '16px',
        position: 'topRight',
        backgroundColor: 'green',
        messageColor: 'white',
        theme: 'dark',
      });
      return;
    }

    const time = convertMs(diff);
    updateClockface(timerFields, time);
  }, 1000);
});

function convertMs(ms) {
  
  const s = 1000;
  const m = s * 60;
  const h = m * 60;
  const d = h * 24;

 
  const days = Math.floor(ms / d);
 
  const hours = Math.floor((ms % d) / h);
 
  const minutes = Math.floor(((ms % d) % h) / m);
  
  const seconds = Math.floor((((ms % d) % h) % m) / s);

  return { days, hours, minutes, seconds };
}



function updateClockface(timerFields, { days, hours, minutes, seconds }) {
  timerFields.days.textContent = String(days).padStart(2, '0');
  timerFields.hours.textContent = String(hours).padStart(2, '0');
  timerFields.minutes.textContent = String(minutes).padStart(2, '0');
  timerFields.seconds.textContent = String(seconds).padStart(2, '0');
}