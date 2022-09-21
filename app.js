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

//create operate function that takes an operator and calls a prior function on two numbers

function operate(a, b, operator) {
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

//create functions to populate display when number buttons are clicked, display value should be stored in variable

const lowerScreenDisplay = document.querySelector('#lowerScreen');
const upperScreenDisplay = document.querySelector('#upperScreen');

let displayValue = '';

function numToDisplay() {
    if (displayValue.length > 9) {
        return;
    }
    lowerScreenDisplay.textContent = displayValue += this.textContent;
    console.log(this.textContent);
}

function updateDisplay() {
    const numBtns = document.querySelectorAll('.numKey');
    numBtns.forEach(btn => {
        btn.addEventListener('click', numToDisplay);
    })
}

updateDisplay();