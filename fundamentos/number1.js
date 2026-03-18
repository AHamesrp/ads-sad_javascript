let numStr = "123.45";
let num = parseFloat(numStr);
console.log(num);

const roundedNum = Math.round(num);
console.log(roundedNum);

const roundedStr = num.toFixed(3);
console.log(roundedStr);

if (isNaN(num)) {
  console.log("É NaN");
}else{
  console.log("Não é NaN");
}
