export const register = {
    title: 'Get started',
    description: 'Create your account to start organizing',
    inputs: [
        {labelClass: 'label',labelFor: 'username', labelText: 'Full Name', input_type: 'text', input_class:'name', placeholder: 'John Smith'},
        {labelClass: 'label',labelFor: 'email', labelText: 'Email', input_type: 'email', input_class:'email', placeholder: 'you@example.com'},
        {labelClass: 'label',labelFor: 'password', labelText: 'Password', input_type: 'password', input_class:'password', placeholder: '.........'},
        {labelClass: 'label',labelFor: 'confirm-password', labelText: 'Confirm password', input_type: 'password', input_class:'confirm', placeholder: '.........'}
    ],
    button: {type: 'submit', text:'Create account'}
}

export const signIn = {
    title: 'Welcome back',
    description: 'Sign in to your account to continue',
    inputs: [
        {labelClass: 'label', labelFor: 'email', labelText: 'Email', input_type: 'email', input_class: 'email', placeholder: 'you@example.com'},
        {labelClass: 'label', labelFor: 'password', labelText: 'Password', input_type: 'password', input_class: 'password', placeholder: '.........'}
    ]
}