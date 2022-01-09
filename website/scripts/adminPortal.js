const carAddForm = document.forms['addCar'];
let clicked;

async function postserver(action, form) {

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
async function ay() {
    let resp = await postserver('addCar', carAddForm);
    if (resp.success)
        console.log('Car added'); // TODO: inform user
    else
        console.log('Failed to add car:', resp.msg);
}

document.getElementById('tbbb').addEventListener('click', (evt) => {
    clicked = evt.target;
});
