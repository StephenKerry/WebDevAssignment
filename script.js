const updateDateTime = () => {
    let currentDate = new Date();
    let day = currentDate.toLocaleDateString('en-UK', { weekday: 'long' });
    let time = currentDate.toLocaleTimeString();
    let date = currentDate.toLocaleDateString('en-UK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); //https://www.quora.com/How-can-I-display-the-current-date-in-an-HTML-form helped me with this part of my code

    document.querySelector('#day').innerHTML = `Day: ${day}`;
    document.querySelector('#time').innerHTML = `Time: ${time}`;
    document.querySelector('#date').innerHTML = `Date: ${date}`;
}

updateDateTime();

setInterval(updateDateTime, 1000);

const tasks = [];

const timerEvent = document.querySelector("#listul");
const taskFinished = document.querySelector("#done");
const inputForm = document.querySelector("#additem");
const taskInput = inputForm.elements.newitem;

const appendNewTask = (task) => {
    let newEventTask = document.createElement("button");
    newEventTask.textContent = task.name;
    newEventTask.classList.add("task-btn");
    newEventTask.dataset.task = task.name;
    timerEvent.append(newEventTask);
};

const pushNewTask = (evt) => {
    evt.preventDefault();

    const newTask = taskInput.value.trim();
    if (newTask) {
        startTimer(); // this wil Start the timer when a task is added

        const task = { name: newTask, startTime: new Date() };
        tasks.push(task);
        appendNewTask(task);
    }

    taskInput.value = "";
    taskInput.focus();
};

timerEvent.addEventListener("click", (evt) => {
    if (evt.target.matches(".task-btn")) {
        const taskName = evt.target.textContent;
        completeTask(taskName);
    }
});

inputForm.addEventListener("submit", pushNewTask);

let timerAmount;
let timerRunning = false;
let timerValue = 0;

const startTimer = () => {
    if (!timerRunning) {
        timerAmount = setInterval(changeTimer, 1000);
        timerRunning = true;
    }
};

const stopTimer = () => {
    clearInterval(timerAmount);
    timerRunning = false;
};

const resetTimer = () => {
    clearInterval(timerAmount); 
    timerRunning = false;
    timerValue = 0;
    document.querySelector('.Timer').textContent = '00:00:00';
};

const changeTimer = () => {
    timerValue++;
    const hours = Math.floor(timerValue / 3600);
    const minutes = Math.floor((timerValue % 3600) / 60);
    const seconds = timerValue % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.querySelector('.Timer').textContent = formattedTime;
};

const completeTask = (taskName) => {
    const task = tasks.find(t => t.name === taskName);
    if (task) {
        const taskButton = document.querySelector(`.task-btn[data-task="${taskName}"]`);
        if (taskButton) {
            taskButton.remove();
        }

        const currentTime = new Date();
        const timeTaken = Math.floor((currentTime - task.startTime) / 1000);
        const hours = Math.floor(timeTaken / 3600);
        const minutes = Math.floor((timeTaken % 3600) / 60);
        const seconds = timeTaken % 60;
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        const completedTaskInfo = document.createElement("p");
        completedTaskInfo.textContent = `${taskName} - Time taken: ${formattedTime}`;
        completedTaskInfo.classList.add("completed-task");
        taskFinished.appendChild(completedTaskInfo);

        resetTimer(); 
    }
}; //I Used chat gpt to hrelp with some of this code as i was told in class to try and make the timer tie in with the tasks more, i have tried to understand every line of code