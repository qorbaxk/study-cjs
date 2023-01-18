// 기본값을 넣은 객체를 미리 생성
const defaultOptions = {
  method: "GET",
  mode: "cors",
  body: null,
  cache: "no-cache",
  credential: "same-origin",
  redirect: "follow",
  referrerPolicy: "no-referrer",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

// 비동기통신에 사용할 함수
const carol = async (options = {}) => {
  // 정보를 fetch할때 사용할 url과 다른 옵션들을 구조분해할당으로받음
  // 기본 defaultOptions에 매개변수로 받아온 options 객체를 덮어씀
  // 기본정보는 유지하면서, 새롭게 받은 정보를 덮어씌우는 것임
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
    // headers는 이중구조이기때문에 얕은복사를 한번 더 해줌
    // nullish 연산자를 이용하여, 있으면 호출하고 없으면 빈객체로 반환한다.
    headers: { ...(defaultOptions.headers ?? {}), ...(options.headers ?? {}) },
  };
  // await을 사용하여 비동기적으로 fetch한 값을 promise로 저장
  let response = await fetch(url, restOptions);
  // 프로미스 객체를 response.data에 넣어줌
  if (response.ok) {
    response.data = response.json();
  }
  return response;
};

// CRUD

// 정보 만들기 생성 Create
carol.post = (url, body, options) => {
  return carol({ method: "POST", url, body: JSON.stringify(body), ...options });
};
// 정보 가져오기 Read
carol.get = (url, options) => {
  return carol({ url, ...options });
};
// 정보 수정 업데이트 Update
carol.put = (url, body, options) => {
  return carol({ method: "PUT", url, body: JSON.stringify(body), ...options });
};
// 정보 삭제 Delete
carol.delete = (url, options) => {
  return carol({ method: "DELETE", url, ...options });
};

// 받아온 정보로 화면에 렌더링하기
// 원래는 모듈프로그래밍으로 메인js에서 해야하지만, 여기선 간단히
const render = async () => {
  // carol 함수 내의 get 메소드를 이용하여 쉽게 url만 넣어, 해당 값을 비동기적으로 불러온다.
  let response = await carol.get(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  console.log(response);
};

render();
