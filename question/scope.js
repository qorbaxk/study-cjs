let x = "global x";
let y = "global y";


const outer = () => {
  let z = "outer local z";
  
  console.log(x);		// global x
  console.log(y);		// global y
  console.log(z);		// outer local z
  
  const inner = () => {
    let x = "inner local x";
    
    console.log(x);		// inner local x
    console.log(y);		// global y
    console.log(z);		// outer local z
  }
  
  inner();
}

outer();

console.log(x);			// global x
console.log(y);			// global y
console.log(z);	