"usestrict";

// hello();

var expression = document.getElementById("expression");
var result = document.getElementById("result");

var memoryList1 = document.getElementById("memoryList1");
var memoryList2 = document.getElementById("memoryList2");
var trashIcon1 = document.getElementById("trashIcon1");
var trashIcon2 = document.getElementById("trashIcon2");

var historyList1 = document.getElementById("historyList1");
var historyList2 = document.getElementById("historyList2");
var trashIcon3 = document.getElementById("trashIcon3");
var trashIcon4 = document.getElementById("trashIcon4")

var txtResult = "";
var txtExpression = "";
var lastResult = 0;
var lastOperator = "+";
var sqrtAcc = 0;
var sqrAcc = 0;
var cubeAcc = 0;
var divideAcc = 0;
var recalled = false;

var memoryItmId = 0;
var historyItemId = 0;

document.getElementById('memory').addEventListener('click', function (event) {
    event.stopPropagation();
})

document.getElementById('history').addEventListener('click', function (event) {
    event.stopPropagation();
})

window.onclick = function (event) {
    document.getElementById("myNav").style.width = "0";
    document.getElementById('memory').style.display = "none";
    document.getElementById('history').style.display = "none";
    document.getElementById('keypad').style.display = "flex";
}

function resizeWindow() {

    if (window.outerWidth > 712) {

        document.getElementById('keypad').style.display = "flex";
        document.getElementById('memory').style.display = "none";
        document.getElementById('history').style.display = "none";
    }
}

function openNav(event) {
    event.stopPropagation();
    document.getElementById("myNav").style.width = "265px";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0";
}

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
                recalled = false;
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
                console.log(temp)
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
                    console.log("HEYYYYYYYYYY")
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

                if (expression.textContent.includes("/")) {
                    expression.textContent = expression.textContent.substr(0, expression.textContent.lastIndexOf("/") - (3 * (divideAcc - 2)) - 1);
                }

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

            if (txtResult.includes('sqr')) {
                txtResult = txtResult.replace(/\)/g, ",2)");
                txtResult = txtResult.replace(/sqr/g, 'Math.pow');
            }

            if (txtResult.includes('cube')) {
                txtResult = txtResult.replace(/\)/g, ",3)");
                txtResult = txtResult.replace(/cube/g, 'Math.pow');
            }

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
        console.log(recursiveResult + lastOperator + lastResult)

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

    if (txtExpression.includes('sqr')) {
        txtExpression = txtExpression.replace(/\)/g, ",2)");
        txtExpression = txtExpression.replace(/sqr/g, 'Math.pow');
    }

    if (txtExpression.includes('cube')) {
        txtExpression = txtExpression.replace(/\)/g, ",3)");
        txtExpression = txtExpression.replace(/cube/g, 'Math.pow');
    }

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
    if (txtResult === "") {
        result.textContent = "0";

    } else {
        result.textContent = txtResult;

    }

}

function storeInMemory() {

    if (memoryItmId === 0) {

        memoryList1.innerHTML = "";
        trashIcon1.style.display = "flex";
        memoryList2.innerHTML = "";
        trashIcon2.style.display = "flex";

        document.getElementById('mcBtn').className = document.getElementById('mcBtn').className.replace(" disabled", "");
        document.getElementById('mrBtn').className = document.getElementById('mrBtn').className.replace(" disabled", "");
        document.getElementById('mBtn').className = document.getElementById('mBtn').className.replace(" disabled", "");
    }

    var id1 = "item1_" + memoryItmId;
    var id2 = "item2_" + memoryItmId;

    var value = parseFloat(result.textContent);

    var listItem1 = document.createElement("li");
    var savedValue1 = document.createElement("div");
    var savedValueControls1 = document.createElement("div");
    var btnDelete1 = document.createElement("button");
    var btnIncrement1 = document.createElement("button");
    var btnDecrement1 = document.createElement("button");

    var listItem2 = document.createElement("li");
    var savedValue2 = document.createElement("div");
    var savedValueControls2 = document.createElement("div");
    var btnDelete2 = document.createElement("button");
    var btnIncrement2 = document.createElement("button");
    var btnDecrement2 = document.createElement("button");


    listItem1.className = "memory-item";
    savedValue1.className = "saved-value";
    savedValueControls1.className = "saved-value-controls";
    btnDecrement1.className = "control-btn";
    btnIncrement1.className = "control-btn";
    btnDelete1.className = "control-btn";

    listItem2.className = "memory-item";
    savedValue2.className = "saved-value";
    savedValueControls2.className = "saved-value-controls";
    btnDecrement2.className = "control-btn";
    btnIncrement2.className = "control-btn";
    btnDelete2.className = "control-btn";


    savedValue1.textContent = value;
    btnDelete1.textContent = "MC";
    btnIncrement1.textContent = "M+";
    btnDecrement1.textContent = "M-";
    listItem1.setAttribute("value", value);

    savedValue2.textContent = value;
    btnDelete2.textContent = "MC";
    btnIncrement2.textContent = "M+";
    btnDecrement2.textContent = "M-";
    listItem2.setAttribute("value", value);


    btnDelete1.onclick = deleteMemoryItem;
    btnIncrement1.onclick = incremetMemoryItem;
    btnDecrement1.onclick = decrementMemoryItem;

    btnDelete2.onclick = deleteMemoryItem;
    btnIncrement2.onclick = incremetMemoryItem;
    btnDecrement2.onclick = decrementMemoryItem;


    savedValueControls1.appendChild(btnDelete1);
    savedValueControls1.appendChild(btnIncrement1);
    savedValueControls1.appendChild(btnDecrement1);

    savedValueControls2.appendChild(btnDelete2);
    savedValueControls2.appendChild(btnIncrement2);
    savedValueControls2.appendChild(btnDecrement2);

    var lastChild1 = memoryList1.firstChild;
    var lastChild2 = memoryList2.firstChild;

    listItem1.appendChild(savedValue1);
    listItem1.appendChild(savedValueControls1);
    memoryList1.insertBefore(listItem1, lastChild1);

    listItem2.appendChild(savedValue2);
    listItem2.appendChild(savedValueControls2);
    memoryList2.insertBefore(listItem2, lastChild2);


    listItem1.setAttribute("id", id1);
    listItem2.setAttribute("id", id2);

    memoryItmId++;
    txtResult = "";
}

