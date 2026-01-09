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

const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (!currentUser.tasks) return;

        const filteredTasks = currentUser.tasks.filter(task => {
            return task.title.toLowerCase().includes(query) || 
                   task.description.toLowerCase().includes(query);
        });

        renderTasks(filteredTasks);
    });
}

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
    if (searchInput) searchInput.value = '';
    
    renderTasks();
    
    taskInput.value = '';
    descInput.value = '';
    priorityInput.value = 'Normal';
}

function renderTasks(tasksToRender = currentUser.tasks) {
    todoList.innerHTML = '';
    
    const tasks = tasksToRender || [];

    if (tasks.length === 0) {
        const isEmptySearch = searchInput && searchInput.value.length > 0;
        const msg = isEmptySearch ? "Nothing found..." : "No tasks yet.";
        
        todoList.innerHTML = `<p style="text-align:center; color: #aaa; margin-top: 20px;">${msg}</p>`;
        return;
    }

    tasks.forEach((task) => {
        const realIndex = currentUser.tasks.indexOf(task);

        const maintask = document.createElement('li');
        maintask.classList.add('content-to-do-item', 'task');
        
        let statusClass = '';
        if (task.status === 'Done') {
            maintask.classList.add('task-completed');
            statusClass = 'status-done';
        }

        const priorityClass = 'priority-' + task.priority.toLowerCase(); 

        maintask.innerHTML = `
            <div class="content-to-do-item-wrapper" style="flex-grow: 1;">
                <h3 class="content-to-do-item-title task-title">${task.title}</h3>
                <p class="content-do-item-desc task-desc">${task.description}</p>
                <div class="content-to-do-item-info">
                    <span class="content-to-do-item-priority task-priority ${priorityClass}">${task.priority}</span>
                    <span class="content-to-do-item-status task-status ${statusClass}" title="Click to toggle status">${task.status}</span>
                    <span class="content-to-do-item-date task-date">${task.date}</span>
                </div>
            </div>
            <button class="delete-btn" aria-label="Delete task">×</button>
        `;
        
        const statusBtn = maintask.querySelector('.task-status');
        statusBtn.addEventListener('click', () => {
            toggleTaskStatus(realIndex);
        });

        const deleteBtn = maintask.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(realIndex));
        
        todoList.append(maintask);
    });
}

function toggleTaskStatus(index) {
    const currentStatus = currentUser.tasks[index].status;
    if (currentStatus === 'In Progress') {
        currentUser.tasks[index].status = 'Done';
    } else {
        currentUser.tasks[index].status = 'In Progress';
    }
    saveToDatabase();
    
    if (searchInput && searchInput.value) {
        searchInput.dispatchEvent(new Event('input'));
    } else {
        renderTasks();
    }
}

function deleteTask(index) {
    if(confirm('Are you sure you want to delete this task?')) {
        currentUser.tasks.splice(index, 1);
        saveToDatabase();
        
        if (searchInput && searchInput.value) {
            searchInput.dispatchEvent(new Event('input'));
        } else {
            renderTasks();
        }
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

const navTasks = document.getElementById('navTasks');
const navSettings = document.getElementById('navSettings');
const sectionTasks = document.querySelector('.content-to-do');
const sectionSettings = document.querySelector('.content-settings');

navTasks.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('tasks');
});

navSettings.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('settingsName').value = currentUser.name;
    document.getElementById('settingsPass').value = ''; 
    switchTab('settings');
});

function switchTab(tab) {
    if (tab === 'tasks') {
        sectionTasks.classList.remove('hidden');
        sectionSettings.classList.add('hidden');
        navTasks.classList.add('active');
        navSettings.classList.remove('active');
        mainTitle.textContent = `Welcome back, ${currentUser.name}`;
    } else {
        sectionTasks.classList.add('hidden');
        sectionSettings.classList.remove('hidden');
        navTasks.classList.remove('active');
        navSettings.classList.add('active');
        mainTitle.textContent = 'Account Settings';
    }
}

const saveSettingsBtn = document.getElementById('saveSettingsBtn');
saveSettingsBtn.addEventListener('click', () => {
    const newName = document.getElementById('settingsName').value.trim();
    const newPass = document.getElementById('settingsPass').value.trim();

    if (newName === '') {
        alert("Name cannot be empty!");
        return;
    }

    currentUser.name = newName;
    
    if (newPass.length > 0) {
        if (newPass.length < 3) {
            alert("Password is too short!");
            return;
        }
        currentUser.password = newPass;
    }

    saveToDatabase();
    
    if (nick) nick.textContent = currentUser.name;
    if (headerName) headerName.textContent = currentUser.name;
    
    alert("Settings saved successfully!");
});

const deleteAccountBtn = document.getElementById('deleteAccountBtn');
deleteAccountBtn.addEventListener('click', () => {
    const confirmation = prompt("To confirm deletion, type 'DELETE'");
    
    if (confirmation === 'DELETE') {
        const allUsers = JSON.parse(localStorage.getItem('tm_users')) || [];
        const newUsersList = allUsers.filter(u => u.email !== currentUser.email);
        localStorage.setItem('tm_users', JSON.stringify(newUsersList));

        localStorage.removeItem('tm_currentUser');
        
        alert("Your account has been deleted.");
        window.location.href = 'index.html';
    }
});