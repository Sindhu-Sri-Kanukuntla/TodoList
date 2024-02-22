let ulEl = document.getElementById("ulId");
let btn = document.getElementById("addBtn");
let saveBtn = document.getElementById("saveBtnId");

function getStoredTodo(){
    let gotTodo = localStorage.getItem("todo");
    let parsedTodo = JSON.parse(gotTodo);
    if(parsedTodo === null){
        return [];
    }else{
        return parsedTodo;
    }
}

let todo = getStoredTodo();

saveBtn.onclick = function(){
    localStorage.setItem("todo", JSON.stringify(todo));
}

let todosCount = todo.length;

btn.onclick = function(){
    onAddTodo();
}

function onTodoStatusChange(checkboxId, labelId, todoId){
    let checkboxEl = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId);
    labelEl.classList.toggle("checked");
    
    let index = todo.findIndex(function(eachTodo){
        let elementTodoId = "todo" + eachTodo.uniqueNo;
        if(elementTodoId === todoId){
            return true;
        }else{
            return false;
        }
    })
    let reqTodoEl = todo[index];
    if(reqTodoEl.isChecked === true){
        reqTodoEl.isChecked = false;
    }else{
        reqTodoEl.isChecked = true;
    }
}
function onDeleteTodo(todoId){
    let todoEl = document.getElementById(todoId);
    ulEl.removeChild(todoEl);
    let index = todo.findIndex(function(eachTodo){
        let toDeleteTodo = "todo" + eachTodo.uniqueNo;
        if(todoId === toDeleteTodo){
            return true;
        }else{
            return false;
        }
    });
    todo.splice(index, 1);
}

function createAndAppendTodo(todo){
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let listEl = document.createElement("li");
    listEl.id = todoId;
    listEl.classList.add("list-element");
    ulEl.appendChild(listEl);

    let inputEl = document.createElement("input");
    inputEl.classList.add("check-box");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked;
    inputEl.onclick = function(){
        onTodoStatusChange(checkboxId, labelId, todoId);
    }
    listEl.appendChild(inputEl);

    let labelContainerEl = document.createElement("div");
    labelContainerEl.classList.add("label-container");
    listEl.appendChild(labelContainerEl);

    let labelEl = document.createElement("label");
    labelEl.htmlFor = checkboxId;
    labelEl.id = labelId;
    labelEl.textContent = todo.text;
    if(todo.isChecked === true){
        labelEl.classList.add("checked");
    }
    labelContainerEl.appendChild(labelEl);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainerEl.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can");
    deleteIcon.onclick = function(){
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);

}

function onAddTodo(){
    let userInput = document.getElementById("userInputId");
    let userInputValue = userInput.value;
    if(userInputValue===""){
        alert("Enter Valid Input");
        return;
    }
    todosCount = todosCount + 1;
    let newTodo = {text: userInputValue, uniqueNo: todosCount, isChecked: false};
    todo.push(newTodo);
    createAndAppendTodo(newTodo);
    userInput.value = "";
}

for (let skill of todo){
    createAndAppendTodo(skill);
}