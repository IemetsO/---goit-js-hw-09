const formEl = document.querySelector('.form');
                
const createPromise = (position, delay) => { 
  return new Promise ((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
    resolve ({position, delay})
    } else {
    reject ({position, delay})}
  }, delay)})
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });}
  
formEl.addEventListener('submit', ((e) => {
  e.preventDefault()
  const amount = formEl.elements[2].value; 
  const delay = formEl.elements[0].value;
  const step = formEl.elements[1].value;
  createPromise (1, `${delay}` )
  for (let i = 0; i < amount; i +=1){
  createPromise(`${i+2}`, `${step}`)}
}))




