'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import imageUrlSecond from '../img/green.png';
import imageUrl from '../img/close.png';

const form = document.querySelector('form');


form.addEventListener('submit', e => {
  e.preventDefault();
  const { delay, state } = e.currentTarget.elements;
  console.log(+delay.value);
  console.log(state.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve(delay.value);
      } else {
        reject(delay.value);
      }
    }, +delay.value);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delay}ms`,
        titleColor: '#fff',
        titleSize: '16px',
        position: 'topRight',
        backgroundColor: 'green',
        messageColor: 'white',
        theme: 'dark',
        iconUrl: imageUrlSecond,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        titleColor: '#fff',
        titleSize: '16px',
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        iconUrl: imageUrl,
        theme: 'dark',
      });
    });

  setTimeout(() => {
    form.reset();
  }, 3000);
});