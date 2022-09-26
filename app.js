const upperScreen = document.querySelector('#upperScreen');
const lowerScreen = document.querySelector('#lowerScreen');
const operatorBtns = document.querySelectorAll('.operatorKey');
const numBtns = document.querySelectorAll('.numKey');
const equalBtn = document.querySelector('#equals');
const negToPositive = document.querySelector('#unaryChange');
const clearBtn = document.querySelector('#clear');
const allClearBtn = document.querySelector('#allClear');

let InputValues = [];
let currentOperator = '';
let isEqualKeyPressed = false;
let numInput = '';
let result = null;


operatorBtns.forEach(btn => {
    btn.addEventListener('click', storeValues);
    btn.addEventListener('click', storeOperator);
    btn.addEventListener('click', upperScreenDisplay);
    btn.addEventListener('click', clear);
    btn.addEventListener('click', evaluateExpressions);
})


numBtns.forEach(btn => {
    btn.addEventListener('click', lowerScreenDisplay);
})


equalBtn.addEventListener('click', () => {
    isEqualKeyPressed = true;
    evaluateExpressions()
    isEqualKeyPressed = false;
});



negToPositive.addEventListener('click', unaryChange);
clearBtn.addEventListener('click', clear);
allClearBtn.addEventListener('click', allClear);


function storeValues() {
    if (numInput === null || numInput === '') {
        return;
    }
    else {
        InputValues.push(parseFloat(numInput));
        console.log(InputValues);
    }
}


function storeOperator() {
    const operator = this.value;
    currentOperator = operator;
    console.log(currentOperator);
}


function upperScreenDisplay() {
    upperScreen.textContent = `${numInput} ${this.value}`;
}


//Function to generate numbers on bottom half of calculator screen
function lowerScreenDisplay() {
    if (numInput.length > 9) {
        return;
    }
    lowerScreen.textContent = numInput += this.textContent;
}


function clear() {
    numInput = '';
    lowerScreen.textContent = numInput;
}


function unaryChange() {
        numInput *= -1;
        lowerScreen.textContent = numInput;
}


function allClear() {
    numInput = '';
    InputValues = [];
    lowerScreen.textContent = numInput;
    upperScreen.textContent = '';
}


function evaluateExpressions() {
    if (!(currentOperator === null || currentOperator === '') || isEqualKeyPressed === true) {
        console.log('testasdfasdfasfd');
        if (InputValues.length > 1) {
            arithmetic(InputValues[0], InputValues[1], currentOperator);
        }
    }
}


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