function deleteMemoryItem() {

    var id1 = this.parentNode.parentNode.getAttribute("id");
    var id2 = id1.replace("item1_", "item2_");

    var element1 = document.getElementById(id1);
    var element2 = document.getElementById(id2);

    element1.parentNode.removeChild(element1);
    element2.parentNode.removeChild(element2);

    if (!memoryList1.hasChildNodes()) {
        memoryList1.innerHTML = "<li>There's nothing saved in memory</li>";
        trashIcon1.style.display = "none";
        memoryItmId = 0;

        document.getElementById('mcBtn').className += " disabled";
        document.getElementById('mrBtn').className += " disabled";
        document.getElementById('mBtn').className += " disabled";

    }

    if (!memoryList2.hasChildNodes()) {
        memoryList2.innerHTML = "<li>There's nothing saved in memory</li>";
        trashIcon2.style.display = "none";
        memoryItmId = 0;

        document.getElementById('mcBtn').className += " disabled";
        document.getElementById('mrBtn').className += " disabled";
        document.getElementById('mBtn').className += " disabled";
    }
}

function incremetMemoryItem() {

    var id1 = this.parentNode.parentNode.getAttribute("id");
    var id2 = id1.replace("item1_", "item2_");

    var element1 = document.getElementById(id1).childNodes[0];
    var element2 = document.getElementById(id2).childNodes[0];

    var value = parseFloat(result.textContent);

    var result1 = parseFloat(element1.textContent);
    var result2 = parseFloat(element2.textContent);

    result1 += value;
    result2 += value;

    element1.textContent = result1;
    element2.textContent = result2;
}

function decrementMemoryItem() {

    var id1 = this.parentNode.parentNode.getAttribute("id");
    var id2 = id1.replace("item1_", "item2_");

    var element1 = document.getElementById(id1).childNodes[0];
    var element2 = document.getElementById(id2).childNodes[0];

    var value = parseFloat(result.textContent);

    var result1 = parseFloat(element1.textContent);
    var result2 = parseFloat(element2.textContent);

    result1 -= value;
    result2 -= value;

    element1.textContent = result1;
    element2.textContent = result2;
}

function memoryTrashFunct() {

    memoryList1.innerHTML = "<li>There's nothing saved in memory</li>";
    memoryList2.innerHTML = "<li style='margin-top: 12px'>There's nothing saved in memory</li>";

    trashIcon1.style.display = "none";
    trashIcon2.style.display = "none";

    memoryItmId = 0;

    document.getElementById('mcBtn').className += " disabled";
    document.getElementById('mrBtn').className += " disabled";
    document.getElementById('mBtn').className += " disabled";
}

function memoryRecall() {
    var id = memoryList1.firstChild.getAttribute('id');
    txtResult = document.getElementById(id).childNodes[0].textContent;
    result.textContent = txtResult;
    recalled = true;
}

