import { register, signIn } from "./ui.js"

export const renderSignInForm = () => {
    const form = document.querySelector('.form'); 
    if (!form) return;

    form.innerHTML = '';
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('fields');
    const legend = document.createElement('legend');
    legend.classList.add('title');
    legend.textContent = signIn.title;
    const p = document.createElement('p');
    p.classList.add('desc');
    p.textContent = signIn.description;
    fieldset.append(legend);
    fieldset.append(p);
    signIn.inputs.forEach(elem => {
        const {labelClass, labelFor, labelText, input_type, input_class, placeholder} = elem;
        const labelElem = document.createElement('label');
        labelElem.setAttribute('for', labelFor);
        labelElem.classList.add(labelClass);
        labelElem.textContent = labelText;
        fieldset.append(labelElem);

        const input = document.createElement('input');
        input.setAttribute('type', input_type);
        input.setAttribute('id', labelFor);
        input.setAttribute('name', labelFor);
        input.classList.add('input', input_class);
        input.setAttribute('placeholder', placeholder);
        fieldset.append(input);
    })
    const registerBtn = document.createElement('button');
    registerBtn.setAttribute('type', 'submit');
    registerBtn.classList.add('btn', 'block-btn', 'signin');
    registerBtn.textContent = 'Sign in';
    fieldset.append(registerBtn);
    
    form.append(fieldset);
}

export const renderRegisterForm = () => {
    const form = document.querySelector('.form');
    if (!form) return;

    form.innerHTML = '';
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('fields');
    const legend = document.createElement('legend');
    legend.classList.add('title');
    legend.textContent = register.title;
    const p = document.createElement('p');
    p.classList.add('desc');
    p.textContent = register.description;
    fieldset.append(legend);
    fieldset.append(p);
    register.inputs.forEach(elem => {
        const {labelClass, labelFor, labelText, input_type, input_class, placeholder} = elem;
        const labelElem = document.createElement('label');
        labelElem.setAttribute('for', labelFor);
        labelElem.classList.add(labelClass);
        labelElem.textContent = labelText;
        fieldset.append(labelElem);

        const input = document.createElement('input');
        input.setAttribute('type', input_type);
        input.setAttribute('id', labelFor);
        input.setAttribute('name', labelFor);
        input.classList.add('input', input_class);
        input.setAttribute('placeholder', placeholder);
        fieldset.append(input);
    })
    const signinBtn = document.createElement('button');
    signinBtn.setAttribute('type', 'submit');
    signinBtn.classList.add('btn', 'block-btn', 'register');
    signinBtn.textContent = 'Create an account';
    fieldset.append(signinBtn);
    
    form.append(fieldset);
}