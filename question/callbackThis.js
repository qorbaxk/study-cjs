let obj = {
  array: [1, 2, 3],
  foo: function (v, i) {
    console.log(this, v, i);
  },
};

// 1.
obj.foo(4, 5);

// 2.
[10, 20, 30].forEach(obj.foo);

/* [10,20,30].forEach(function(a, b) {
  console.log(this, a, b); 
}); 
  이렇게 foo 함수 자체가 들어가있는것으로 봐야함
*/

//객체의 소속이었던 메서드를 콜백함수로써(전달인자로) 전달하면, 그 콜백함수 내부에서 this는 더이상 그 자신의 속해있던 객체를 바라보지 않게 된다는 것이다.

console.log('------------------------------------');


let obj2 = {
  outer: function () {
    let inner = function () {
      console.log(this); // --- (2)
    }

    console.log(this); // --- (1)
    // inner.call(this);
    // inner()
  }
}

obj2.outer();