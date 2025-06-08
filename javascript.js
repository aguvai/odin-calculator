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

const clearDisplay = function () {
    display.textContent = "";
}

let justFinishedEvaluating = false;

const evaluate = function (target) {
    if (currentExpression[0] && displayText != "") {
        currentExpression[1] = Number(displayText);
        resultOfOperation = operate(currentExpression[0], currentExpression[1], currentExpression[2])

        currentExpression.length = 0;

        display.textContent = resultOfOperation;
        currentExpression[0] = resultOfOperation;

        if (target.textContent != "=" && target.classList.contains("operator")) {
            currentExpression[2] = target.textContent;
            justFinishedEvaluating = true;
        } else if (target.textContent == "=") {
            currentExpression.length = 0;
        }
    } else if (!currentExpression[0] && !currentExpression[2]) {
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
        if (Number(target.textContent)) {
            if (justFinishedEvaluating == true) {
                clearDisplay();
                justFinishedEvaluating = false;
            } 
            display.textContent += target.textContent;
        } else if (target.textContent === "DEL" && display.textContent != "") {
            display.textContent = display.textContent.slice(0, -1);
        } else if (target.textContent === "." && display.textContent.indexOf('.') === -1) {
            display.textContent += target.textContent;
        } else if (target.textContent === "AC") {
            clearDisplay();
            currentExpression.length = 0;
        } else if (target.classList.contains("operator")) {
            evaluate(target)
        }
    }

    displayText = display.textContent
})