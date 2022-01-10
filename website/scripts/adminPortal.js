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
    
    $('#btnCloseCreateCar').click();
}

for (let table of document.getElementsByTagName('table'))
    table.addEventListener('click', (evt) => {
        clicked = evt.target.parentElement;
    });

function deleteCar() {
    fetch('/deleteCar', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: clicked.getElementsByClassName('plateId')[0].textContent})
    });

    $('#btnCloseDeleteCar').click();
}

function deleteReservation() {
    console.log('in here');
    fetch('/deleteReservation', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: clicked.getElementsByClassName('reservationId')[0].textContent})
    });

    $('#btnCloseDeleteReservation').click();
}

function updateStatus() {
    fetch('/updateCarStatus', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: clicked.getElementsByClassName('plateId')[0].textContent,
        status: document.forms['what']['car_update'].value})
    });

    $('#btnCloseDeleteCar').click();
}

function report() {
    let ff = document.forms['resForm'];
    let start = new Date(ff['resStart'].value);
    let end = new Date(ff['resRet'].value);

    $('#resTable tr').filter(function() {
        let s = new Date($($('.startDate', this)[0]).text());
        let e = new Date($($('.endDate', this)[0]).text());
        $(this).toggle(s >= start && e <= end);
    });

    $('#closeRes').click();
}
