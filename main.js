document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});
