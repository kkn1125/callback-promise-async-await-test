/* callback 예시 */
// function receiveDelayData(data) {
//   console.log("receive data:", data);
// }

// function delayWork(cb) {
//   console.log("delay work:", "start");
//   setTimeout(() => {
//     cb("work done");
//   }, 5000);
//   console.log("delay work:", "done");
// }

// console.log("total process start");

// delayWork(receiveDelayData);

// console.log("total process done");

/* promise 예시 */
// let work = [];
// function worker(data) {
//   work.push(data);
// }

// function hardWork1() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("read");
//     }, 1000);
//   });
// }

// function hardWork2() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("write");
//     }, 5000);
//   });
// }

// 예시 1
// let work = [];
// let time = 0;
// function delayWork() {
//   let loop = setInterval(() => {
//     console.log("timestamp:", ++time);
//   }, 1000);
//   hardWork1()
//     .then((res) => {
//       worker(res);
//     })
//     .then(() => {
//       hardWork2()
//         .then((res) => {
//           worker(res);
//         })
//         .then(() => {
//           console.log(work);
//           clearInterval(loop);
//         });
//     });
// }
// delayWork();

// 예시 2
// let work = [];
// let time = 0;
// function delayWork() {
//   let loop = setInterval(() => {
//     console.log("timestamp:", ++time);
//   }, 1000);
//   Promise.all([hardWork1(), hardWork2()]).then((res) => {
//     work.push(...res);
//     clearInterval(loop);
//   });
// }
// delayWork();

// async/await 예시
let work = [];
let time = 0;
function worker(data) {
  console.log("worker get", data);
  work.push(data);
}

function hardWork1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("read");
    }, 1000);
  });
}

function hardWork2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("write");
    }, 5000);
  });
}

async function delayWork() {
  let loop = setInterval(() => {
    console.log("timestamp:", ++time);
  }, 1000);
  const work1 = await hardWork1();
  console.log("work1 done", work1);
  const work2 = await hardWork2();
  console.log("work2 done", work2);
  worker(work1);
  worker(work2);
  clearInterval(loop);
  console.log(work);
}
delayWork();

// callback을 사용해야하는 상황
// 1. callback 이후의 소스코드가 선행으로 작업이 필요할 때

// promise를 사용해야하는 상황
// 1. 동시에 결과를 받아 처리해야 할 때

// async/await를 사용해야하는 상황
// 1. 소스코드 순차적으로 결과를 받고 실행되어야 할 때
