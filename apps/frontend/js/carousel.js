// Hero Carousel Functions

let currentSlide = 0;
let carouselInterval;

const carouselSlides = [
    {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&h=1080&fit=crop",
        title: "Trail Running",
        subtitle: "Up the Mountains, Through the Woods",
        buttonText: "Explore"
    },
    {
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&h=1080&fit=crop",
        title: "Hollywood Goalkeepers",
        subtitle: "Show Stoppers",
        buttonText: "Shop"
    },
    {
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1920&h=1080&fit=crop",
        title: "UltraBoost Pro",
        subtitle: "Energy for Every Step",
        buttonText: "Discover"
    },
    {
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1920&h=1080&fit=crop",
        title: "Sportswear Collection",
        subtitle: "Minimalist and Durable",
        buttonText: "Shop Now"
    },
    {
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1920&h=1080&fit=crop",
        title: "Classic Style",
        subtitle: "Timeless Design",
        buttonText: "Explore"
    }
];

function initCarousel() {
    const slidesContainer = document.getElementById('carouselSlides');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!slidesContainer || !dotsContainer) return;
    
    // Render slides
    slidesContainer.innerHTML = carouselSlides.map((slide, index) => `
        <div class="carousel-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.image}');">
            <div class="carousel-content">
                <h2 class="carousel-title">${slide.title}</h2>
                <h1 class="carousel-subtitle">${slide.subtitle}</h1>
                <button class="btn-carousel" onclick="showProductsPage(event)">${slide.buttonText}</button>
            </div>
        </div>
    `).join('');
    
    // Render dots
    dotsContainer.innerHTML = carouselSlides.map((_, index) => `
        <span class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
    `).join('');
    
    // Auto play
    startCarousel();
}

function startCarousel() {
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        goToSlide(currentSlide);
    }, 5000); // Change slide every 5 seconds
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
}

function goToSlide(index) {
    currentSlide = index;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    // Restart carousel
    stopCarousel();
    startCarousel();
}

function changeSlide(direction) {
    stopCarousel();
    currentSlide = (currentSlide + direction + carouselSlides.length) % carouselSlides.length;
    goToSlide(currentSlide);
}


