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
            password: form['password'].value,
            userId: form['username'].value,
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
    if (!/^.+/.test(form['password'].value)) {
        alert('password is empty!');
        return false;
    }

    return true;
}

document.querySelector('#login').addEventListener('click', login);
document.querySelector('#register').addEventListener('click', register);
