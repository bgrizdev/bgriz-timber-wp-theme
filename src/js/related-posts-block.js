import Splide from "@splidejs/splide";

document.addEventListener('DOMContentLoaded', function() {
    const splideElements = document.querySelectorAll('.splide');

    splideElements.forEach(element => {
        // Initialize Splide with responsive options
        const splide = new Splide(element, {
            type: 'loop',
            arrows: false,
            pagination: false,
            gap: '1rem',
            speed: 800,
            rewind: true,
            focus: 0,
            trimSpace: false,
            drag: true,
            perPage: 3, // Default perPage for desktop
            perMove: 1,
            // Responsive breakpoints
            breakpoints: {
                768: {
                    perPage: 1,
                    perMove: 1,
                }
            }
        });

        // Get parent container and custom navigation elements
        const container = element.closest('.related-posts-block');
        const prevButton = container.querySelector('.prev-arrow');
        const nextButton = container.querySelector('.next-arrow');

        // Add click handlers for custom arrows
        prevButton.addEventListener('click', () => splide.go('<'));
        nextButton.addEventListener('click', () => splide.go('>'));

        // Mount Splide
        splide.mount();
    });
});