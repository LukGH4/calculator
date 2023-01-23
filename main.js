const display = document.querySelector('.display');
const operation = document.querySelector('.operation');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');

const digitButtons = [...document.getElementsByClassName('digit')];
const functionButtons = [...document.getElementsByClassName('func')];

const saveDigitStyle = decimal.style.backgroundColor;
const savedStyle = functionButtons[1].style.backgroundColor;

let cleared = true;
let equaled = false;
let numOnePressed = false;
let numTwo = 0;


function addition (numOne, numTwo) {
    return Math.round((numOne + numTwo) * 10000) / 10000;
}

function subtraction (numOne, numTwo) {
    return Math.round((numOne - numTwo) * 10000) / 10000;
}

function division (numOne, numTwo) {
    if (numTwo == 0) {
        return 'Hell No';
    };
    return Math.round((numOne / numTwo) * 10000) / 10000;
}

function multiplication (numOne, numTwo) {
    return Math.round((numOne * numTwo) * 10000) / 10000;

}

function operate (symbol, numOne, numTwo) {
    if (symbol === '+') {
        return addition(numOne, numTwo);
    } else if (symbol === '–') {
        return subtraction(numOne, numTwo);
    } else if (symbol === '÷') {
        return division(numOne, numTwo);
    } else if (symbol === 'x') {
        return multiplication(numOne, numTwo);
    }
}

function funcButtonPress (functionButtons) {
    for (let i = 0; i < functionButtons.length; i++){
        functionButtons[i].onclick = () => {
            let numOne = Number(display.innerHTML);
            let symbol = functionButtons[i].innerHTML;
            operation.innerHTML = `${numOne} ${functionButtons[i].innerHTML}`;
            numOnePressed = true;
            cleared = true;
            functionButtons[i].style.backgroundColor = 'goldenrod';
            functionButtons.map(func => {
                if (func !== functionButtons[i]) {
                func.style.backgroundColor = savedStyle;
                };
            });

            equals.onclick = () => {
                if (numOnePressed) {
                    numTwo = Number(display.innerHTML);
                    operation.innerHTML += ` ${numTwo}`;
                    if (symbol == '÷' && numTwo == 0){
                        display.innerHTML = 'Hell No';
                        numOne = 1;
                        operation.innerHTML = ``;
                    } else {
                        display.innerHTML = operate(symbol, numOne, numTwo);
                    }
                    cleared = true;
                    numOnePressed = false;
                    equaled = true;
                    functionButtons.forEach(func => {
                        func.style.backgroundColor = savedStyle;
                    });
                    funcButtonPress(functionButtons);
                    decimal.style.backgroundColor = saveDigitStyle;
                }; 
            };

            clear.onclick = () => {
                cleared = true;
                numOnePressed = false;
                numOne = 1;
                display.innerHTML = '0';
                functionButtons.forEach(func => {
                    func.style.backgroundColor = savedStyle;
                });
                funcButtonPress(functionButtons);
                decimal.style.backgroundColor = saveDigitStyle;
                operation.innerHTML = '';
                equaled = false;
            };

        };
    };
}


function main () {

    for (let i = 0; i < digitButtons.length; i++) {
        digitButtons[i].onclick = () => {
            if (cleared) {
                if (digitButtons[i].innerHTML !== '.'){
                    display.innerHTML = digitButtons[i].innerHTML;
                    cleared = false;
                }
                if (numOnePressed) {
                    decimal.style.backgroundColor = saveDigitStyle;
                    functionButtons.map(func => {
                        if (func.style.backgroundColor !== 'goldenrod') {
                            func.style.backgroundColor = 'cyan';
                        };
                        func.onclick = '';
                    });
                }
            } else {
                if (display.innerHTML.length < 20) {
                    if (digitButtons[i].innerHTML == '.' && !display.innerHTML.includes('.')){
                        display.innerHTML += digitButtons[i].innerHTML;
                        digitButtons[i].style.backgroundColor = '#D5FFF1';
                    } else if (digitButtons[i].innerHTML !== '.'){
                        display.innerHTML += digitButtons[i].innerHTML;
                    };
                };
            };

            if (equaled && !numOnePressed) {
                if (digitButtons[i].innerHTML !== '.'){
                    operation.innerHTML = '';
                    display.innerHTML = digitButtons[i].innerHTML;
                    cleared = false;
                    equaled = false;
                }
            };
        };
    };

    clear.onclick = () => {
        cleared = true;
        numOnePressed = false;
        display.innerHTML = '0';
        operation.innerHTML = '';
        decimal.style.backgroundColor = saveDigitStyle;
        equaled = false;
        
    };

    funcButtonPress(functionButtons);


};

main();