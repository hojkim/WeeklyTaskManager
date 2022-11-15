// Selectors
const taskInput = document.querySelector(".task-input");
const taskButton = document.querySelector(".task-button");
const dayFilter = document.querySelector(".filter-day");
const taskFilter = document.querySelector(".filter-task");
const clearButton = document.querySelector(".clear-btn");

alert(
   "Currently does not work properly with MacOS browsers. Will be fixing soon. Apologies."
);

// Global Variables
let list = document.querySelector(".task-list");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTasks);
document.addEventListener("DOMContentLoaded", getDay);
taskButton.addEventListener("click", addTask);
list.addEventListener("click", checkDelete);
dayFilter.addEventListener("click", filterDays);
taskFilter.addEventListener("click", filterTasks);
clearButton.addEventListener("click", clearTasks);

// Functions

// Adds a new task item into the filtered day section's list of tasks
function addTask(event) {
   // prevents form submission
   event.preventDefault();
   const day = localStorage.getItem("day");

   if (day === "mon") {
      list = document.querySelector("#monday");
   } else if (day === "tues") {
      list = document.querySelector("#tuesday");
   } else if (day === "wed") {
      list = document.querySelector("#wednesday");
   } else if (day === "thur") {
      list = document.querySelector("#thursday");
   } else if (day === "fri") {
      list = document.querySelector("#friday");
   } else if (day === "sat") {
      list = document.querySelector("#saturday");
   } else {
      list = document.querySelector("#sunday");
   }
   createTask(list);
   list.addEventListener("click", checkDelete);
}

// Creates a new task item with the user's input as the text
function createTask(list) {
   const taskDiv = document.createElement("div");
   taskDiv.classList.add("task");

   const newTask = document.createElement("li");
   newTask.innerText = taskInput.value;
   // saves new task value into local storage
   saveTasks(taskInput.value, dayFilter.value);
   newTask.classList.add("task-item");
   taskDiv.appendChild(newTask);

   // clears taskInput value after submitting
   taskInput.value = "";

   const checkButton = document.createElement("button");
   checkButton.innerHTML = '<i class="fa fa-check"></i>';
   checkButton.classList.add("check-button");
   taskDiv.appendChild(checkButton);

   const removeButton = document.createElement("button");
   removeButton.innerHTML = '<i class="fa fa-trash"></i>';
   removeButton.classList.add("remove-button");
   taskDiv.appendChild(removeButton);

   list.appendChild(taskDiv);
}

// Gives functionality to check and trash buttons on each task
function checkDelete(event) {
   const item = event.target;
   const task = item.parentElement;
   const title =
      task.parentElement.parentElement.parentElement.children[0].innerHTML;
   let day;

   if (title === "Tuesday") {
      day = "tues";
   } else if (title === "Wednesday") {
      day = "wed";
   } else if (title === "Thursday") {
      day = "thur";
   } else if (title === "Friday") {
      day = "fri";
   } else if (title === "Saturday") {
      day = "sat";
   } else if (title === "Sunday") {
      day = "sun";
   } else {
      day = "mon";
   }

   if (item.classList[0] === "remove-button") {
      task.classList.add("removed");
      deleteTasks(task, day);
      task.addEventListener("transitionend", function () {
         task.remove();
      });
   }

   if (item.classList[0] === "check-button") {
      task.classList.toggle("checked");
      item.classList.toggle("checked-button");
   }
}

// Updates the set value of the day in the filter selection to the local storage
function filterDays(event) {
   const day = event.target.value;
   localStorage.setItem("day", day);
}

// Allows task filters to display those that are completed, uncompleted, and all
function filterTasks(event) {
   const tasks = document.querySelectorAll(".task");
   tasks.forEach(function (task) {
      switch (event.target.value) {
         case "all":
            task.style.display = "flex";
            break;
         case "completed":
            if (task.classList.contains("checked")) {
               task.style.display = "flex";
            } else {
               task.style.display = "none";
            }
            break;
         case "uncompleted":
            if (!task.classList.contains("checked")) {
               task.style.display = "flex";
            } else {
               task.style.display = "none";
            }
            break;
      }
   });
}

