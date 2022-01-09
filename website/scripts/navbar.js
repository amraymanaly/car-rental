const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
    await fetch(`${route}`, {
        method: 'POST',
        credentials: 'same-origin'
    });
    location.href = '/';
});
