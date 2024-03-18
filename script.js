const updateDateTime = () => { 
    let currentDate = new Date(); 
    let day = currentDate.toLocaleDateString('en-UK', {weekday: 'long'});
    let time = currentDate.toLocaleTimeString();
    let date = currentDate.toLocaleDateString('en-UK', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});

    document.getElementById('day').innerHTML = 'Day: ' + day; 
    document.getElementById('time').innerHTML = 'Time: ' + time; 
    document.getElementById('date').innerHTML = 'Date: ' + date;
}

updateDateTime(); 

setInterval(updateDateTime, 1000);


const tasks = ["5km run", "time a lap", "oven timer"] 

const timerEvent = document.querySelector("#listul") 
const inputForm =  document.querySelector("#additem") 
const taskInput =  inputForm.elements.newitem
const taskFinished = document.querySelector("#done") 

const appendNewTask = (task) => { 
    let newEventTask = document.createElement("button");
    newEventTask.textContent = task.charAt(0).toUpperCase() + task.slice(1); 
    newEventTask.classList.add("task-btn");
    timerEvent.append(newEventTask);
}

const pushnewTask = (evt) => { 
    evt.preventDefault();

    const newTask = taskInput.value.trim(); 
    if (newTask) {
        tasks.push(newTask.charAt(0).toUpperCase() + newTask.slice(1)); 
        appendNewTask(newTask); 
    }

    taskInput.value = "";
    taskInput.focus();
} 


tasks.forEach((currenttask) => { 
    appendNewTask(currenttask);
}) 

timerEvent.addEventListener("click", (evt) => { 
    if (evt.target.matches(".task-btn")){ 
        const thisTask = evt.target;
        timerEvent.removeChild(thisTask);
        taskFinished.innerHTML += `${thisTask.textContent}<br>`;
        taskFinished.classList.add("itemdone");
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


document.getElementById('startBtn').addEventListener('click', startTimer);


document.getElementById('pauseBtn').addEventListener('click', pauseTimer);


document.getElementById('resetBtn').addEventListener('click', resetTimer);