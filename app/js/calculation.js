function valueBtnHandler(value, type) {

    if (txtResult === "") {
        if (txtExpression === "" && value === "0")
            return;
    }

    if (txtResult === "") {
        if (txtExpression === "" && type === 'symbol') {
            if (value !== "√" && value !== "reverse") {
                return;
            }
        }
    }

    switch (type) {
        case 'number':
            if (recalled) {
                txtResult = "";
                result.textContent = +value;
                recalled = false;
                return;
            }

            if (value === "." && txtResult.includes(".")) {
                return;
            }

            if (value === "." && txtResult === "") {
                txtResult = "0";
            }

            txtResult += value;
            result.textContent = txtResult;
            lastResult = parseFloat(txtResult);
            break;
        case 'symbol':
            if (value === "±") {
                if (result.textContent.includes("-")) {
                    txtResult = result.textContent.replace("-", "");
                    result.textContent = txtResult;
                    return;
                }
                txtResult = "-" + result.textContent;
                result.textContent = txtResult;
                return;
            }

            if (value === "√") {
                if (result.textContent.includes("-")) {
                    txtResult = "";
                    txtExpression = "";
                    result.textContent = "Invalid input";
                    expression.textContent = "";
                    return;
                }

                sqrtAcc = (txtResult.match(/√/g) || []).length + 1;

                txtResult = txtResult.includes("√") ? "√(" + txtResult + ")" : "√(" + result.textContent + ")";
                result.textContent = eval(txtResult.replace(/√/g, "Math.sqrt"));

                if (sqrtAcc === 1) {
                    expression.textContent += txtResult + " ";
                    return;
                }

                if (expression.textContent.includes("√")) {
                    expression.textContent = expression.textContent.substr(0, expression.textContent.lastIndexOf("√") - 2 * (sqrtAcc - 2));
                }

                expression.textContent += txtResult + " ";
                return;
            }

            if (value === "sqr") {
                sqrAcc = (txtResult.match(/sqr/g) || []).length + 1;

                txtResult = txtResult.includes("sqr") ? "sqr(" + txtResult + ")" : "sqr(" + result.textContent + ")";
                let temp = txtResult;
                temp = temp.replace(/\)/g, ",2)");
                result.textContent = eval(temp.replace(/sqr/g, "Math.pow"));

                if (sqrAcc === 1) {
                    expression.textContent += txtResult + " ";
                    return;
                }

                if (expression.textContent.includes("sqr")) {
                    expression.textContent = expression.textContent.substr(0, expression.textContent.lastIndexOf("sqr") - 4 * (sqrAcc - 2));
                }

                expression.textContent += txtResult + " ";
                return;
            }

            if (value === "cube") {
                cubeAcc = (txtResult.match(/cube/g) || []).length + 1;

                txtResult = txtResult.includes("cube") ? "cube(" + txtResult + ")" : "cube(" + result.textContent + ")";
                let temp = txtResult;
                temp = temp.replace(/\)/g, ",3)");
                result.textContent = eval(temp.replace(/cube/g, "Math.pow"));

                if (cubeAcc === 1) {
                    expression.textContent += txtResult + " ";
                    return;
                }

                if (expression.textContent.includes("cube")) {
                    expression.textContent = expression.textContent.substr(0, expression.textContent.lastIndexOf("cube") - 5 * (cubeAcc - 2));
                }

                expression.textContent += txtResult + " ";
                return;
            }

            if (value === "reverse") {

                if (result.textContent === "0") {
                    txtResult = "";
                    txtExpression = "";
                    result.textContent = "Cannot divide by zero";
                    expression.textContent = "";
                    return;
                }

                divideAcc = (txtResult.match(/\//g) || []).length + 1;

                txtResult = txtResult.includes("/") ? "1/(" + txtResult + ")" : "1/(" + result.textContent + ")";
                result.textContent = eval(txtResult);

                if (divideAcc === 1) {
                    expression.textContent += txtResult + " ";
                    return;
                }

                expression.textContent = expression.textContent.includes("/") ?
                    expression.textContent.substr(0, expression.textContent.lastIndexOf("/") - (3 * (divideAcc - 2)) - 1) : expression.textContent;


                expression.textContent += txtResult + " ";
                return;

            }

            switch (value) {
                case "+":
                case "-":
                    lastOperator = value;
                    break;
                case "÷":
                    lastOperator = "/";
                    break;
                case "×":
                    lastOperator = "*";
                    break;
            }

            txtResult = txtResult.includes('sqr') ? txtResult.replace(/\)/g, ",2)") : txtResult.replace(/sqr/g, 'Math.pow');
            txtResult = txtResult.includes('cube') ? txtResult.replace(/\)/g, ",3)") : txtResult.replace(/cube/g, 'Math.pow');

            txtExpression += txtResult;

            if (txtExpression.charAt(txtExpression.length - 1) === "+" ||
                txtExpression.charAt(txtExpression.length - 1) === "-" ||
                txtExpression.charAt(txtExpression.length - 1) === "÷" ||
                txtExpression.charAt(txtExpression.length - 1) === "×") {

                txtExpression = txtExpression.substr(0, txtExpression.length - 1);
                txtExpression += value;
                expression.textContent = expression.textContent.substr(0, expression.textContent.length - 2);
                expression.textContent += value + " ";
                return;
            }

            txtExpression = txtExpression.replace("÷", "/");
            txtExpression = txtExpression.replace("×", "*");
            txtExpression = txtExpression.replace(/√/g, "Math.sqrt");

            lastResult = eval(txtExpression);

            txtExpression = lastResult + value;

            result.textContent = lastResult;
            txtResult.includes("√") || txtResult.includes("Math.pow") || txtResult.includes("/") ? expression.textContent += value + " " : expression.textContent += txtResult + " " + value + " ";

            txtResult = "";
            break;
    }

}



