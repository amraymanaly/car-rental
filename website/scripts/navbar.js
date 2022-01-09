const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', async () => {
    await fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin'
    });
    location.href = '/';
});
