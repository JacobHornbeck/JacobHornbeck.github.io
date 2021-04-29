let addButton = document.querySelector('#add');
let sumButton = document.querySelector('#sum');
let displayDiv = document.querySelector('#display');

/***********************************************
* Get sum of integers from 1 to n
***********************************************/
sumButton.addEventListener("click", () => {
  let num = document.querySelector('#input');
  let sum = 0;
  
  for (let i = 1; i <= num.value; i++) {
    sum += i;
  }

  displayDiv.innerHTML = sum;
});

/***********************************************
* Add two numbers
***********************************************/
addButton.addEventListener("click", () => {
  let num1 = Number(document.querySelector('#input').value);
  let num2 = Number(document.querySelector('#input-two').value);

  displayDiv.innerHTML = num1 + num2;
});