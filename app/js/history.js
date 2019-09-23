function addHistory() {
    if (historyItemId === 0) {

        historyList1.innerHTML = "";
        trashIcon3.style.display = "flex";
        historyList2.innerHTML = "";
        trashIcon4.style.display = "flex";

        historyIcon.className = historyIcon.className.replace(" disabled", "");
    }

    const id1 = "hItem1_" + historyItemId;
    const id2 = "hItem2_" + historyItemId;

    const listItem1 = document.createElement("li");
    const itemExpression1 = document.createElement("div");
    const itemResult1 = document.createElement("div");

    const listItem2 = document.createElement("li");
    const itemExpression2 = document.createElement("div");
    const itemResult2 = document.createElement("div");

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


    listItem1.id = id1;
    listItem2.id = id2;

    historyItemId++;
}

function historyItemClick() {
    const id = this.id;
    const element = document.getElementById(id);
    
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

    historyIcon.className += " disabled";
}