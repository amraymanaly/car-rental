const loginForm = document.forms['login'];
const registerForm = document.forms['register'];
const info = document.querySelector('#info');
const registerBtn = document.getElementById('#register');

async function tellServer(action, form) {
    let data = new FormData(form);
    let f = {};
    for (let a of data.keys())
        f[a] = form[a].value;

    let d = await fetch(`/${action}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(f)
    });

    return d.json();
}

async function tryLogin() {
    let resp = await tellServer('login', loginForm);
    if (resp.enter) // user may proceed
        location.href = resp.admin ? '/adminPortal' : '/customerHome';
    else info.innerHTML = resp.msg;
}

async function tryRegister() {
    let resp = await tellServer('register', registerForm);
    // console.log('got:', resp);
    if (resp.enter)
        location.href = '/customerHome';
    else {
        info.innerHTML = resp.msg;
        document.getElementById('closeRegistration').click();
    }
}
