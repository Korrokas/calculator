const upperScreen = document.querySelector('#upperScreen');
const lowerScreen = document.querySelector('#lowerScreen');
const operatorBtns = document.querySelectorAll('.operatorKey');
const numBtns = document.querySelectorAll('.numKey');
const equalBtn = document.querySelector('#equals');
const negToPositive = document.querySelector('#unaryChange');
const clearBtn = document.querySelector('#clear');
const allClearBtn = document.querySelector('#allClear');

const validOperators = ['+', '-', '/', '*'];
let inputValues = [];
let currentOperator = '';
let nextOperator = '';
let isEqualKeyPressed = false;
let numInput = '';
let totalResult = null;


//Keyboard Support
document.addEventListener('keyup', e => {
    validOperators.forEach(symbol => {
        if (e.key === symbol) {
            storeValues();
            console.log(storeOperator(e.key));
            upperScreenDisplay();
            evaluateExpressions();
        }
    })
})


document.addEventListener('keyup', e => {
    if (e.key >= 0 && e.key < 10) {
        lowerScreenDisplay(e.key);
    }
})

document.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        isEqualKeyPressed = true;
        storeValues();
        evaluateExpressions();
        isEqualKeyPressed = false;
    }
})


//Mouse Support
operatorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        storeValues();
        storeOperator(e.target.textContent)
        upperScreenDisplay();
        evaluateExpressions();
    })
})


numBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        lowerScreenDisplay(e.target.textContent);
    })
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
    if (numInput === '') {
        return;
    } else {
        inputValues.push(parseFloat(numInput));
        clear();
    }
}


function storeOperator(operator) {
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


function lowerScreenDisplay(num) {
    
    if (numInput.length > 9) {
        return;
    }
    lowerScreen.textContent = numInput += num;
}


function clear() {
    numInput = '';
    lowerScreen.textContent = '';
}


function unaryChange() {

    // if (totalResult !== null) {
    //     totalResult *= -1;
    //     inputValues = [totalResult];
    //     lowerScreen.textContent = totalResult;
    // }  if (numInput === '') {
    //     numInput = -1;
    //     lowerScreen.textContent = numInput;
    // } else if (typeof numInput === "number") {
    //     numInput *= -1;
    //     lowerScreen.textContent = numInput;
    // }
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
            totalResult = Math.round(totalResult * 100) / 100;
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
        case 'X':
            return multiply(a, b);
        case '/':
        case '÷':
            return divide(a, b);
        default:
            console.log(`${operator} is not a valid operator, use ['+', '-', '*', or '/']`);
        }
}