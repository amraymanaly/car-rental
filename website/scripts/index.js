const form = document.forms['auth'];
const info = document.querySelector('#info');

async function enter(action) {
    if (!validate()) return;

    let resp = await fetch('/welcome', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form['email'].value,
            password: form['password'].value,
            name: form['name'].value,
            action
        })
    });

    info.innerHTML = (await resp.json()).resp;
}

function login() {
    enter('login');
}

function register() {
    enter('register');
}

function validate() {
    let email = form['email'].value;
    let pass = form['password'].value;

    if (!/^[0-9a-zA-Z_]+@[0-9a-zA-Z_]+\.[0-9a-zA-Z_]+/.test(email)) {
        alert('email is not valid!');
        return false;
    }
    
    if (!/^.+/.test(pass)) {
        alert('password is empty!');
        return false;
    }

    return true;
}

document.querySelector('#login').addEventListener('click', login);
document.querySelector('#register').addEventListener('click', register);
