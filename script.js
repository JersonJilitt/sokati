// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 800);
}

// Interactive heart button
const heartButton = document.getElementById('heartButton');
const hiddenMessage = document.getElementById('hiddenMessage');
const messageBox = document.getElementById('messageBox');

heartButton.addEventListener('click', () => {
    hiddenMessage.classList.toggle('show');
    
    if (hiddenMessage.classList.contains('show')) {
        messageBox.querySelector('p:first-child').style.display = 'none';
        
        // Create burst of hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createBurstHeart();
            }, i * 50);
        }
    } else {
        messageBox.querySelector('p:first-child').style.display = 'block';
    }
});

function createBurstHeart() {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = '30px';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(heart);
    
    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    let opacity = 1;
    
    const animation = setInterval(() => {
        posX += vx * 0.016;
        posY += vy * 0.016;
        opacity -= 0.02;
        
        heart.style.left = posX + 'px';
        heart.style.top = posY + 'px';
        heart.style.opacity = opacity;
        
        if (opacity <= 0) {
            clearInterval(animation);
            heart.remove();
        }
    }, 16);
}

// Smooth scrolling for scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('.love-letter').scrollIntoView({ behavior: 'smooth' });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all reason cards
document.querySelectorAll('.reason-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Initialize floating hearts
createFloatingHearts();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});