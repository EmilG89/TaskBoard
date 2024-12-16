//localStorage.clear();
// Import elements that will be used and populated
const background = document.getElementById('backgroud');
const taskBoard = document.getElementById('taskBoard');
const newTask = document.getElementById('newTask');
const createTaskModal = document.getElementById('createTaskModal');
const newTaskForm = document.getElementById('newTaskForm');
const addTaskButton = document.getElementById('addTask');
const cancelButton = document.getElementById('cancel');
const headerInput = document.getElementById('headerInput');
const descriptionInput = document.getElementById('descriptionInput');
const message = document.getElementById('message');

// Fetch tasks from browsers local storage
const tasks = JSON.parse(localStorage.getItem('tasks'));

// If there were tasks in local storage, each task will be added to
// browser window one by one.
if (tasks) {
    tasks.forEach(task => addTask(task));
}

// Listen if newTask div is cliecked. When clicked container for creating new task
// will appear
newTask.addEventListener('click', (event) => {
    event.preventDefault();
    createTaskModal.style.display = 'block';
    newTaskForm.style.display = 'block';
});

// Listen if cancel button is clicked inside modal container
cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    createTaskModal.style.display = 'none';
    newTaskForm.style.display = 'none';
    message.innerHTML = '';
});

// Listen if add data is clicked
addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    message.innerHTML = '';
    // Create directory taht holds required field objects with properties
    let requiredFields = {
        header: {
            value: headerInput.value,
            length: 4
        },
        description: {
            value: descriptionInput.value,
            length: 12
        }
    };
    // Loop through required input fields and check if input is valid
    for (let key in requiredFields) {
        if (requiredFields[key].value.length < requiredFields[key].length) {
            message.innerHTML = key + ` must have at least ${requiredFields[key].length} symbols!`;
            return;
        }
    }
    createTaskModal.style.display = 'none';
    newTaskForm.style.display = 'none';
    addTask();
});

// function for adding task from user input and from local storage
function addTask(task) {
    // collor palette for tak backgrouds
    const colorPalette = ['#E2DAF1', '#EFD6E8', '#F6D5DC', '#F7D6D0', '#F1D9C8', '#E6DDC5', '#D8E1C9'];
    
    // Add data from user input or localstorage to variables
    let taskHeader = headerInput.value;
    let taskDescription = descriptionInput.value;
    let taskColor = colorPalette[Math.floor(Math.random()*(colorPalette.length+1))];

    if (task) {
        taskHeader = task.header;
        taskDescription = task.description;
        taskColor = task.color;
    }

    // Create task data elements
    const taskDiv = document.createElement('div');
    const taskTitle = document.createElement('h4');
    const taskText = document.createElement('p');
    const completeMark = document.createElement('button');

    // Add data and identifiers for task data element
    taskDiv.classList.add('task');
    taskDiv.style.backgroundColor = taskColor;
    taskTitle.innerText = taskHeader;
    taskTitle.style.backgroundColor = taskColor;
    taskTitle.classList.add('taskHeader');
    taskText.innerText = taskDescription;
    taskText.classList.add('taskDescription');
    completeMark.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';

    // Add action to task child element that removes task and updates local storage
    completeMark.onclick = () => {
        taskDiv.remove();
        updateLocalStorage();
    };

    // Place all task container elements inside task container
    taskDiv.append(taskTitle);
    taskDiv.append(taskText);
    taskDiv.append(completeMark);

    // Add created task to task board grid element before last task element
    taskBoard.insertBefore(taskDiv, taskBoard.children[taskBoard.children.length-1]);

    // Clear out input fields
    headerInput.value = '';
    descriptionInput.value = '';

    // Update local storage 
    updateLocalStorage();
}


// function for updating local storage
function updateLocalStorage() {
    // Find elements containing task relevant data
    const taskElements = document.querySelectorAll('.taskHeader, .taskDescription');
    const taskArray = [];

    // Lopp through pair of task child elements that hold header, header description 
    // and color in which task contaoner should be colored
    for (let i = 0; i < taskElements.length; i+=2) {
        taskArray.push({
            color: taskElements[i].style.backgroundColor,
            header: taskElements[i].innerText,
            description: taskElements[i+1].innerText,
        });
    }
    // Add task data to local storage under one key: tasks
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}
