const currentUserData = localStorage.getItem('tm_currentUser');
if (!currentUserData) {
    window.location.href = 'index.html';
}

let currentUser = JSON.parse(currentUserData);
const todoList = document.querySelector('.content-to-do-main'); 

const nick = document.querySelector('.user__profile-nick');
const email = document.querySelector('.user__profile-email');
const mainTitle = document.querySelector('.content-main-title');
const headerName = document.getElementById('headerUsername');

if (nick) nick.textContent = currentUser.name;
if (email) email.textContent = currentUser.email;
if (mainTitle) mainTitle.textContent = `Welcome back, ${currentUser.name}`;
if (headerName) headerName.textContent = currentUser.name;


const taskInput = document.getElementById('newTaskInput');
const descInput = document.getElementById('newTaskDesc');
const priorityInput = document.getElementById('newTaskPriority');
const addBtn = document.getElementById('addTaskBtn');

if (addBtn) addBtn.addEventListener('click', addTask);

function addTask() {
    const text = taskInput.value.trim();
    const desc = descInput.value.trim();
    const priority = priorityInput.value;

    if (text === '') {
        alert("Please write a task name!");
        return;
    }

    const today = new Date().toLocaleDateString('en-GB');

    const newTask = {
        title: text,
        description: desc || 'No description added', 
        priority: priority, 
        status: 'In Progress',
        date: today
    };

    if (!currentUser.tasks) currentUser.tasks = [];
    
    currentUser.tasks.unshift(newTask);

    saveToDatabase();
    renderTasks();
    
    taskInput.value = '';
    descInput.value = '';
    priorityInput.value = 'Normal';
}

function renderTasks() {
    todoList.innerHTML = '';
    
    const tasks = currentUser.tasks || [];

    if (tasks.length === 0) {
        todoList.innerHTML = '<p style="text-align:center; color: #aaa; margin-top: 20px;">No tasks yet.</p>';
        return;
    }

    tasks.forEach((task, index) => {
        const maintask = document.createElement('li');
        maintask.classList.add('content-to-do-item', 'task');
        
        const priorityClass = 'priority-' + task.priority.toLowerCase(); 

        maintask.innerHTML = `
            <div class="content-to-do-item-wrapper" style="flex-grow: 1;">
                <h3 class="content-to-do-item-title task-title">${task.title}</h3>
                <p class="content-do-item-desc task-desc">${task.description}</p>
                <div class="content-to-do-item-info">
                    <span class="content-to-do-item-priority task-priority ${priorityClass}">${task.priority}</span>
                    <span class="content-to-do-item-status task-status">${task.status}</span>
                    <span class="content-to-do-item-date task-date">${task.date}</span>
                </div>
            </div>
            <button class="delete-btn" aria-label="Delete task">×</button>
        `;
        
        const deleteBtn = maintask.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(index));
        
        todoList.append(maintask);
    });
}

function deleteTask(index) {
    if(confirm('Are you sure you want to delete this task?')) {
        currentUser.tasks.splice(index, 1);
        saveToDatabase();
        renderTasks();
    }
}

function saveToDatabase() {
    localStorage.setItem('tm_currentUser', JSON.stringify(currentUser));
    const allUsers = JSON.parse(localStorage.getItem('tm_users')) || [];
    const userIndex = allUsers.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        allUsers[userIndex] = currentUser;
        localStorage.setItem('tm_users', JSON.stringify(allUsers));
    }
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('tm_currentUser');
        window.location.href = 'index.html';
    });
}

renderTasks();