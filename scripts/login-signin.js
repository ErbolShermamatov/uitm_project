import { renderRegisterForm, renderSignInForm } from "./index.js";
export const registerSignInFormObj = document.querySelector('.form');

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');

    if(mode === 'register') {
        renderRegisterForm();
        registerSignInFormObj.addEventListener('submit', registerNewUser)
    } else {
        renderSignInForm();
        registerSignInFormObj.addEventListener('submit', signInUser);
    }
})

function registerNewUser(event) {
    event.preventDefault();

    const nameValue = document.getElementById('username').value;
    const emailValue = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;
    const confirmValue = document.getElementById('confirm-password').value;

    if(passwordValue != confirmValue) {
        alert('Passwords don\'t match!')
        return;
    }
    if(passwordValue.length < 3) {
        alert('Password is too short!')
        return;
    }

    const users = JSON.parse(localStorage.getItem('tm_users')) || [];
    const userExists = users.find(u => u.email === emailValue);

    if(userExists) {
        alert('This user already exists!')
        return;
    }

    const newUser = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        tasks: [
        ],
    }
    users.push(newUser);
    localStorage.setItem('tm_users', JSON.stringify(users));

    localStorage.setItem('tm_currentUser', JSON.stringify(newUser));
    window.location.href = 'dashboard.html'
}

function signInUser(event) {
    event.preventDefault();
    const emailValue = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('tm_users')) || [];
    const foundUser = users.find(u => u.email === emailValue && u.password === passwordValue);

    if(foundUser) {
        localStorage.setItem('tm_currentUser', JSON.stringify(foundUser));
        window.location.href = 'dashboard.html'
    } else {
        alert('Invalid email or password or such a user was not registered');
    }
}