console.log(1267868763)
document.querySelector('body').style.background = '#000'
document.querySelector('body').style.height = '100vh'
let a = [1, 2, 3, 4, 5];
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 1000);
})
promise().then(() => {
  console.log(...a)
})  