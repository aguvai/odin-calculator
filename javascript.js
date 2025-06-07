let num1 = null;
let num2 = null;
let operator = null;

const add = function (num1, num2) {
    return num1 + num2;
}

const subtract = function (num1, num2) {
    return num1 - num2;
}

const multiply = function (num1, num2) {
    return num1 * num2;
}

const divide = function (num1, num2) {
    return num1 / num2;
}

const operate = function (num1, num2, operator) {
    let result = null;

    switch (operator) {
        case "add":
            result = add(num1, num2);
            break;
        case "subtract":
            result = subtract(num1, num2);
            break;
        case "multiply":
            result = multiply(num1, num2);
            break;
        case "divide":
            result = divide(num1, num2);
            break;
    }

    return result;
}

let displayText = "";

const calculatorContainer = document.querySelector(".calculator")
const display = document.querySelector(".display")
calculatorContainer.addEventListener("click", (event) => {
    target = event.target;

    if (target.tagName === "BUTTON"){
        if (Number(target.textContent)) {
            displayText += target.textContent;
            display.textContent = displayText;
        } else {

        }
    } 
})