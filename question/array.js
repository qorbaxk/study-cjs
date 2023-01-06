// 1. border-left-width를 borderLeftWidth로 변경하기
const camelize = (str) => {
  let arr = str.split("-");
  return arr
    .map((v, i) => (i !== 0 ? v.slice(0, 1).toUpperCase() + v.slice(1) : v))
    .join("");
};
console.log(camelize("background-color") == "backgroundColor");
console.log(camelize("list-style-image") == "listStyleImage");
console.log(camelize("-webkit-transition") == "WebkitTransition");

console.log("-----------------------------");
// 2. 특정 범위에 속하는 요소 찾기
let arr = [5, 3, 8, 1];

const filterRange = (arr, num1, num2) => {
  let max = Math.max(num1, num2);
  let min = Math.min(num1, num2);

  return arr.filter((v) => min <= v && max >= v);
};

let filtered = filterRange(arr, 1, 4);

console.log(filtered); // 3,1 (조건에 맞는 요소)
console.log(arr); // 5,3,8,1 (기존 배열은 변경되지 않았습니다.)

console.log("-----------------------------");
// 3. 특정 범위에 속하는 요소 찾기 (배열 변경하기)
const filterRangeInPlace = (arr, num1, num2) => {
  let max = Math.max(num1, num2);
  let min = Math.min(num1, num2);
  arr.forEach((v, i, a) => {
    if (min > v || max < v) {
      a.splice(i, 1);
    }
  });
};

filterRangeInPlace(arr, 1, 4); // 1과 4 사이에 있지 않은 요소는 모두 제거함

console.log(arr); // [3, 1]

console.log("-----------------------------");
// 4. 내림차순으로 정렬하기
let arr2 = [5, 2, 1, -10, 8];

// 요소를 내림차순으로 정렬해주는 코드를 여기에 작성해보세요.
arr2.sort((a, b) => b - a);

console.log(arr2); // 8, 5, 2, 1, -10

console.log("-----------------------------");
// 5. 배열 복사본을 정렬하기
let arr3 = ["HTML", "JavaScript", "CSS"];
const copySorted = (arr) => {
  return [...arr].sort();
};

let sorted = copySorted(arr3);

console.log(sorted); // CSS, HTML, JavaScript
console.log(arr3); // HTML, JavaScript, CSS (no changes)

console.log("-----------------------------");
// 6. 확장 가능한 계산기
function Calculator() {
  // 사실 이 복잡한 식이 eval() 하나면 끝이긴 하다
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
  };
  this.calculate = function (str) {
    // return eval(str);
    str = str.split(" ");
    let a = +str[0];
    let b = +str[2];
    let op = str[1];

    if (!this.methods[op] || isNaN(a) || isNaN(b)) return NaN;

    return this.methods[op](a, b);
  };
  this.addMethod = function (name, func) {
    this.methods[name] = func;
  };
}
let calc = new Calculator();

console.log(calc.calculate("3 + 7")); // 10

let powerCalc = new Calculator();

powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
console.log(result); // 8

console.log("-----------------------------");
// 7. 이름 매핑하기
let john = { name: "John", age: 25, surname: "Smith", id: 1 };
let pete = { name: "Pete", age: 30, surname: "Hunt", id: 2 };
let mary = { name: "Mary", age: 28, surname: "Key", id: 3 };

let users = [john, pete, mary];

let names = users.map((v) => v.name);

console.log(names); // John, Pete, Mary

console.log("-----------------------------");
// 8. 객체 매핑하기

let usersMapped = users.map((v) => ({
  fullName: `${v.name} ${v.surname}`,
  id: v.id
}));

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/
// console.log(usersMapped);
console.log( usersMapped[0].id ) // 1
console.log( usersMapped[0].fullName ) // John Smith

console.log("-----------------------------");
// 9. 나이를 기준으로 객체 정렬하기
let arr4 = [ pete, john, mary ];
const sortByAge = (arr)=>{
  arr.sort((a,b)=>a.age-b.age)
}
sortByAge(arr4);

// now: [john, mary, pete]
console.log(arr4[0].name); // John
console.log(arr4[1].name); // Mary
console.log(arr4[2].name); // Pete