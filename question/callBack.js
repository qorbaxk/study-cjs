/* -------------------------------------------------------------------------- */
/*                               콜백(callback)함수                               */
/* -------------------------------------------------------------------------- */

/* 다른 함수 (A)의 전달인자 (argument)로 넘겨주는 함수(B)를 콜백함수라고함
매개변수를 넘겨받은 함수A는 callback함수B를 필요에 따라 즉시 실행(synchronously) 할 수도 있고, 아니면 나중에(asynchronously) 실행할 수도 있다. */
function A(callback) {
  callback();
}
function B() {
  console.log("저는 콜백이에요");
}
A(B);


// 1. 비동기 처리코드 (제이쿼리의 ajax 통신 API)
function getData() {
	var tableData;
	$.get('https://domain.com/products/1', function(response) {
		tableData = response;
	});
	return tableData;
}

console.log(getData()); // undefined

// 2. 콜백함수로 비동기처리 문제 해결
function getData(callbackFunc) {
	$.get('https://domain.com/products/1', function(response) {
		callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
	});
}

getData(function(tableData) {
	console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});

// 3. Promise 적용
function getData(callback) {
  // new Promise() 추가
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function(tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});


// 4. Promise에 resolve, reject 출력
function getData() {
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data) {
  console.log(data); // response 값 출력
}).catch(function(err) {
  console.error(err); // Error 출력
});

// 5. async await http 통신
function fetchUser() {
  var url = 'https://jsonplaceholder.typicode.com/users/1'
  return fetch(url).then(function(response) {
    return response.json();
  });
}

function fetchTodo() {
  var url = 'https://jsonplaceholder.typicode.com/todos/1';
  return fetch(url).then(function(response) {
    return response.json();
  });
}

// 6. 에러 잡기
async function logTodoTitle() {
  try {
    var user = await fetchUser();
    if (user.id === 1) {
      var todo = await fetchTodo();
      console.log(todo.title); // delectus aut autem
    }
  } catch (error) {
    console.log(error);
  }
}





/* -------------------------------------------------------------------------- */
/*                                    콜백지옥                                    */
/* -------------------------------------------------------------------------- */
/* 비동기 함수의 콜백 내부에서 다음 비동기 함수를 호출하는 등 연속적인 비동기 처리는
아래와 같이 콜백 지옥을 만든다. */

function fn() {
  setTimeout(() => {
    console.log("하나");
    setTimeout(() => {
      console.log("둘");
      setTimeout(() => {
        console.log("셋");
      }, 0);
    }, 0);
  }, 0);
}

fn(); // 결과 순서 => '하나', '둘', '셋'

/* 비동기를 제어하는 방법(콜백지옥 탈출) */

// 1. Promise
/* 
new연산자와 함께 호출하고 인자로 콜백을 받음
호출될 때 바로 실행되지만, 그 안의 콜백은 resolve, reject 둘중 하나가
호출되기 전에  then 또는 catch로 넘어가지 않는다.
then으로 작업을 이어가려면 resolve() 함수 호출
작업을 중단 혹은 에러처리를 하려면 reject() 함수를 호출
데이터를 resolve()에 인자로 넣어 then 으로 전달할 수 있다. 
then에서 다음 then으로 데이터를 전달하기 위해서는 반드시 리턴값으로 전달해야한다.

내가 언제 유저의 데이터를 받아올진 모르지만 약속할게, Promise 객체를 갖고 잇으면 여기에 너가 then 이라는 콜백함수만 등록해놓으면 유저의 데이터가 준비되는대로 너가 등록한 콜백함수를 불러줄게!
State : pending(보류) → fulfilled(이행) or rejected(거부)
*/

function ps() {
  new Promise((resolve, reject) => {
    resolve("하나");
  })
    .then((data) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data + "둘");
        }, 0);
      });
    })
    .then((data) => {
      return data + "셋";
    })
    .then((data) => {
      console.log(data + "넷");
    })
    .catch((err) => {
      console.log("err ", err);
    });
}

ps();

// Promise를 사용하더라도, then안에 promise안에 then 안에 promise 안에.. 콜백지옥이랑 다를바가 없어보인다. 그래서 추가된 문법

// 2. Promise + async/await
/* 
비동기 작업을 수행하고자 하는 함수 앞에 async를 표기하고, 함수 내부에서 실질적으로 비동기 작업이 필요한 위치마다 await를 표기하는 것만으로 뒤의 내용을 Promise로 자동전환하고 해당 내용이 resolve 된 이후에야 다음으로 진행된다.
return을 하지 않았어도 자동으로 fn함수는 Promise를 return 한다.
await을 붙이 Promise는 Promise를 리턴하지 않는다.
(resole에 인자로 전달한 데이터를 리턴한다.)
*/

async function aa() {
  let text = "하나";
  text =
    text +
    (await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("둘");
      }, 0);
    }));
  text += "셋";
  console.log(text + "넷");
}

aa();