function calculateResult() {
    txtExpression += txtResult;

    if (txtExpression === "") {

        let operator;
        let recursiveResult = parseFloat(result.textContent);

        result.textContent = eval(recursiveResult + lastOperator + lastResult);

        switch (lastOperator) {
            case "*":
                operator = "×";
                break;
            case "/":
                operator = "÷";
                break;
            case "+":
            case "-":
                operator = lastOperator;
                break;
        }

        expression.textContent = recursiveResult + " " + operator + " " + lastResult;
        addHistory();
        expression.textContent = "";
        return;
    }

    if (txtExpression.charAt(txtExpression.length - 1) === "+" ||
        txtExpression.charAt(txtExpression.length - 1) === "-" ||
        txtExpression.charAt(txtExpression.length - 1) === "÷" ||
        txtExpression.charAt(txtExpression.length - 1) === "×") {

        let operator;
        let recursiveResult = parseFloat(result.textContent);

        result.textContent = eval(recursiveResult + lastOperator + lastResult);

        switch (lastOperator) {
            case "*":
                operator = "×";
                break;
            case "/":
                operator = "÷";
                break;
            case "+":
            case "-":
                operator = lastOperator;
                break;
        }

        expression.textContent = recursiveResult + " " + operator + " " + lastResult;
        addHistory();
        expression.textContent = "";

        txtResult = "";
        txtExpression = "";
        return;
    }

    txtExpression = txtExpression.includes('sqr') ? txtExpression.replace(/\)/g, ",2)") : txtExpression.replace(/sqr/g, 'Math.pow');
    txtExpression = txtExpression.includes('cube') ? txtExpression.replace(/\)/g, ",3)") : txtExpression.replace(/cube/g, 'Math.pow');

    txtExpression = txtExpression.replace("÷", "/");
    txtExpression = txtExpression.replace("×", "*");
    txtExpression = txtExpression.replace(/√/g, "Math.sqrt");

    result.textContent = eval(txtExpression);

    expression.textContent += txtResult;

    addHistory();

    expression.textContent = "";
    txtResult = "";
    txtExpression = "";
}


function clearAllInput() {
    txtResult = "";
    txtExpression = "";
    result.textContent = "0";
    expression.textContent = "";
}

function clearResult() {
    txtResult = "";
    result.textContent = "0";
}

function backspaceResult() {
    if (txtResult === "") {
        result.textContent = "0";
        return;
    }

    txtResult = txtResult.substring(0, txtResult.length - 1);
    lastResult = parseFloat(txtResult);

    result.textContent = txtResult === "" ? "0" : txtResult;
}