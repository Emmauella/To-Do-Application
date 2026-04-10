let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


const input = document.getElementById("taskInput");
const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const message = document.getElementById("message");

let deleteIndex = null;
let deleteAllPending = false;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

input.addEventListener('input', () => {
  if (input.value.trim() === '') {
    message.textContent = '';
  }
});

deleteAllBtn.addEventListener("click", deleteAllTasks);

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.checked = task.done;
    doneCheckbox.onchange = () => toggleDone(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(doneCheckbox);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    if (task.done) li.classList.add("done");

    list.appendChild(li);
  });
}

function addTask() {
  const text = input.value.trim();

  message.textContent = ""; // Clear previous message

  if (!text) {
    message.textContent = "Please enter a task!";
    return;
  }

  // Prevent duplicates
  const exists = tasks.some(task => task.text.toLowerCase() === text.toLowerCase());
  if (exists) {
    message.textContent = "Task already exists!";
    return;
  }

  tasks.push({ text, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  deleteIndex = index;
  message.innerHTML = "Are you sure you want to delete this task? <button id='confirmYes'>Yes</button> <button id='confirmNo'>No</button>";
  document.getElementById('confirmYes').addEventListener('click', () => {
    if (deleteIndex !== null) {
      tasks.splice(deleteIndex, 1);
      saveTasks();
      renderTasks();
      message.textContent = "";
      deleteIndex = null;
    }
  });
  document.getElementById('confirmNo').addEventListener('click', () => {
    message.textContent = "";
    deleteIndex = null;
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteAllTasks() {
  deleteAllPending = true;
  message.innerHTML = "Are you sure you want to delete all tasks? <button id='confirmYesAll'>Yes</button> <button id='confirmNoAll'>No</button>";
  document.getElementById('confirmYesAll').addEventListener('click', () => {
    if (deleteAllPending) {
      tasks = [];
      saveTasks();
      renderTasks();
      message.textContent = "";
      deleteAllPending = false;
    }
  });
  document.getElementById('confirmNoAll').addEventListener('click', () => {
    message.textContent = "";
    deleteAllPending = false;
  });
}

// Load tasks on start
renderTasks();