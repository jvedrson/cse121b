/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2) {
  return number1 + number2;
}

function addNumbers() {
  const add1 = Number(document.getElementById('add1').value);
  const add2 = Number(document.getElementById('add2').value);

  document.getElementById('sum').value = add(add1, add2);
}

document.getElementById('addNumbers').addEventListener('click', addNumbers);

/* Function Expression - Subtract Numbers */
const subtract = function(number1, number2) {
  return number1 - number2;
}

const subtractNumbers = function() {
  const subtract1 = Number(document.getElementById('subtract1').value);
  const subtract2 = Number(document.getElementById('subtract2').value);

  document.getElementById('difference').value = subtract(subtract1, subtract2);
}

document.getElementById('subtractNumbers').addEventListener('click', subtractNumbers);

/* Arrow Function - Multiply Numbers */
const multiply = (number1, number2) => number1 * number2;

const multiplyNumbers = () => {
  const factor1 = Number(document.getElementById('factor1').value);
  const factor2 = Number(document.getElementById('factor2').value);

  document.getElementById('product').value = multiply(factor1, factor2);
}

document.getElementById('multiplyNumbers').addEventListener('click', multiplyNumbers);

/* Open Function Use - Divide Numbers */
const divide = (number1, number2) => number1 / number2;

const divideNumbers = () => {
  const dividend = Number(document.getElementById('dividend').value);
  const divisor = Number(document.getElementById('divisor').value);

  document.getElementById('quotient').value = divide(dividend, divisor);
}

document.getElementById('divideNumbers').addEventListener('click', divideNumbers);

/* Decision Structure */
document.getElementById('getTotal').addEventListener('click', () => {
  let subtotal = Number(document.getElementById('subtotal').value);
  const membership = document.getElementById('member').checked;

  if (membership)
    subtotal *= (1 - 0.15);

  document.getElementById('total').innerHTML = `$ ${subtotal.toFixed(2)}`;
});

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
document.querySelector('#array').innerHTML = numbersArray;

/* Output Odds Only Array */
const oddsNumbers = numbersArray.filter((number) => number % 2 === 1);
document.querySelector('#odds').innerHTML = oddsNumbers;

/* Output Evens Only Array */
const evensNumbers = numbersArray.filter((number) => number % 2 === 0);
document.querySelector('#evens').innerHTML = evensNumbers;

/* Output Sum of Org. Array */
const sumOfArray = numbersArray.reduce((sum, number) => sum + number, 0);
document.querySelector('#sumOfArray').innerHTML = sumOfArray;

/* Output Multiplied by 2 Array */
const multipliedArray = numbersArray.map((number) => number * 2);
document.querySelector('#multiplied').innerHTML = multipliedArray;

/* Output Sum of Multiplied by 2 Array */
const sumOfMultiplied = numbersArray.map((number) => number * 2).reduce((sum, number) => sum + number, 0)
document.querySelector('#sumOfMultiplied').innerHTML = sumOfMultiplied;