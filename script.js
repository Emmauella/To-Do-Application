let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

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

  if (!text) {
    alert("Please enter a task!");
    return;
  }

  // Prevent duplicates
  const exists = tasks.some(task => task.text.toLowerCase() === text.toLowerCase());
  if (exists) {
    alert("Task already exists!");
    return;
  }

  tasks.push({ text, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// Load tasks on start
renderTasks();