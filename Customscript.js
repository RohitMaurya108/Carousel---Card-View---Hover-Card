const track = document.querySelector(".carousel-track");
const items = document.querySelectorAll(".carousel-item");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const totalItems = items.length;
let visibleItems = 3; // Default: 3 items per view
let currentIndex = visibleItems; // Start after the prepended clone

// Clone first and last set of images for infinite looping
const firstClone = track.innerHTML;
const lastClone = track.innerHTML;
track.insertAdjacentHTML("afterbegin", lastClone);
track.insertAdjacentHTML("beforeend", firstClone);

function updateCarousel() {
  const slideWidth = items[0].offsetWidth;
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function moveToNext() {
  const slideWidth = items[0].offsetWidth;
  currentIndex++;
  updateCarousel();

  // Reset position when reaching the end of the original items
  setTimeout(() => {
    if (currentIndex === totalItems + visibleItems) {
      track.style.transition = "none";
      currentIndex = visibleItems;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  }, 500);
}

function moveToPrev() {
  const slideWidth = items[0].offsetWidth;
  currentIndex--;
  updateCarousel();

  // Reset position when reaching the start of the original items
  setTimeout(() => {
    if (currentIndex === 0) {
      track.style.transition = "none";
      currentIndex = totalItems;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  }, 500);
}

nextButton.addEventListener("click", moveToNext);
prevButton.addEventListener("click", moveToPrev);

// Auto-scroll every 3 seconds
setInterval(moveToNext, 3000);

// Set initial position
const slideWidth = items[0].offsetWidth;
track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

// Adjust visible items and position on resize
window.addEventListener("resize", () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 480) {
    visibleItems = 1; // 1 item on small screens
  } else if (screenWidth <= 768) {
    visibleItems = 2; // 2 items on tablets
  } else {
    visibleItems = 3; // 3 items on larger screens
  }
  currentIndex = visibleItems;
  updateCarousel();
});
