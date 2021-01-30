//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoContainer = document.querySelector(".todo-container");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Creating Global Functions

// Creating TODO DIV WITH LIST AND BUTTONS
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  //Creating Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  if (todoInput.value === "") {
    alert("Input-Field Cannot be empty");
  } else {
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    // Checkmarked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Delete Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append TO LIST
    todoList.appendChild(todoDiv);

    //Clear Todo Input Value
    todoInput.value = "";
  }
}

// Completed and Delete Function
function deleteCheck(e) {
  const todoItem = e.target;
  //Delete Todo
  if (todoItem.classList[0] === "trash-btn") {
    const deleteTodo = todoItem.parentElement;
    //Adding Fall Animation
    deleteTodo.classList.add("fall");
    removeLocalTodos(deleteTodo);
    //Transition property for Chrome and Firefox is different.
    deleteTodo.addEventListener("webkitTransitionEnd", function () {
      deleteTodo.remove();
    });
    //Add a confirmation popup when the project is finalized and then debug it. 🚀
  }

  //Check Mark
  if (todoItem.classList[0] === "complete-btn") {
    const completeTodo = todoItem.parentElement;
    completeTodo.classList.toggle("completed");
  }
}

//Filter-TODO Function
function filterTodo(e) {
  const filterTodos = todoList.childNodes;
  filterTodos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Adding todo item to local storage
function saveLocalTodos(todo) {
  //Check for items already in Local Storage
  let localTodos;
  if (localStorage.getItem("saveTodos") === null) {
    localTodos = [];
  } else {
    localTodos = JSON.parse(localStorage.getItem("saveTodos"));
  }
  localTodos.push(todo);
  localStorage.setItem("saveTodos", JSON.stringify(localTodos));
}
// Getting todo item from local storage
function getTodos(todo) {
  let showTodos;
  if (localStorage.getItem("saveTodos") === null) {
    showTodos = [];
  } else {
    showTodos = JSON.parse(localStorage.getItem("saveTodos"));
  }
  showTodos.forEach(function (todo) {
    //Creating Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Delete Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append TO LIST
    todoList.appendChild(todoDiv);
  });
}
// Deleting todo item from local storage
function removeLocalTodos(todo) {
  let removeTodos;
  if (localStorage.getItem("saveTodos") === null) {
    removeTodos = [];
  } else {
    removeTodos = JSON.parse(localStorage.getItem("saveTodos"));
  }
  const todoIndex = todo.children[0].innerText;
  removeTodos.splice(removeTodos.indexOf(todoIndex), 1);
  localStorage.setItem("saveTodos", JSON.stringify(removeTodos));
}
