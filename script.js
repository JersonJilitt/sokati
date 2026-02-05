// Countdown Timer - Live updating
function updateCountdown() {
    const startDate = new Date('2025-08-09T00:00:00');
    const now = new Date();
    
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    document.getElementById('days').textContent = days;
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Create floating hearts and tulips
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const symbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '🌷'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 800);
}

// Game Section - "Play with My Heart"
const gameHeartBtn = document.getElementById('gameHeartBtn');
const gameMessage = document.getElementById('gameMessage');
let gameClicked = false;

function handleGameHeart(e) {
    e.preventDefault();
    if (!gameClicked) {
        gameClicked = true;
        gameHeartBtn.classList.add('clicked');
        gameMessage.classList.add('show');
        
        // Create heart burst
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createBurstHeart();
            }, i * 50);
        }
    }
}

// Add both click and touch events for mobile compatibility
gameHeartBtn.addEventListener('click', handleGameHeart);
gameHeartBtn.addEventListener('touchend', handleGameHeart);

// Interactive heart button - Special Message
const heartButton = document.getElementById('heartButton');
const hiddenMessage = document.getElementById('hiddenMessage');

function handleSpecialMessage(e) {
    e.preventDefault();
    hiddenMessage.classList.toggle('show');
    
    if (hiddenMessage.classList.contains('show')) {
        // Create burst of hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createBurstHeart();
            }, i * 50);
        }
    }
}

// Add both click and touch events for mobile compatibility
heartButton.addEventListener('click', handleSpecialMessage);
heartButton.addEventListener('touchend', handleSpecialMessage);

function createBurstHeart() {
    const heart = document.createElement('div');
    heart.textContent = Math.random() > 0.5 ? '❤️' : '🌷';
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
    document.querySelector('.countdown-section').scrollIntoView({ behavior: 'smooth' });
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

// Add parallax effect to hero section (disable on mobile for performance)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Add particle effect on mouse move (desktop only)
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            const particle = document.createElement('div');
            particle.textContent = Math.random() > 0.7 ? '🌷' : '✨';
            particle.style.position = 'fixed';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.fontSize = '20px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.animation = 'fadeOut 2s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    });
}