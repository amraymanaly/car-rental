const carAddForm = document.forms['addCar'];

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
    console.log('ay 7aga');
    let resp = await postserver('addCar', carAddForm);
    console.log('got:', resp);
}