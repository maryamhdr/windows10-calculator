document.getElementsByClassName("tablinks")[0].className += " active";
document.getElementById("keypad").style.display = "flex";
document.getElementById("btn1").className += " active";

var expression = document.getElementById("expression");
var result = document.getElementById("result");
var memoryList = document.getElementById("memoryList");
var emptyMemory = document.getElementById("emptyMemory");
var trashIcon = document.getElementById("trashIcon");

var txtResult = "";
var txtExpression = "";
var lastResult = 0;
var lastOperator = "+";

var memoryItmId = 0;

function changekbdmode(evt, keyMode) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("main-btn-container");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(keyMode).style.display = "flex";
    evt.currentTarget.className += " active";
}

function activescrbtn(evt, activeBtn) {
    var i, btns;

    btns = document.getElementsByClassName("scr-btn");
    for (i = 0; i < btns.length; i++) {
        btns[i].className = btns[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
}

function openNav() {
    document.getElementById("myNav").style.width = "265px";
    // document.getElementById("sidenav").children.style.display = "block"
}

function closeNav() {
    document.getElementById("myNav").style.width = "0";
    // document.getElementById("sidenav").children.style.display = "none"
}

function openCal() {
    document.getElementById("myCal").style.display = "block";
    document.getElementById("openIcon").style.display = "none";
}

function closeCal() {
    document.getElementById("myCal").style.display = "none";
    document.getElementById("openIcon").style.display = "inline-block";
    txtResult = "";
    txtExpression = "";
    result.textContent = "0";
    expression.textContent = "0";
    memoryList.innerHTML = "<li>There's nothing saved in memory</li>";
    memoryItmId = 0;
}

function minimizeCal() {
    document.getElementById("myCal").style.display = "none";
    document.getElementById("openIcon").style.display = "inline-block";
}

function valueBtnHandler(value, type) {

    if (txtResult === "") {
        if (type === 'symbol') {
            return;
        }
        if (txtExpression === "") {
            if (value === "0") {
                return;
            }
        }

    }

    switch (type) {
        case 'number':

            if(value === "." && txtResult.includes(".")){
                return;
            }

            if(value === "." && txtResult === ""){
                txtResult = "0";
            }
        
            txtResult += value;
            result.textContent = txtResult;
            lastResult = parseFloat(txtResult);
            // console.log(lastResult);
            break;
        case 'symbol':
            if (value === "±") {
                if (txtResult.includes("-")) {
                    txtResult = txtResult.replace("-", "");
                    txtResult = txtResult.replace("(", "");
                    txtResult = txtResult.replace(")", "");
                    result.textContent = txtResult;
                    return;
                }
                txtResult = "(-" + txtResult + ")";
                result.textContent = txtResult;
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
            // console.log(lastResult);

            if (expression.textContent === "0") {
                expression.textContent = "";
            }

            txtExpression += txtResult;
            txtExpression = txtExpression.replace("÷", "/");
            txtExpression = txtExpression.replace("×", "*");
            lastResult = eval(txtExpression);
            // console.log(lastResult);
            txtExpression = lastResult + value;

            result.textContent = lastResult;
            expression.textContent += txtResult + " " + value + " ";

            txtResult = "";
            break;
    }

}

function calculateResult() {

    txtExpression += txtResult;

    if (txtExpression === "") {

        let recursiveResult = parseFloat(result.textContent);
        result.textContent = eval(recursiveResult + lastOperator + lastResult);
        expression.textContent = "0";
        return;
    }

    if (txtExpression.charAt(txtExpression.length - 1) === "+" ||
        txtExpression.charAt(txtExpression.length - 1) === "-" ||
        txtExpression.charAt(txtExpression.length - 1) === "÷" ||
        txtExpression.charAt(txtExpression.length - 1) === "×") {

        let recursiveResult = parseFloat(result.textContent);

        result.textContent = eval(recursiveResult + lastOperator + lastResult);

        txtResult = "";
        txtExpression = "";
        return;

    }
    
    txtExpression = txtExpression.replace("÷", "/");
    txtExpression = txtExpression.replace("×", "*");
    result.textContent = eval(txtExpression);
    expression.textContent += txtResult + " =";

    txtResult = "";
    txtExpression = "";

}

function clearAllInput() {
    txtResult = "";
    txtExpression = "";
    result.textContent = "0";
    expression.textContent = "0";
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
        memoryList.innerHTML = "";
        trashIcon.style.display = "flex";
    }

    var id = "item" + memoryItmId;

    var value = parseFloat(result.textContent);

    var listItem = document.createElement("li");
    var savedValue = document.createElement("div");
    var savedValueControls = document.createElement("div");
    var btnDelete = document.createElement("button");
    var btnIncrement = document.createElement("button");
    var btnDecrement = document.createElement("button");

    listItem.className = "memory-item";
    savedValue.className = "saved-value";
    savedValueControls.className = "saved-value-controls";
    btnDecrement.className = "control-btn";
    btnIncrement.className = "control-btn";
    btnDelete.className = "control-btn";

    savedValue.textContent = value;
    btnDelete.textContent = "MC";
    btnIncrement.textContent = "M+";
    btnDecrement.textContent = "M-";
    listItem.setAttribute("value", value);

    btnDelete.onclick = deleteMemoryItem;
    btnIncrement.onclick = incremetMemoryItem;
    btnDecrement.onclick = decrementMemoryItem;

    savedValueControls.appendChild(btnDelete);
    savedValueControls.appendChild(btnIncrement);
    savedValueControls.appendChild(btnDecrement);

    listItem.appendChild(savedValue);
    listItem.appendChild(savedValueControls);
    memoryList.appendChild(listItem);

    listItem.setAttribute("id", id);

    memoryItmId++;
    txtResult = "";
}

function deleteMemoryItem() {
    // console.log(this.parentNode.parentNode.getAttribute("id"))
    var id = this.parentNode.parentNode.getAttribute("id");
    var element = document.getElementById(id);

    element.parentNode.removeChild(element);

    if (!memoryList.hasChildNodes()) {
        memoryList.innerHTML = "<li>There's nothing saved in memory</li>";
        trashIcon.style.display = "none";
        memoryItmId = 0;
    }
}

function incremetMemoryItem() {
    var id = this.parentNode.parentNode.getAttribute("id");
    var element = document.getElementById(id).childNodes[0];
    var value = parseFloat(document.getElementById(id).getAttribute("value"));
    var result = parseFloat(element.textContent);

    result += value;
    element.textContent = result;
}

function decrementMemoryItem() {
    var id = this.parentNode.parentNode.getAttribute("id");
    var element = document.getElementById(id).childNodes[0];
    var value = parseFloat(document.getElementById(id).getAttribute("value"));
    var result = parseFloat(element.textContent);

    result -= value;
    element.textContent = result;
}

function trashFunct() {
    memoryList.innerHTML = "<li>There's nothing saved in memory</li>";
    trashIcon.style.display = "none";
    memoryItmId = 0;
}