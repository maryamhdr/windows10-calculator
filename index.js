document.getElementsByClassName("tablinks")[0].className += " active";
document.getElementById("keypad").style.display = "flex";
document.getElementById("btn1").className += " active";

var expression = document.getElementById("expression");
var result = document.getElementById("result");

var txtResult = "";
var txtExpression = "";

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
            txtResult += value;
            result.textContent = txtResult;
            break;
        case 'symbol':
            if(value === "±") {
                if(txtResult.includes("-")){
                    txtResult = txtResult.replace("-", "");
                    txtResult = txtResult.replace("(", "");
                    txtResult = txtResult.replace(")", "");
                    result.textContent = txtResult;
                    return;
                }
                txtResult = "(-" + txtResult + ")";
                console.log(txtResult);
                result.textContent = txtResult;
                return;
            }
            txtResult += " " + value + " ";
            txtExpression += txtResult;
            expression.textContent = txtExpression;
            result.textContent = "0";
            txtResult = "";
            break;
    }

}

function calculateResult() {

    var calExpression = "";

    if (txtExpression === "") {
        return;
    }

    txtExpression += txtResult;
    calExpression = txtExpression;
    txtExpression += " =";
    expression.textContent = txtExpression;

    txtResult = "";
    txtExpression = "";

    calExpression = calExpression.replace("÷", "/");
    calExpression = calExpression.replace("×", "*");
    // console.log(calExpression);
    // console.log(eval(calExpression));
    result.textContent = eval(calExpression);
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
        // console.log("null");
        result.textContent = "0";
        return;
    }

    txtResult = txtResult.substring(0, txtResult.length - 1);
    if (txtResult === "") {
        result.textContent = "0";
        // console.log(txtResult)
    } else {
        result.textContent = txtResult;
        // console.log(txtResult)
    }

}