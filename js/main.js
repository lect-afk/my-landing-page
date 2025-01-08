document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});

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

function typeEffect(element, textArray, delay) {
    let index = 0;
    let textIndex = 0;
    function type() {
        if (textIndex < textArray.length) {
            if (index < textArray[textIndex].length) {
                element.innerHTML += textArray[textIndex].charAt(index);
                index++;
                setTimeout(type, delay);
            } else {
                setTimeout(() => {
                    backspace();
                }, 2000); // Pause before backspacing
            }
        } else {
            textIndex = 0; // Reset to loop through textArray
            setTimeout(type, 2000); // Pause before starting again
        }
    }
    function backspace() {
        if (index > 0) {
            element.innerHTML = element.innerHTML.slice(0, -1);
            index--;
            setTimeout(backspace, delay);
        } else {
            index = 0;
            textIndex++;
            setTimeout(type, delay);
        }
    }
    type();
}

const typingElement = document.getElementById('typing-animation');
const texts = ['Frontend', 'Backend', 'Fullstack'];
const typingDelay = 30;
typeEffect(typingElement, texts, typingDelay);
