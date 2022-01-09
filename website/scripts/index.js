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

    const response = await resp.json();
    console.log('response:', response);
    if (response.enter) { // user may proceed
        location.href = response.admin ? '/adminPortal' : '/store';
    } else
        info.innerHTML = response.msg;
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
