const upperScreen = document.querySelector('#upperScreen');
const lowerScreen = document.querySelector('#lowerScreen');
const operatorBtns = document.querySelectorAll('.operatorKey');
const numBtns = document.querySelectorAll('.numKey');
const equalBtn = document.querySelector('#equals');
const negToPositive = document.querySelector('#unaryChange');
const percentBtn = document.querySelector('#percent');
const allClearBtn = document.querySelector('#allClear');

const validOperators = ['+', '-', '/', '*'];
let currentOperator = '';
let input = '';
let firstOperand = null;
let secondOperand = null;
let totalResult = null;
let isEqualKeyPressed = false;
let defaultDisplay = '0';


//Initial Display
lowerScreen.textContent = defaultDisplay;


//Keyboard Support
document.addEventListener('keyup', e => {
    validOperators.forEach(symbol => {
        if (e.key === symbol) {
            currentOperator = e.key;
            storeValues();
            upperScreenDisplay();
            evaluateExpressions();
        }
    })
})


document.addEventListener('keyup', e => {
    if (e.key >= 0 && e.key < 10 || e.key === '.') {
        if (e.key === '.' && lowerScreen.textContent.includes('.')) {
            return;
        }
        lowerScreenDisplay(e.key);
    }
})


document.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        storeValues();
        isEqualKeyPressed = true;
        evaluateExpressions();
        isEqualKeyPressed = false;
    }
})


//Mouse Support
operatorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        currentOperator = e.target.textContent;
        storeValues();
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
percentBtn.addEventListener('click', numberToDecimal);
allClearBtn.addEventListener('click', resetData);


//Function Definitions
function storeValues() {
    if (input === '') {
        return;
    } else if (firstOperand === null) {
        firstOperand = parseFloat(input);
        clear();
    } else {
        secondOperand = parseFloat(input);
        clear();
    }
}


function upperScreenDisplay(num1, num2, operator) {
    
    if (secondOperand === null) {
        upperScreen.textContent = `${firstOperand} ${currentOperator}`;
    } else if (secondOperand !== null) {
        upperScreen.textContent = `${num1} ${operator} ${num2}`;
    }
}


function lowerScreenDisplay(num) {
    
    if (input.length > 9) {
        return;
    } 
    input += num;
    lowerScreen.textContent = input;
}


function clear() {
    input = '';
    lowerScreen.textContent = '';
}


function resetData() {
    currentOperator = '';
    input = '';
    firstOperand = null;
    secondOperand = null;
    totalResult = null;
    lowerScreen.textContent = defaultDisplay;
    upperScreen.textContent = '';
    allClearBtn.blur();
}


function unaryChange() {
    if (input === '' || input === '0') {
        input = '-';
    } else if (input === '-') {
        input = '';
    } else {
        input *= -1;
    }
    lowerScreen.textContent = input;
}


function numberToDecimal() {
    if (input === '' && firstOperand !== null) {
        firstOperand = parseFloat(firstOperand) / 100;
        input = firstOperand;
    } else if (input !== '') {
        input = parseFloat(input) / 100;
    }
    lowerScreen.textContent = input;
}


function evaluateExpressions() {
    if (currentOperator !== '' || isEqualKeyPressed === true) {
        if (currentOperator === '') {
            return;
        } else {
            if (firstOperand !== null && secondOperand !== null) {
                upperScreenDisplay(firstOperand, secondOperand, currentOperator);
                totalResult = arithmetic(firstOperand, secondOperand, currentOperator);
                totalResult = formatTotalResult(totalResult);
                firstOperand = totalResult;
                secondOperand = null;
                displayTotalResult(totalResult);
            }
        }
    }
}


function formatTotalResult(result) {
    let roundResult = Math.round(result * 10000) / 10000;

    if (roundResult > 1000000 || roundResult < 0.0001) {
        return roundResult.toExponential(2);
    } else {
        return roundResult;
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