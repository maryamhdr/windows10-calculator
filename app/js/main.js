"usestrict";

var expression = document.getElementById("expression");
var result = document.getElementById("result");
var memoryList1 = document.getElementById("memoryList1");
var memoryList2 = document.getElementById("memoryList2");
var trashIcon1 = document.getElementById("trashIcon1");
var trashIcon2 = document.getElementById("trashIcon2");

var txtResult = "";
var txtExpression = "";
var lastResult = 0;
var lastOperator = "+";

var memoryItmId = 0;

window.onclick = function (event) {
    document.getElementById("myNav").style.width = "0";
}

function resizeWindow() {
    
    if(window.outerWidth > 560){
        let i, tabcontent, tablinks;
    
        tabcontent = document.getElementsByClassName("main-btn-container");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
    
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    
        document.getElementById("keypad").style.display = "flex";
        
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

            if (expression.textContent === "0") {
                expression.textContent = "";
            }

            txtExpression += txtResult;
            txtExpression = txtExpression.replace("÷", "/");
            txtExpression = txtExpression.replace("×", "*");
            lastResult = eval(txtExpression);
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
        memoryList1.innerHTML = "";
        trashIcon1.style.display = "flex";
        memoryList2.innerHTML = "";
        trashIcon2.style.display = "flex";
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


    listItem1.appendChild(savedValue1);
    listItem1.appendChild(savedValueControls1);
    memoryList1.appendChild(listItem1);

    listItem2.appendChild(savedValue2);
    listItem2.appendChild(savedValueControls2);
    memoryList2.appendChild(listItem2);


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
    }

    if (!memoryList2.hasChildNodes()) {
        memoryList2.innerHTML = "<li>There's nothing saved in memory</li>";
        trashIcon2.style.display = "none";
        memoryItmId = 0;
    }
}

function incremetMemoryItem() {

    var id1 = this.parentNode.parentNode.getAttribute("id");
    var id2 = id1.replace("item1_", "item2_");

    var element1 = document.getElementById(id1).childNodes[0];
    var element2 = document.getElementById(id2).childNodes[0];

    var value1 = parseFloat(document.getElementById(id1).getAttribute("value"));
    var value2 = parseFloat(document.getElementById(id2).getAttribute("value"));

    var result1 = parseFloat(element1.textContent);
    var result2 = parseFloat(element2.textContent);

    result1 += value1;
    result2 += value2;

    element1.textContent = result1;
    element2.textContent = result2;
}

function decrementMemoryItem() {

    var id1 = this.parentNode.parentNode.getAttribute("id");
    var id2 = id1.replace("item1_", "item2_");

    var element1 = document.getElementById(id1).childNodes[0];
    var element2 = document.getElementById(id2).childNodes[0];

    var value1 = parseFloat(document.getElementById(id1).getAttribute("value"));
    var value2 = parseFloat(document.getElementById(id2).getAttribute("value"));

    var result1 = parseFloat(element1.textContent);
    var result2 = parseFloat(element2.textContent);

    result1 -= value1;
    result2 -= value2;

    element1.textContent = result1;
    element2.textContent = result2;
}

function trashFunct() {

    memoryList1.innerHTML = "<li>There's nothing saved in memory</li>";
    memoryList2.innerHTML = "<li>There's nothing saved in memory</li>";
    
    trashIcon1.style.display = "none";
    trashIcon2.style.display = "none";
    
    memoryItmId = 0;
}
