let cursorSquare = document.createElement('div');
cursorSquare.className = 'cursor-square';
document.body.appendChild(cursorSquare);

let cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
let squareX = 0, squareY = 0;

function animate() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;

    squareX += (dotX - squareX) * 0.1;
    squareY += (dotY - squareY) * 0.1;

    cursorDot.style.left = (dotX - 0) + 'px';
    cursorDot.style.top = (dotY - 0) + 'px';

    cursorSquare.style.left = (squareX - 0) + 'px';
    cursorSquare.style.top = (squareY - 0) + 'px';

    requestAnimationFrame(animate);
}

animate();

document.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

function addHoverEffect() {
    document.querySelectorAll('a, button, .clickable').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorSquare.style.transform = 'rotate(150deg) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorSquare.style.transform = 'none';
        });
    });
}

addHoverEffect();

function addDotHoverEffect() {
    document.querySelectorAll('a, button, .clickable').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.width = '20px';
            cursorDot.style.height = '20px';
            cursorDot.style.marginLeft = '-10px';
            cursorDot.style.marginTop = '-10px';
            cursorDot.style.backgroundColor = 'transparent';
            cursorDot.style.border = '2px solid #f4f3ee';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.width = '10px';
            cursorDot.style.height = '10px';
            cursorDot.style.marginLeft = '-5px';
            cursorDot.style.marginTop = '-5px';
            cursorDot.style.backgroundColor = '#f4f3ee';
            cursorDot.style.border = 'none';
        });
    });
}

addDotHoverEffect();

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Prevent default anchor click behavior
        e.preventDefault();

        // Remove 'active' class from all links
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });

        // Add 'active' class to the clicked link
        this.classList.add('active');

        // Smooth scroll to the target section
        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetElement = document.querySelector(targetId); // Find the target element

        // Define the offset (e.g., 100 pixels)
        const offset = 100; // Adjust this value as needed
        const elementPosition = targetElement.getBoundingClientRect().top; // Get the element's position relative to the viewport
        const offsetPosition = elementPosition + window.scrollY - offset; // Calculate the position to scroll to

        // Scroll to the target element smoothly
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Change active link based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100; // Adjust for offset

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card, .project-card a').forEach((card, index) => {
        card.addEventListener('click', function() {
            const modal = document.getElementById(`modal-${index + 1}`);
            modal.style.visibility = 'visible'; // Set visibility to visible when opening
            modal.style.opacity = '1'; // Set opacity to 1 when opening
            document.body.classList.add('modal-open'); // Disable body scrolling
        });
    });

    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = closeBtn.closest('.modal');
            modal.style.visibility = 'hidden'; // Set visibility to hidden when closing
            modal.style.opacity = '0'; // Set opacity to 0 when closing
            document.body.classList.remove('modal-open'); // Enable body scrolling
        });
    });

    // Close modal when clicking outside of modal content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.visibility = 'hidden'; // Set visibility to hidden when closing
                modal.style.opacity = '0'; // Set opacity to 0 when closing
                document.body.classList.remove('modal-open'); // Enable body scrolling
            }
        });
    });
});
