let calculator = {
  a:0,
  b:0,
  read(){
    this.a=Number(prompt('더할 첫번째 값을 입력하세요')),
    this.b=Number(prompt('더할 두번째 값을 입력하세요'))
  },
  sum(){
    return this.a+this.b;
  },
  mul(){
    return this.a*this.b;
  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );