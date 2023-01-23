function addition (numOne, numTwo) {
    return numOne + numTwo;
}

function subtraction (numOne, numTwo) {
    return numOne - numTwo;
}

function division (numOne, numTwo) {
    return numOne / numTwo;
}

function multiplication (numOne, numTwo) {
    return numOne * numTwo;
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


function main () {
    const digitButtons = [...document.getElementsByClassName('digit')];
    const functionButtons = [...document.getElementsByClassName('func')];
    const display = document.querySelector('.display');
    const clear = document.querySelector('.clear');
    const equals = document.querySelector('.equals');
    let cleared = true;
    let numOnePressed = false;
    let numTwo = 0;

    for (let i = 0; i < digitButtons.length; i++) {
        digitButtons[i].onclick = () => {
            if (cleared) {
                display.innerHTML = digitButtons[i].innerHTML;
                cleared = false;
            } else if (numOnePressed && cleared) {
                if (display.innerHTML.length < 20) {
                    display.innerHTML = digitButtons[i].innerHTML;
                };
            } else {
                if (display.innerHTML.length < 20) {
                    display.innerHTML += digitButtons[i].innerHTML;
                };
            };
        };
    };

    clear.onclick = () => {
        cleared = true;
        numOnePressed = false;
        display.innerHTML = '0';
    };

    for (let i = 0; i < functionButtons.length; i++){
        functionButtons[i].onclick = () => {
            let numOne = Number(display.innerHTML);
            numOnePressed = true;
            cleared = true;
            let savedStyle = functionButtons[i].style.backgroundColor;
            functionButtons[i].style.backgroundColor = 'goldenrod';

            functionButtons.map(func => {
                if (func !== functionButtons[i]) {
                func.style.backgroundColor = savedStyle;
                };
            });

            equals.onclick = () => {
                if (numOnePressed) {
                    numTwo = Number(display.innerHTML);
                    display.innerHTML = operate(functionButtons[i].innerHTML, numOne, numTwo);
                    cleared = true;
                    numOnePressed = false;
                    functionButtons.forEach(func => func.style.backgroundColor = savedStyle);
                }; 
            };

            clear.onclick = () => {
                cleared = true;
                numOnePressed = false;
                numOne = 1;
                display.innerHTML = '0';
                functionButtons.forEach(func => func.style.backgroundColor = savedStyle);
            };

        };
    };

};

main();