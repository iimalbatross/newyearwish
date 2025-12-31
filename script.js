// Current slide index
let currentSlide = 0;
let currentWish = 0;
let currentSpecialSlide = 0;
const totalSlides = 5;
const totalWishes = 5;
const totalSpecialSlides = 6;

// Open surprise box from landing page
function openSurpriseBox() {
    const landing = document.getElementById('landing');
    const surpriseSection = document.getElementById('surpriseSection');
    
    landing.style.opacity = '0';
    landing.style.transform = 'scale(0.8)';
    landing.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
        landing.classList.add('hidden');
        surpriseSection.classList.remove('hidden');
        surpriseSection.style.animation = 'fadeIn 1s ease';
    }, 500);
}

// Reveal content from box
function revealContent() {
    const boxLid = document.getElementById('boxLid');
    const boxBody = document.getElementById('boxBody');
    const surpriseSection = document.getElementById('surpriseSection');
    const slideshowSection = document.getElementById('slideshowSection');
    
    // Open the box lid
    boxLid.classList.add('open');
    
    // After box opens, show slideshow
    setTimeout(() => {
        boxBody.style.opacity = '0';
        boxBody.style.transform = 'scale(0.8)';
        boxBody.style.transition = 'all 0.8s ease';
    }, 1000);
    
    setTimeout(() => {
        surpriseSection.classList.add('hidden');
        
        // Show all content sections
        const contentSections = ['slideshowSection', 'lettersSection', 'wishesSection', 'finalSection', 'specialMemoriesSection'];
        contentSections.forEach(id => {
            const sec = document.getElementById(id);
            if (sec) {
                sec.classList.remove('hidden');
            }
        });
        
        slideshowSection.style.animation = 'fadeIn 1s ease';
        
        // Scroll to slideshow section
        setTimeout(() => {
            slideshowSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        // Start auto slideshow
        startAutoSlideshow();
    }, 2000);
}

// Photo Slideshow Functions
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

let slideshowInterval;
function startAutoSlideshow() {
    if (slideshowInterval) clearInterval(slideshowInterval);
    slideshowInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Wishes Slideshow Functions
function changeWish(direction) {
    const wishes = document.querySelectorAll('.wish-card');
    const indicators = document.querySelectorAll('.wish-indicator');
    
    wishes[currentWish].classList.remove('active');
    indicators[currentWish].classList.remove('active');
    
    currentWish += direction;
    
    if (currentWish < 0) {
        currentWish = totalWishes - 1;
    } else if (currentWish >= totalWishes) {
        currentWish = 0;
    }
    
    wishes[currentWish].classList.add('active');
    indicators[currentWish].classList.add('active');
}

function goToWish(index) {
    const wishes = document.querySelectorAll('.wish-card');
    const indicators = document.querySelectorAll('.wish-indicator');
    
    wishes[currentWish].classList.remove('active');
    indicators[currentWish].classList.remove('active');
    
    currentWish = index;
    
    wishes[currentWish].classList.add('active');
    indicators[currentWish].classList.add('active');
}

// Start auto wishes slideshow when wishes section is visible
let wishesInterval;
function startAutoWishes() {
    if (wishesInterval) clearInterval(wishesInterval);
    wishesInterval = setInterval(() => {
        changeWish(1);
    }, 4000);
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Make sure section is visible
        if (section.classList.contains('hidden')) {
            section.classList.remove('hidden');
        }
        
        // Scroll to the section
        setTimeout(() => {
            section.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
        }, 100);
        
        // Start auto slideshow for memories section
        if (sectionId === 'slideshowSection') {
            setTimeout(() => {
                startAutoSlideshow();
            }, 300);
        }
        
        // Start auto wishes if scrolling to wishes section
        if (sectionId === 'wishesSection') {
            setTimeout(() => {
                startAutoWishes();
            }, 400);
        }
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Start wishes auto-slideshow when wishes section is visible
            if (entry.target.id === 'wishesSection') {
                startAutoWishes();
            }
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            const activeSection = document.querySelector('section:not(.hidden)');
            if (activeSection && activeSection.id === 'slideshowSection') {
                changeSlide(-1);
            } else if (activeSection && activeSection.id === 'wishesSection') {
                changeWish(-1);
            } else if (activeSection && activeSection.id === 'specialMemoriesSection') {
                const specialGrid = document.getElementById('specialPhotosGrid');
                if (specialGrid && !specialGrid.classList.contains('hidden')) {
                    changeSpecialSlide(-1);
                }
            }
        } else if (e.key === 'ArrowRight') {
            const activeSection = document.querySelector('section:not(.hidden)');
            if (activeSection && activeSection.id === 'slideshowSection') {
                changeSlide(1);
            } else if (activeSection && activeSection.id === 'wishesSection') {
                changeWish(1);
            } else if (activeSection && activeSection.id === 'specialMemoriesSection') {
                const specialGrid = document.getElementById('specialPhotosGrid');
                if (specialGrid && !specialGrid.classList.contains('hidden')) {
                    changeSpecialSlide(1);
                }
            }
        }
    });
});

