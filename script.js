const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (operator, x, y) => {
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            return divide(x, y);
    }
}

let firstValue = null;
let secondValue = null;
let operator = null;
let resetDisplay = false;
let equalsLast = false;

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const value = event.target.textContent;
        if (value === 'Clear') {
            firstValue = null;
            secondValue = null;
            operator = null;
            display.textContent = "";
            equalsLast = false;
        } else if (!isNaN(value) || value === '.') {
            if (equalsLast) {
                firstValue = null;
                secondValue = null;
                operator = null;
                display.textContent = "";
                equalsLast = false;
            }

            if (resetDisplay) {
                display.textContent = '';
                resetDisplay = false;
            }

            if (!(value === '.' && display.textContent.includes('.'))) {
                display.textContent += value;
            }
            equalsLast = false;
        } else if (value === 'Delete') {
            display.textContent = display.textContent.slice(0, -1);
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (firstValue === null || resetDisplay) {
                firstValue = Number(display.textContent);
            } else if (!secondValue) {
                secondValue = Number(display.textContent);
            }

            if (operator === "/" && secondValue === 0) {
                display.textContent = "Divide by 0 error";
                firstValue = null;
                secondValue = null;
                operator = null;
                resetDisplay = true;
                return;
            }

            if (!operator) {
                operator = value;
            }
            
            if (firstValue != null && secondValue && !resetDisplay) {
                const ans = operate(operator, firstValue, secondValue);
                display.textContent = Number(ans.toPrecision(12));
                firstValue = ans;
                secondValue = null;
            }

            operator = value;
            resetDisplay = true;
            equalsLast = false;
        } else if (value === '=') {
            if (!equalsLast){
                if (!secondValue) {
                    secondValue = Number(display.textContent);
                }

                if (operator && firstValue && (secondValue || secondValue === 0)) {
                    if (operator === "/" && secondValue === 0) {
                        display.textContent = "Divide by 0 error";
                        firstValue = null;
                        secondValue = null;
                        operator = null;
                        resetDisplay = true;
                        return;
                    } else {
                        const ans = operate(operator, firstValue, secondValue);
                        display.textContent = Number(ans.toPrecision(12));
                        firstValue = ans;
                        secondValue = null;
                        resetDisplay = true;
                    }
                }
                equalsLast = true;
            }
        }
    })
})

document.addEventListener('keydown', event => {
    let key = event.key;

    if (key === 'Backspace') key = 'Delete';
    if (key === 'Enter') key = '=';

    const button = [...buttons].find(button => button.textContent === key);

    if (button) {
        button.click();
    }
})