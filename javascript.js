let currentExpression = [];
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
    if (num2 == 0) {
        alert("You can't divide by 0!");
        return "err";
    }
    return num1 / num2;
}

const operate = function (num1, num2, operator) {
    let result = null;

    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }

    return result;
}

let displayText = "";

const calculatorContainer = document.querySelector(".calculator")
const display = document.querySelector(".display")

let resultOnScreen = false;

const clearDisplay = function () {
    display.textContent = "";
    resultOnScreen = false;
}


const formatResult = function(result) {
    return Number.isInteger(result) ? result : result.toFixed(2);
}

const evaluate = function (target) {
    if (!isNaN(currentExpression[0]) && displayText != "" && resultOnScreen == false) {
        currentExpression[1] = Number(displayText);
        resultOfOperation = operate(currentExpression[0], currentExpression[1], currentExpression[2])

        currentExpression.length = 0;

        display.textContent = formatResult(resultOfOperation);
        resultOnScreen = true;

        currentExpression[0] = resultOfOperation;

        if (target.textContent != "=" && target.classList.contains("operator")) {
            currentExpression[2] = target.textContent;
        } else if (target.textContent == "=") {
            currentExpression.length = 0;
        }
    } else if (isNaN(currentExpression[0]) && isNaN(currentExpression[2])) {
        currentExpression[0] = Number(displayText);
        currentExpression[2] = target.textContent;
        clearDisplay();
    } else if (currentExpression[0] && currentExpression[2]) {
        currentExpression[2] = target.textContent;
    }
}

calculatorContainer.addEventListener("click", (event) => {
    target = event.target;

    if (target.tagName === "BUTTON") {
        if (!isNaN(Number(target.textContent))) {
            if (resultOnScreen == true) clearDisplay();
            display.textContent += target.textContent;
        } else if (target.textContent === "DEL" 
            && display.textContent != "" && !resultOnScreen) {
            display.textContent = display.textContent.slice(0, -1);
        } else if (target.textContent === ".") {
            if (display.textContent.indexOf('.') === -1) {
                if (resultOnScreen == true) clearDisplay();
                display.textContent += target.textContent;
            } else {
                if (resultOnScreen) {
                    clearDisplay();
                    display.textContent += target.textContent;
                }
            }
        } else if (target.textContent === "AC") {
            clearDisplay();
            currentExpression.length = 0;
        } else if (target.classList.contains("operator")) {
            evaluate(target)
        }
    }

    displayText = display.textContent
})