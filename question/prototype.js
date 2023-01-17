// 프로토타입 ( prototype )

/* 
  어떤 객체를 원형(prototype)으로 삼고 이를 복제(참조) 하여 상속과 비슷한 효과를 얻는다. 

*/

function Cat(_name, _age) {
  this.name = _name;
  this.age = _age;

  this.bark = function (){
    return '냐옹'
  }
}

Cat.prototype.bark = function () {
  return this.name + "냐옹";
};

const cat1 = new Cat("해린", "18");
const cat2 = new Cat('예지', '24');

cat1.sleep = function () {
  return "zZzZ";
};

cat1.bark = function () {
  return "안녕" + this.name;
};
cat2.learn = function () {
  return "안녕하세요";
};
console.log(cat1);
console.log(cat1.bark());
console.log(cat1.__proto__.bark());
console.log(cat1.__proto__.bark.call(cat1));
console.log(cat1.sleep());
console.log(cat2);
console.log(cat2.bark());
console.log(cat2.learn());
