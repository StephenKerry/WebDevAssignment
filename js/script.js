document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Add an event listener to the "Read More" button
        const readMoreButton = document.getElementById('btn1');
        const moreText = document.getElementById('more1');
    
        readMoreButton.addEventListener('click', function() {
            moreText.classList.toggle('hidden');
        });
    
        // Your existing functions for other pages can go here
    });

    // Your existing functions for other pages can go here
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0);

    const tasks = [
        { name: "5km run(event started at 9am)", startTime: new Date().setHours(9, 0, 0, 0) },
        { name: "time a lap", startTime: new Date().setHours(10, 0, 0, 0) },
        { name: "oven timer", startTime: new Date().setHours(12, 0, 0, 0) }
    ];

    const timerEvent = document.querySelector("#listul");
    const taskFinished = document.querySelector("#done");
    const inputForm = document.querySelector("#additem");
    const taskInput = inputForm.elements.newitem;

    const appendNewTask = (task) => {
        let newEventTask = document.createElement("button");
        newEventTask.textContent = task.name;
        newEventTask.classList.add("task-btn");
        timerEvent.append(newEventTask);
    };

    const pushnewTask = (evt) => {
        evt.preventDefault();

        const newTask = taskInput.value.trim();
        if (newTask) {
            // Create a new task object with the name and current time as the start time
            const task = { name: newTask, startTime: new Date() };
            tasks.push(task); // Add the new task to the tasks array
            appendNewTask(task); // Append the new task button to the UI
        }

        taskInput.value = ""; // Clear the input field
        taskInput.focus(); // Focus back on the input field
    };

    tasks.forEach((currentTask) => {
        appendNewTask(currentTask);
    });

    timerEvent.addEventListener("click", (evt) => {
        if (evt.target.matches(".task-btn")) {
            const taskName = evt.target.textContent;
            const task = tasks.find(t => t.name === taskName);
            if (task) {
                task.startTime = new Date();

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
            }
        }
    });

    inputForm.addEventListener("submit", pushnewTask);

    let timerAmount;
    let timerRunning = false;
    let timerValue = 0;

    const startTimer = () => {
        if (!timerRunning) {
            timerAmount = setInterval(ChangeTimer, 1000);
            timerRunning = true;
        }
    };

    const ChangeTimer = () => {
        timerValue++;
        const hours = Math.floor(timerValue / 3600);
        const minutes = Math.floor((timerValue % 3600) / 60);
        const seconds = timerValue % 60;
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.querySelector('.Timer').textContent = formattedTime;
    };

    const pauseTimer = () => {
        clearInterval(timerAmount);
        timerRunning = false;
    };

    const resetTimer = () => {
        clearInterval(timerAmount);
        timerRunning = false;
        timerValue = 0;
        document.querySelector('.Timer').textContent = '00:00:00';
    };

    document.querySelector('#startBtn').addEventListener('click', startTimer);
    document.querySelector('#pauseBtn').addEventListener('click', pauseTimer);
    document.querySelector('#resetBtn').addEventListener('click', resetTimer);
});