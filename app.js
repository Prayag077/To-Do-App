let tasks = [];

const addTask = () => {
    const taskInput = document.querySelector('#taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear input
        updateTaskList();
    }
};

const updateTaskList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <i class="fa-solid fa-pen-to-square" onclick="editTask(${index})"></i>
                    <i class="fa-solid fa-trash-can" onclick="deleteTask(${index})"></i>
                </div>
            </div>
        `;

        // Toggle complete on checkbox change
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));

        taskList.append(listItem);
    });

    updateStats();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    confetti({
    particleCount: 150,
    angle: 90,
    spread: 100,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.5 }
});
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTaskList();
    }
};

const updateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    const numbers = document.getElementById("numbers");
    numbers.textContent = `${completed}/${total}`;

    const progress = document.getElementById("progress");
    const percent = total === 0 ? 0 : (completed / total) * 100;
    progress.style.width = `${percent}%`;
};

document.getElementById('newTask').addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});
