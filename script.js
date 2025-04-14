document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const images = document.querySelectorAll(".image-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const close = document.querySelector(".close");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let currentImageIndex = 0;
    let filteredImages = [...images];

    // Filter images based on category
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.dataset.filter;
            images.forEach(image => {
                if (category === "all" || image.classList.contains(category)) {
                    image.style.display = "block";
                } else {
                    image.style.display = "none";
                }
            });

            // Update filtered images for navigation
            filteredImages = [...document.querySelectorAll(".image-item")].filter(img => img.style.display !== "none");
        });
    });

    // Open lightbox
    images.forEach((image, index) => {
        image.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = image.querySelector("img").src;
            currentImageIndex = index;
        });
    });

    // Close lightbox
    close.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Navigate images
    function showImage(index) {
        if (index < 0) {
            index = filteredImages.length - 1;
        } else if (index >= filteredImages.length) {
            index = 0;
        }
        currentImageIndex = index;
        lightboxImg.src = filteredImages[currentImageIndex].querySelector("img").src;
    }

    prevBtn.addEventListener("click", () => showImage(currentImageIndex - 1));
    nextBtn.addEventListener("click", () => showImage(currentImageIndex + 1));
});