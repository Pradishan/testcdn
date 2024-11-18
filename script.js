document.addEventListener('DOMContentLoaded', () => {
    const heroImages = [
        './img.jpg',
        'hero-image2.jpg',
        'hero-image3.jpg'
    ];

    let currentIndex = 0;
    const heroSection = document.querySelector('.hero');

    function updateHeroImage() {
        heroSection.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % heroImages.length;
    }

    setInterval(updateHeroImage, 5000);
});
