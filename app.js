const upperScreen = document.querySelector('#upperScreen');
const lowerScreen = document.querySelector('#lowerScreen');
const operatorBtns = document.querySelectorAll('.operatorKey');
const numBtns = document.querySelectorAll('.numKey');
const equalBtn = document.querySelector('#equals');
const negToPositive = document.querySelector('#unaryChange');
const clearBtn = document.querySelector('#clear');
const allClearBtn = document.querySelector('#allClear');

let inputValues = [];
let currentOperator = '';
let nextOperator = '';
let isEqualKeyPressed = false;
let numInput = '';
let totalResult = null;


operatorBtns.forEach(btn => {
    btn.addEventListener('click', storeValues);
    btn.addEventListener('click', storeOperator);
    btn.addEventListener('click', upperScreenDisplay);
    btn.addEventListener('click', evaluateExpressions);
})


numBtns.forEach(btn => {
    btn.addEventListener('click', lowerScreenDisplay);
})


equalBtn.addEventListener('click', () => {
    isEqualKeyPressed = true;
    storeValues();
    evaluateExpressions();
    isEqualKeyPressed = false;
})


negToPositive.addEventListener('click', unaryChange);
clearBtn.addEventListener('click', clear);
allClearBtn.addEventListener('click', allClear);


function storeValues() {
    if (numInput === null || numInput === '') {
        return;
    } else {
        inputValues.push(parseFloat(numInput));
        clear();
    }
}


function storeOperator() {
    const operator = this.value;

    if (!(currentOperator === '')) {
        nextOperator = operator;
    } else {
        currentOperator = operator;
    }
}


function upperScreenDisplay(num1, num2, operator) {
    
    if (inputValues.length === 1) {
        upperScreen.textContent = `${inputValues[0]} ${currentOperator}`;
    } else if (inputValues.length > 1) {
        upperScreen.textContent = `${num1} ${operator} ${num2}`;
    }
}


function lowerScreenDisplay() {
    if (numInput.length > 9) {
        return;
    }
    lowerScreen.textContent = numInput += this.textContent;
}


function clear() {
    numInput = '';
    lowerScreen.textContent = '';
}


function unaryChange() {
    if (totalResult !== null) {
        totalResult *= -1;
        inputValues = [totalResult];
        lowerScreen.textContent = totalResult;
    } else if (numInput === '') {
        numInput = -1;
        lowerScreen.textContent = numInput;
    } else {
        numInput *= -1;
        lowerScreen.textContent = numInput;
    }
}


function allClear() {
    numInput = '';
    inputValues = [];
    totalResult = null;
    currentOperator = '';
    nextOperator = '';
    lowerScreen.textContent = '';
    upperScreen.textContent = '';
}


function evaluateExpressions() {
    if (!(currentOperator == '') || isEqualKeyPressed === true) {
        if (inputValues.length > 1) {
            upperScreenDisplay(inputValues[0], inputValues[1], currentOperator);
            totalResult = arithmetic(inputValues[0], inputValues[1], currentOperator);
            currentOperator = nextOperator;
            nextOperator = '';
            inputValues = [totalResult];
            displayTotalResult(totalResult);
        }
    }
}


function displayTotalResult(result) {
        lowerScreen.textContent = result;
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
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log(`${operator} is not a valid operator, use ['+', '-', '*', or '/']`);
        }
}