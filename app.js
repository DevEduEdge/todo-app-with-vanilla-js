//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoContainer = document.querySelector(".todo-container");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//!Creating Global Functions

// Creating TODO DIV WITH LIST AND BUTTONS
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  //Todo DIV
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
    deleteTodo.classList.add("fall");
    //  the transition property for Chrome and Firefox is different.
    deleteTodo.addEventListener("webkitTransitionEnd", function () {
      deleteTodo.remove();
    });
    //todo Add a confirmation popup when the project is finalized and then debug it. 🚀
  }

  //Check Mark
  if (todoItem.classList[0] === "complete-btn") {
    const completeTodo = todoItem.parentElement;
    completeTodo.classList.toggle("completed");
  }
  // !Adding to completed List
  // !competedLocalTodos(todoItem.value);
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
  if (localStorage.getItem("todos") === null) {
    localTodos = [];
  } else {
    localTodos = JSON.parse(localStorage.getItem("todos"));
  }
  localTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(localTodos));
  console.log(localStorage);
}

//! NEED TO CHECK MORE ON THIS

// function competedLocalTodos(complete) {
//   let completedTodos;
//   if (localStorage.getItem("completed") === null) {
//     completedTodos = [];
//   } else {
//     completedTodos = JSON.parse(localStorage.getItem("completed"));
//   }
//   completedTodos.push(complete);
//   localStorage.setItem("todos", JSON.stringify(completedTodos));
//   console.log(localStorage);
// }
