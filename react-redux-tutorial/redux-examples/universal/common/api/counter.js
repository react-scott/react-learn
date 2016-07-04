/**
 * 虚拟API
 首先，我们要模拟一个api，用于异步请求数据。
 * @param min
 * @param max
 * @returns {*}
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function fetchCounter(callback) {
  // Rather than immediately returning, we delay our code with a timeout to simulate asynchronous behavior
  setTimeout(() => {
    callback(getRandomInt(1, 100))
  }, 500)

  // In the case of a real world API call, you'll normally run into a Promise like this:
  // API.getUser().then(user => callback(user))
}
