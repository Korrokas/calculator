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

//Global variables for use in functions
const upperScreen = document.querySelector('#upperScreen');
const lowerScreen = document.querySelector('#lowerScreen');

let InputValues = [];
let operatorValues = [];
let numInput = '';


//Function to add functionality to buttons
function addEventsToButtons() {
    const operatorBtns = document.querySelectorAll('.arithmeticKey');
    const numBtns = document.querySelectorAll('.numKey');
    const negToPositive = document.querySelector('#unaryChange');
    const clearBtn = document.querySelector('#clear');
    const allClearBtn = document.querySelector('#allClear');
        
    operatorBtns.forEach(btn => {
        btn.addEventListener('click', storeValues)
        btn.addEventListener('click', upperScreenDisplay);
        btn.addEventListener('click', clear);
    })
    
    numBtns.forEach(btn => {
        btn.addEventListener('click', lowerScreenDisplay);
    })

    negToPositive.addEventListener('click', unaryChange);

    clearBtn.addEventListener('click', clear);
    allClearBtn.addEventListener('click', allClear);
}


//Function to generate numbers on bottom half of calculator screen
function lowerScreenDisplay() {
    if (numInput.length > 9) {
        return;
    }
    lowerScreen.textContent = numInput += this.textContent;
}


//Function to push lower screen to upper screen and clear lower screen
function upperScreenDisplay() {
    upperScreen.textContent = `${numInput} ${this.textContent}`;
}


//Function to change value from positive to negative and vice versa
function unaryChange() {
        numInput *= -1;
        lowerScreen.textContent = numInput;
}


function clear() {
    numInput = '';
    lowerScreen.textContent = numInput;
}

function allClear() {
    numInput = '';
    InputValues = [];
    lowerScreen.textContent = numInput;
    upperScreen.textContent = '';
}


//Function to store inputs into array
function storeValues() {
    if (numInput === null || numInput === '') {
        return;
    }
    else {
        InputValues.push(numInput);
        console.log(InputValues);
    }
}

clear();
addEventsToButtons();