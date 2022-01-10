const images = document.getElementsByTagName('img');
const close = document.getElementById('closeRes');
const reserveInput = document.forms['resForm'];

for(let img of images)
img.addEventListener('click', (evt)=>{
    clicked = evt.target.parentElement;
});
function reserve() {
    console.log('in here');
    fetch('/reserve', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({plateId: clicked.dataset['plateId'],
        startDate: reserveInput['resStart'].value,
        endDate: reserveInput['resRet'].value})
    });
    close.click();
    //$('#btnCloseDeleteReservation').click();
}