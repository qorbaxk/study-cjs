// 깊은복사 이용하기
const copyObject = (target)=>{
  let result = {};
  if(typeof target === 'object' && target !== null){
    for(let prop in target){
      result[prop] = copyObject(target[prop]); // 내부 프로퍼티를 전부 돌면서 복사
    }
  }else{
    result = target;
  }
  return result;
}


let a = 10;
let b = a;
let obj1 = {c:10, d:'bbb'};
let obj2 = obj1; // 객체1 주소복사해서 객체2에 넣음
let obj3 = obj2;
let obj4 = obj3;

b = 15;
obj2.c = 20; // 내부 프로퍼티를 변경하면서, 원본 obj1 에도 영향이 감
obj3 = {c:40, d:'ddd'}; // 직접 다시 객체를 새로 저장하기 때문에 영향가지 않음
obj4 = copyObject(obj1); // 깊은복사를 이용하여 원본을 건드리지 않고 복사 
obj4.c = 50; // 그렇기 때문에 여기서 객체4의 프로퍼티만 바뀌고 객체1은 그대로임 

console.log('a는',a); //10
console.log('b는',b); //15
console.log('obj1은',obj1); //{c:20, d:'bbb'}
console.log('obj2는',obj2); //{c:20, d:'bbb'}
console.log('obj3는',obj3); //{c:40, d:'ddd'}
console.log('obj4는',obj4); //{c:50, d:'bbb'}