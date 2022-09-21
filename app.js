//Global variables for use in functions
const upperScreen = document.querySelector('#upperScreen');
const lowerScreen = document.querySelector('#lowerScreen');

let currentoperator = '';
let total = 0;
let firstOperand = null;
let secondOperand = null;
let inputValue = '';

//Define event listeners
const operatorBtns = document.querySelectorAll('.arithmeticKey');
const numBtns = document.querySelectorAll('.numKey');

operatorBtns.forEach(btn => {
    btn.addEventListener('click', calculate);
})

numBtns.forEach(btn => {
    btn.addEventListener('click', lowerScreenDisplay);
})


//create add, subtract, multiply, and divide functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


//Function that takes an operator and calls a prior function on two numbers
function arithmetic(a, b, operator) {

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log(`${operator} is not a valid operator, use ['+', '-', '*', or '/']`);
    }
}


//Function to pass to operator function() to evaluate if a second value is ready to be operated on
function checkForTwoInputs(a, b, operator) {
    if (a !== null && b !== null) {
        total = arithmetic(a, b, operator);
    }
}



//Function to store two values and operator to pass to operate function
function calculate() {
    currentoperator = this.textContent.toLowerCase();
    firstOperand = parseFloat(inputValue);
    upperScreen.textContent = `${firstOperand} ${currentoperator}`;
    inputValue = '';

    console.log(currentoperator, total);
    arithmetic(firstOperand, secondOperand, currentoperator);
}


//Function to generate numbers on bottom half of calculator screen
function lowerScreenDisplay() {

    if (inputValue.length > 9) {
        return;
    }
    lowerScreen.textContent = inputValue += this.textContent;
}