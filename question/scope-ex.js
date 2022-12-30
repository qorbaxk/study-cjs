var a=1;
var outer = ()=>{
  var inner = ()=>{
    console.log(a);
    var a=3;
  }
  inner();
  console.log(a);
};
outer();
console.log(a);
