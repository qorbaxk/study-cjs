// let obj = {
//   array: [1, 2, 3],
//   foo: function (v, i) {
//     console.log(this, v, i);
//   },
// };

// // 1.
// obj.foo(4, 5);

// // 2.
// [10, 20, 30].forEach(obj.foo);

/* [10,20,30].forEach(function(a, b) {
  console.log(this, a, b); 
}); 
  이렇게 foo 함수 자체가 들어가있는것으로 봐야함
*/

//객체의 소속이었던 메서드를 콜백함수로써(전달인자로) 전달하면, 그 콜백함수 내부에서 this는 더이상 그 자신의 속해있던 객체를 바라보지 않게 된다는 것이다.

// console.log('------------------------------------');


// let obj2 = {
//   outer: function () {
//     let inner = function () {
//       console.log(this); // --- (2)
//     }

//     console.log(this); // --- (1)
//     // inner.call(this);
//     // inner()
//   }
// }

// obj2.outer();


let obj1 = {
  name:'obj1',
  func:function(){
    console.log(this.name);
  }
};

// obj1.func(); // 괄호를 붙여서 실행했기 때문에 obj1 객체로써 소환한거라 this는 obj1으로 잘 잡음
let callback = obj1.func.bind(obj1);
setTimeout(callback,1000); // 여기서는 괄호없이 obj1.func 만 불렀는데 이건 함수를 실행시킨게 아니고 1초뒤에 obj1.func을 가져와 하는 콜백함수 그러니까
/* 
  setTimeout(function(){console.log(this)},1000) 이렇게 써있는거랑 똑같다
  그래서 그냥 함수를 실행하는 것이기 때문에 this를 window로 잡게됨
  그래서 콜백함수도 함수이기 때문에 this를 바인딩해줘야한다는 소리가 나오는거임
  앞에 점이있으면 그 앞 객체를 디스로 바인딩한다고 생각하지만, 그것은 우리가 평소함수를 호출할때에나 적용되는것!
*/

// let obj2 = {
//   name:'obj2',
//   func:obj1.func
// }
// let callback2 = obj2.func;
// setTimeout(callback2, 1500);

let obj3 = {
  name:'obj3'
};
let callback3 = obj1.func.bind(obj3);
setTimeout(callback3, 2000)

// var obj1 = {
//   name: 'obj1',
//   func: function () {
//       var self = this;
//       return function () {
//           console.log(self.name);
//       };
//   }
// };
// var callback = obj1.func();
// setTimeout(callback, 1000);
// var obj2 = {
//   name: 'obj2',
//   func: obj1.func,
// };
// var callback2 = obj2.func();
// setTimeout(callback2, 1500);

// var obj3 = { name: 'obj3' };
// var callback3 = obj1.func.call(obj3);
// setTimeout(callback3, 2000);