// Add smooth reveal animation for letter cards
const letterCards = document.querySelectorAll('.letter-card');
letterCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Handle image loading errors
function handleImageError(img, index) {
    img.style.display = 'none';
    const placeholder = document.getElementById('placeholder' + index);
    if (placeholder) {
        placeholder.style.display = 'flex';
    }
}

// Handle special image loading errors
function handleSpecialImageError(img, index) {
    img.style.display = 'none';
    const placeholder = document.getElementById('specialPlaceholder' + index);
    if (placeholder) {
        placeholder.style.display = 'flex';
    }
}

// Open special memories box
function openSpecialMemories() {
    const specialBoxLid = document.getElementById('specialBoxLid');
    const specialBoxBody = document.getElementById('specialBoxBody');
    const specialSurpriseBox = document.getElementById('specialSurpriseBox');
    const specialPhotosGrid = document.getElementById('specialPhotosGrid');
    
    // Open the box lid
    specialBoxLid.classList.add('open');
    
    // After box opens, show photos
    setTimeout(() => {
        specialBoxBody.style.opacity = '0';
        specialBoxBody.style.transform = 'scale(0.8)';
        specialBoxBody.style.transition = 'all 0.8s ease';
    }, 1000);
    
    setTimeout(() => {
        specialSurpriseBox.style.display = 'none';
        specialPhotosGrid.classList.remove('hidden');
        specialPhotosGrid.style.animation = 'fadeIn 1s ease';
        
        // Start auto slideshow
        startAutoSpecialSlideshow();
    }, 2000);
}

// Special Slideshow Functions
function changeSpecialSlide(direction) {
    const slides = document.querySelectorAll('.special-slide');
    const indicators = document.querySelectorAll('#specialPhotosGrid .indicator');
    
    slides[currentSpecialSlide].classList.remove('active');
    if (indicators[currentSpecialSlide]) {
        indicators[currentSpecialSlide].classList.remove('active');
    }
    
    currentSpecialSlide += direction;
    
    if (currentSpecialSlide < 0) {
        currentSpecialSlide = totalSpecialSlides - 1;
    } else if (currentSpecialSlide >= totalSpecialSlides) {
        currentSpecialSlide = 0;
    }
    
    slides[currentSpecialSlide].classList.add('active');
    if (indicators[currentSpecialSlide]) {
        indicators[currentSpecialSlide].classList.add('active');
    }
}

function goToSpecialSlide(index) {
    const slides = document.querySelectorAll('.special-slide');
    const indicators = document.querySelectorAll('#specialPhotosGrid .indicator');
    
    slides[currentSpecialSlide].classList.remove('active');
    if (indicators[currentSpecialSlide]) {
        indicators[currentSpecialSlide].classList.remove('active');
    }
    
    currentSpecialSlide = index;
    
    slides[currentSpecialSlide].classList.add('active');
    if (indicators[currentSpecialSlide]) {
        indicators[currentSpecialSlide].classList.add('active');
    }
}

let specialSlideshowInterval;
function startAutoSpecialSlideshow() {
    if (specialSlideshowInterval) clearInterval(specialSlideshowInterval);
    specialSlideshowInterval = setInterval(() => {
        changeSpecialSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Add image upload functionality (optional - for adding photos)
function addPhotoToSlide(slideIndex, imageUrl) {
    const slides = document.querySelectorAll('.slide');
    if (slides[slideIndex]) {
        const placeholder = slides[slideIndex].querySelector('.photo-placeholder');
        if (placeholder) {
            placeholder.innerHTML = `<img src="${imageUrl}" alt="Memory ${slideIndex + 1}" style="width: 100%; height: 100%; object-fit: cover;">`;
        }
    }
}

// Example: To add photos, you can call:
// addPhotoToSlide(0, 'path/to/photo1.jpg');
// addPhotoToSlide(1, 'path/to/photo2.jpg');
// etc.

console.log('💖 Website loaded! Happy New Year 2026! 💖');

