document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".carrocel .slide");
    const prevButton = document.querySelector(".carrocel-button.prev");
    const nextButton = document.querySelector(".carrocel-button.next");
    const carouselContainer = document.querySelector(".carrocel");
    const header = document.querySelector("header");

    let currentIndex = 0;


    function updateSlide(index) {
        slides.forEach((slide, i) => {
            const isActive = i === index;
            slide.classList.toggle("active", isActive);
            slide.style.display = isActive ? "block" : "none";

        
            if (isActive) {
                const backgroundColor = window.getComputedStyle(slide).getPropertyValue("--background").trim();
                if (backgroundColor) {
                    carouselContainer.style.setProperty("--background", backgroundColor);
                    header.style.setProperty("--background", backgroundColor);
            
                }
            }
        });
    }

    
    updateSlide(currentIndex);

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlide(currentIndex);
    });


    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlide(currentIndex);
    });
});