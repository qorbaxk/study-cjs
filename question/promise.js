// function delay(ms){
//   return new Promise(resolve=>setTimeout(resolve,ms))
// }
// delay(3000).then(()=>console.log('3초후실행'))

// //await 을 어디에 붙여야할까?
// async function f() {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("완료!"), 1000);
//   });

//   let result = await promise;

//   console.log(result); // "완료!"
// }

// f();

// then을 await으로 고치기
// function loadJson(url) {
//   return fetch(url)
//     .then(response => {
//       if (response.status == 200) {
//         return response.json();
//       } else {
//         throw new Error(response.status);
//       }
//     })
// }

// loadJson('no-such-user.json')
//   .catch(console.log); // Error: 404

// async function loadJson(url) {
//   let response = await fetch(url);

//   if (response.status == 200) {
//     let json = await response.json();
//     return json;
//   }
//   throw new Error(response.status);
// }

// loadJson("no-such-user.json").catch(console.log); // Error: 404


// resolve나 reject 하나만 반영해
let promise = new Promise(function(resolve, reject) {
  // resolve("완료");
  setTimeout(() => resolve("시간지남"),1000); 
  // reject(new Error("에러임")); 
});

console.log(promise);