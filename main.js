const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novermber",
  "December",
];
const lang = navigator.language;
const d = new Date();
const dayname = d.toLocaleString(lang, { weekday: "long" });
const daynumber = d.getDate();
const month = months[d.getMonth()];

document.querySelector(".date").innerHTML = `${dayname} , ${daynumber}th`;
document.querySelector(".month").innerHTML = month;  

const taskinput = document.querySelector(".task-input");
const taskaddbtn = document.querySelector(".add-task-btn");
let filter = document.querySelectorAll(".task-menu-container span");
const checkbox = document.querySelector(".checkbox");
const todos = JSON.parse(localStorage.getItem("todo-list") || "[]");
console.log(todos);
let UpdateId;
let isUpdate = false;


filter.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodos(btn.id);
   });
});

  // Hien thi danh sach cong viec
// Update the showTodos function to add draggable attribute to the task-list div
function showTodos(filter) {
  document.querySelectorAll(".task-list").forEach((todo) => {
    todo.remove();
  });

  let liTag = "";
  
  todos.forEach((todo, id) => {
    let isCompleted = todo.status == "completed" ? "checked" : "";
    
    let taskDate = todo.date ? new Date(todo.date).toLocaleString() : "No date available";
    
    if (filter == todo.status || filter == "all") {
      liTag += `
      <div class="task-list" draggable="true" ondragstart="drag(event)" id="task-${id}">
        <label for="${id}">
          <input onclick="taskcomplete(this)"
            type="checkbox" id="${id}" class="checkbox"
            ${isCompleted}>
          <h3 class="task ${isCompleted}">${todo.name}</h3>
        </label>
        <div class="task-date">Created on: ${taskDate}</div>
        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
        <div class="menu">
          <span onclick="editTask(${id}, '${todo.name}')" class="edit-btn">
            <i class="fa-solid fa-pen"></i> Edit
          </span>
          <span onclick="deleteTask(${id})" class="delete-btn">
            <i class="fa-solid fa-trash"></i> Delete
          </span>
        </div>
      </div>`;
    }
  });

  let currentTime = new Date().toLocaleString();
  document.querySelector(".task-list-container").innerHTML =
    liTag || `
    <span><i class="fa-solid fa-clipboard-list"></i></span>
    <span class="current-time">Today time is: ${currentTime}</span>
    <span class="no-task-message">No task here yet</span>`;
}

showTodos("all");

let draggedTask = null;

function drag(event) {
  draggedTask = event.target;
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const targetElement = event.target.closest(".task-list");

  if (targetElement && draggedTask) {
    let taskContainer = document.querySelector(".task-list-container");
    let referenceTask = targetElement;

    taskContainer.insertBefore(draggedTask, referenceTask.nextSibling);

    draggedTask = null; 
  }
}

function allowDrop(event) {
  event.preventDefault();
}

const taskListContainer = document.querySelector(".task-list-container");
taskListContainer.addEventListener("dragover", allowDrop);
taskListContainer.addEventListener("drop", drop);


taskaddbtn.addEventListener("click", (e) => {
  if (taskinput.value != "") {
    var divlist = document.querySelectorAll(".task-list").length;
    document.querySelector(".number-of-tasks").innerHTML = divlist + " Tasks";
    let userTask = taskinput.value;
    if (!isUpdate) {
      let taskinfo = { name: userTask, status: "Pending" ,date: d};
      todos.push(taskinfo);
    } else {
      isUpdate = false;
      todos[UpdateId].name = userTask;
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    taskinput.value = "";
    showTodos("all");
  }
  var divlist = document.querySelectorAll(".task-list").length;
  document.querySelector(".number-of-tasks").innerHTML = divlist + " Tasks";
});

function taskcomplete(elem) {
  if (elem.checked) {
    elem.nextElementSibling.classList.add("checked");
    todos[elem.id].status = "Completed";
  } else {
    elem.nextElementSibling.classList.remove("checked");
    todos[elem.id].status = "Pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
function showMenu(selectelem) {
  selectelem.parentElement.lastElementChild.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectelem) {
      selectelem.parentElement.lastElementChild.classList.remove("show");
    }
  });
}

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodos("all");
  var divlist = document.querySelectorAll(".task-list").length;
  document.querySelector(".number-of-tasks").innerHTML = divlist + " Tasks";
}
function editTask(taskId, taskName) {
  isUpdate = true;
  UpdateId = taskId;
  taskinput.value = taskName;
  taskinput.focus();
}
document.querySelector(".clear-all-btn").addEventListener("click", () => {
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodos("all");
  var divlist = document.querySelectorAll(".task-list").length;
  document.querySelector(".number-of-tasks").innerHTML = divlist + " Tasks";
});
var divlist = document.querySelectorAll(".task-list").length;
document.querySelector(".number-of-tasks").innerHTML = divlist + " Tasks";


let lists = document.getElementsByClassName("task");
let box = document.getElementsByClassName("task-list-container");
for(list of lists)
  {
   list.addEventListener("dragstart" ,function(e){

    let selected =e.target;
    box.addEventListener("dragover",function(e){
      e.prevetDefault(); 
    });
    box.addEventListener("drop",function(e){
      box.appendChild(selected);
      selected = null;
    })

   })
  };
  














const CurrentTime = document.querySelector(".current-time");
console.log(CurrentTime);


function putzero(num){
  return (num<10)?`0${num}`:num
}
function showTime() {
   let cdate = new Date();
   let hours = cdate.getHours()
   let AmOrPm = (hours>12)?`Pm`:`Am`
   let stringDate = `${putzero( hours%12)} : ${putzero(cdate.getMinutes()) } : ${ putzero(cdate.getSeconds()) } ${AmOrPm}`
   CurrentTime.innerHTML = stringDate
   setTimeout(function(){
    showTime()
   },1000)
}
showTime();