// Saves the day in filter selection to local storage so that it remains when page is refreshed
function getDay() {
   if (localStorage.getItem("day") === null) {
      localStorage.setItem("day", "mon");
      dayFilter.value = "mon";
   } else {
      dayFilter.value = localStorage.getItem("day");
   }
}

// Saves existing tasks to the local storage and allows for them to show up in the same sections when page is refreshed
function getTasks() {
   let tasks;
   if (localStorage.getItem("tasks") === null) {
      tasks = {
         mon: [],
         tues: [],
         wed: [],
         thur: [],
         fri: [],
         sat: [],
         sun: [],
      };
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }

   for (const day in tasks) {
      tasks[day].forEach(function (task) {
         if (day === "mon") {
            list = document.querySelector("#monday");
         } else if (day === "tues") {
            list = document.querySelector("#tuesday");
         } else if (day === "wed") {
            list = document.querySelector("#wednesday");
         } else if (day === "thur") {
            list = document.querySelector("#thursday");
         } else if (day === "fri") {
            list = document.querySelector("#friday");
         } else if (day === "sat") {
            list = document.querySelector("#saturday");
         } else {
            list = document.querySelector("#sunday");
         }

         const taskDiv = document.createElement("div");
         taskDiv.classList.add("task");

         const newTask = document.createElement("li");
         newTask.innerText = task;
         newTask.classList.add("task-item");
         taskDiv.appendChild(newTask);
         taskInput.value = "";

         const checkButton = document.createElement("button");
         checkButton.innerHTML = '<i class="fa fa-check"></i>';
         checkButton.classList.add("check-button");
         taskDiv.appendChild(checkButton);

         const removeButton = document.createElement("button");
         removeButton.innerHTML = '<i class="fa fa-trash"></i>';
         removeButton.classList.add("remove-button");
         taskDiv.appendChild(removeButton);

         list.appendChild(taskDiv);
         list.addEventListener("click", checkDelete);
      });
   }
}

// Saves existing tasks to the local storage
function saveTasks(task, day) {
   let tasks;
   if (localStorage.getItem("tasks") === null) {
      tasks = {
         mon: [],
         tues: [],
         wed: [],
         thur: [],
         fri: [],
         sat: [],
         sun: [],
      };
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }

   if (day === "tues") {
      tasks.tues.push(task);
   } else if (day === "wed") {
      tasks.wed.push(task);
   } else if (day === "thur") {
      tasks.thur.push(task);
   } else if (day === "fri") {
      tasks.fri.push(task);
   } else if (day === "sat") {
      tasks.sat.push(task);
   } else if (day === "sun") {
      tasks.sun.push(task);
   } else {
      tasks.mon.push(task);
   }
   localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Deletes task from the local storage when trash button is clicked by user
function deleteTasks(task, day) {
   let tasks;
   if (localStorage.getItem("tasks") === null) {
      tasks = {
         mon: [],
         tues: [],
         wed: [],
         thur: [],
         fri: [],
         sat: [],
         sun: [],
      };
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }

   const taskText = task.children[0].innerText;
   // splice method removes 1 element from the index specified in the first element
   tasks[day].splice(tasks[day].indexOf(taskText), 1);
   localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Removes all current tasks on the weekly task list and resets the local storage to default
function clearTasks() {
   const currentTasks = document.querySelectorAll(".task");
   console.log(currentTasks);
   currentTasks.forEach(function (task) {
      task.classList.add("removed");
   });

   localStorage.clear();
   localStorage.setItem(
      "tasks",
      JSON.stringify({
         mon: [],
         tues: [],
         wed: [],
         thur: [],
         fri: [],
         sat: [],
         sun: [],
      })
   );
}
