import iziToast from 'izitoast';

const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = event.target.elements.delay.value;
  const result = event.target.elements.state.value;

  createPromise(delay, result)
    .then(delay => {
      iziToast.success({
        backgroundColor: '#59a10d',
        close: false,
        closeOnClick: true,
        progressBarColor: 'white',
        title: 'Success',
        titleColor: 'white',
        position: 'topRight',
        messageColor: 'white',
        messageSize: '16px',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
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
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });

  event.target.reset();
});

function createPromise(delay, result) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (result === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
