import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
};

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const amount = formEl.elements[2].value;
  const delay = formEl.elements[0].value;
  const step = formEl.elements[1].value;

  if (amount < 0 || delay < 0 || step < 0) {
    Notiflix.Notify.warning('Значення має бути вище 0');
    return;
  } else {
    createPromise(1, `${delay}`);
    for (let i = 0; i < amount; i += 1) {
      createPromise(`${i + 2}`, `${step * (i + 1)}`);
    }
  }
});
