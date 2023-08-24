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
// let work = [];
// let time = 0;
// function worker(data) {
//   console.log("worker get", data);
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

// async function delayWork() {
//   let loop = setInterval(() => {
//     console.log("timestamp:", ++time);
//   }, 1000);
//   const work1 = await hardWork1();
//   console.log("work1 done", work1);
//   const work2 = await hardWork2();
//   console.log("work2 done", work2);
//   worker(work1);
//   worker(work2);
//   clearInterval(loop);
//   console.log(work);
// }
// delayWork();

// callback을 사용해야하는 상황
// 1. callback 이후의 소스코드가 선행으로 작업이 필요할 때

// promise를 사용해야하는 상황
// 1. 동시에 결과를 받아 처리해야 할 때

// async/await를 사용해야하는 상황
// 1. 소스코드 순차적으로 결과를 받고 실행되어야 할 때

const workList = [];
let time = 0;

console.log(time);
const loop = setInterval(() => {
  console.log(++time);
}, 1000);

function hardWork1(worker) {
  setTimeout(() => {
    worker("read");
  }, 1000);
}
function hardWork2(worker) {
  setTimeout(() => {
    worker("write");
  }, 5000);
}
function hardWork3(worker) {
  setTimeout(() => {
    worker("delete");
  }, 1000);
}

hardWork1((work1) => {
  workList.push(work1);
  console.log("work1 done");
  hardWork2((work2) => {
    workList.push(work2);
    console.log("work2 done");
    hardWork3((work3) => {
      workList.push(work3);
      console.log("work3 done");
      console.log(workList);
      clearInterval(loop);
    });
  });
});

// const workList = [];
// let time = 0;

// console.log(time);
// const loop = setInterval(() => {
//   console.log(++time);
// }, 1000);

// function hardWork1() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("read");
//     }, 1000);
//   });
// }
// function hardWork2() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("write");
//     }, 5000);
//   });
// }
// function hardWork3() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("delete");
//     }, 1000);
//   });
// }

// hardWork1()
//   .then((data) => {
//     workList.push(data);
//     console.log("work1 done");
//   })
//   .then(() => hardWork2())
//   .then((data) => {
//     workList.push(data);
//     console.log("work2 done");
//   })
//   .then(() => hardWork3())
//   .then((data) => {
//     workList.push(data);
//     console.log("work3 done");
//   })
//   .finally(() => {
//     console.log(workList);
//     clearInterval(loop);
//   });
// hardWork1()
//   .then(data => workList.push(data))
//   .then(() => hardWork2())
//   .then(data => workList.push(data))
//   .then(() => hardWork3())
//   .then(data => workList.push(data))
//   .finally(() => {
//     console.log(workList);
//     clearInterval(loop);
//   });

// const workList = [];
// let time = 0;

// console.log(time);
// const loop = setInterval(() => {
//   console.log(++time);
// }, 1000);

// function hardWork1() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("read");
//     }, 1000);
//   });
// }
// function hardWork2() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("write");
//     }, 5000);
//   });
// }
// function hardWork3() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("delete");
//     }, 1000);
//   });
// }

// (async () => {
//   const hardWorkResult1 = await hardWork1();
//   console.log("work1 done");
//   const hardWorkResult2 = await hardWork2();
//   console.log("work2 done");
//   const hardWorkResult3 = await hardWork3();
//   console.log("work3 done");
//   workList.push(hardWorkResult1, hardWorkResult2, hardWorkResult3);
//   console.log(workList);
//   clearInterval(loop);
// })();

// const workList = [];
// let time = 0;

// console.log(time);
// const loop = setInterval(() => {
//   console.log(++time);
// }, 1000);

// function hardWork1() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("read");
//       console.log("work1 done");
//     }, 1000);
//   });
// }
// function hardWork2() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("write");
//       console.log("work2 done");
//     }, 5000);
//   });
// }
// function hardWork3() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("delete");
//       console.log("work3 done");
//     }, 1000);
//   });
// }

// (async () => {
//   const syncList = await Promise.all([hardWork1(), hardWork2(), hardWork3()]);
//   workList.push(...syncList);
//   console.log(workList);
//   clearInterval(loop);
// })();
// 22222222
//123123123123123213123123123123
// 22222222
