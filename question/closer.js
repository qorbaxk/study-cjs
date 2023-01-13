/* 
  <클로저>
  1. 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수
  2. 이미 생명주기가 끝난 외부 함수의 변수를 참조하는 함수
  3. 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만 기억하여 유지시키는 함수

  어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 후에도 변수 a가 사라지지 않는 현상

*/
/* 
let outer = function() {
  let a = 1;
  let inner = function() {
    return ++a;
  };
  return inner; // 실행시키지 않고 함수 자체를 리턴
};
let outer2 = outer(); //아우터함수를 실행시켜서 변수에 할당
// outer2 함수를 실행하게 되면 안에있는 inner함수를 실행시킨 것과 결과가 같다.
console.log(outer2()); // 2
console.log(outer2()); // 3 */


/* for(let i=0; i<5; i++){
  setTimeout(function(){
    console.log(i);
  },i*1000);
} */


// 클로저 활용 사례

// 1. 콜백함수 내부에서 외부 데이터를 사용하고자 할 때

// 2. 접근 권한 제어 (정보 은닉)
// 3. 부분 적용 함수
let add = function(){
	let result = 0;
  	for(let i = 0; i < arguments.length; i++){
    	result += arguments[i];
    }
	return result;
};
let addPartial = add.bind(null, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10));

// 4. 커링 함수