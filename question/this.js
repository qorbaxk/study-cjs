delete window.name; 

// 메소드 대신 그냥 프로퍼티로 작성했을 때
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

console.log('1',user.ref); //this는 윈도우 전역객체
console.log('1',user.ref.name); //전역에 name 값 존재 x

// 자기값을 진짜로 호출해서 넣으면?
function makeUser2() {
  return {
    name: "John",
    aka:this.name,
  };
};

let user2 = makeUser2();

console.log('2',user2.aka);

// 메소드로 작성하되, 화살표함수를 쓴다면?
function makeUser3() {
  return {
    name: "John",
    ref:()=>{
      return this
    }
  };
};

let user3 = makeUser3();

console.log('3',user3.ref()); //this가 전역객체가 되어버림
console.log('3',user3.ref().name); //this값이 window니 못찾음

//제대로 작성한다면? (function 사용)
function makeUser4() {
  return {
    name: "John",
    ref:function(){
      return this
    }
  };
};

let user4 = makeUser4();

console.log('4',user4.ref()); //제대로 호출한 객체가 this가 됨
console.log('4',user4.ref().name); //this값을 제대로 찾았으니 name 프로퍼티도 찾음

//제대로 작성한다면? (축약으로 쓴다면)
function makeUser5() {
  return {
    name: "John",
    ref(){
      return this
    }
  };
};

let user5 = makeUser5();

console.log('5',user5.ref()); //제대로 호출한 객체가 this가 됨
console.log('5',user5.ref().name); //this값을 제대로 찾았으니 name 프로퍼티도 찾음