function memoryAdd() {

    if (memoryItmId === 0) {
        storeInMemory();
        return;
    }

    var id1 = memoryList1.firstChild.getAttribute('id');
    var id2 = memoryList2.firstChild.getAttribute('id');

    var element1 = document.getElementById(id1).childNodes[0];
    var element2 = document.getElementById(id2).childNodes[0];

    var value = parseFloat(result.textContent);

    var result1 = parseFloat(element1.textContent);
    var result2 = parseFloat(element2.textContent);

    result1 += value;
    result2 += value;

    element1.textContent = result1;
    element2.textContent = result2;
}

function memorySub() {

    if (memoryItmId === 0) {
        storeInMemory();
        return;
    }

    var id1 = memoryList1.firstChild.getAttribute('id');
    var id2 = memoryList2.firstChild.getAttribute('id');

    var element1 = document.getElementById(id1).childNodes[0];
    var element2 = document.getElementById(id2).childNodes[0];

    var value = parseFloat(result.textContent);

    var result1 = parseFloat(element1.textContent);
    var result2 = parseFloat(element2.textContent);

    result1 -= value;
    result2 -= value;

    element1.textContent = result1;
    element2.textContent = result2;
}

function openMemory(evt) {
    evt.stopPropagation();
    document.getElementById('memory').style.display = "flex";
    document.getElementById('keypad').style.display = "none";
    document.getElementById('history').style.display = "none";
}

function openHistory(evt) {
    evt.stopPropagation();
    document.getElementById('memory').style.display = "none";
    document.getElementById('keypad').style.display = "none";
    document.getElementById('history').style.display = "flex";
}

function changeScreenMode(evt, mode) {
    var tabs = document.getElementsByClassName("memory-tablink");
    switch (mode) {
        case 'history':
            document.getElementById('memoryScreen').style.display = "none";
            document.getElementById('historyScreen').style.display = "block";
            tabs[1].className = tabs[1].className.replace(" active-memorytab-item", "");
            evt.currentTarget.className += " active-memorytab-item";
            break;
        case 'memory':
            document.getElementById('historyScreen').style.display = "none";
            document.getElementById('memoryScreen').style.display = "block";
            tabs[0].className = tabs[0].className.replace(" active-memorytab-item", "");
            evt.currentTarget.className += " active-memorytab-item";
            break;
    }
}

function addHistory() {

    if (historyItemId === 0) {

        historyList1.innerHTML = "";
        trashIcon3.style.display = "flex";
        historyList2.innerHTML = "";
        trashIcon4.style.display = "flex";

        document.getElementById('historyIcon').className = document.getElementById('historyIcon').className.replace(" disabled", "");
    }

    var id1 = "hItem1_" + historyItemId;
    var id2 = "hItem2_" + historyItemId;

    var listItem1 = document.createElement("li");
    var itemExpression1 = document.createElement("div");
    var itemResult1 = document.createElement("div");

    var listItem2 = document.createElement("li");
    var itemExpression2 = document.createElement("div");
    var itemResult2 = document.createElement("div");

    listItem1.className = "history-item";
    itemExpression1.className = "history-item-expression";
    itemResult1.className = "history-item-result";

    listItem2.className = "history-item";
    itemExpression2.className = "history-item-expression";
    itemResult2.className = "history-item-result";

    itemExpression1.textContent = expression.textContent + " =";
    itemResult1.textContent = result.textContent;

    itemExpression2.textContent = expression.textContent + " =";
    itemResult2.textContent = result.textContent;

    listItem1.onclick = historyItemClick;
    listItem2.onclick = historyItemClick;

    var lastChild1 = historyList1.firstChild;
    var lastChild2 = historyList2.firstChild;

    listItem1.appendChild(itemExpression1);
    listItem1.appendChild(itemResult1);
    historyList1.insertBefore(listItem1, lastChild1);

    listItem2.appendChild(itemExpression2);
    listItem2.appendChild(itemResult2);
    historyList2.insertBefore(listItem2, lastChild2);


    listItem1.setAttribute("id", id1);
    listItem2.setAttribute("id", id2);

    historyItemId++;
}

function historyItemClick() {

    var id = this.id;
    // console.log(this.id)
    var element = document.getElementById(id);
    console.log(element)
    expression.textContent = "";
    result.textContent = "";
    expression.textContent = element.childNodes[0].textContent.substr(0, element.childNodes[0].textContent.length - 2);
    result.textContent = element.childNodes[1].textContent;
    txtExpression = expression.textContent;
}

function historyTrashFunct() {

    historyList1.innerHTML = "<li>There's no history yet</li>";
    historyList2.innerHTML = "<li style='margin-top: 12px'>There's no history yet</li>";

    trashIcon3.style.display = "none";
    trashIcon4.style.display = "none";

    historyItemId = 0;

    document.getElementById('historyIcon').className += " disabled";
}