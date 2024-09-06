let currentSlide = 0;
let isPaused = false;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

document.getElementById('next').addEventListener('click', () => {
  moveToNextSlide();
});

document.getElementById('prev').addEventListener('click', () => {
  moveToPrevSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
});

const moveToNextSlide = () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlidePosition();
};

const moveToPrevSlide = () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
};

const goToSlide = (index) => {
  currentSlide = index;
  updateSlidePosition();
};

const updateSlidePosition = () => {
  const sliderWidth = slides[0].clientWidth;
  const offset = -sliderWidth * currentSlide;
  document.querySelector('.slides').style.transform = `translateX(${offset}px)`;
  updateDots();
};

const updateDots = () => {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlide].classList.add('active');
};

// Auto transition every 3-5 seconds
let autoSlide = setInterval(moveToNextSlide, 4000);

// Pause auto transition on hover
document.getElementById('slider').addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
  isPaused = true;
});

document.getElementById('slider').addEventListener('mouseleave', () => {
  if (isPaused) {
    autoSlide = setInterval(moveToNextSlide, 4000);
    isPaused = false;
  }
});

// Swipe functionality for touchscreens
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('slider').addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('slider').addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

const handleSwipe = () => {
  if (touchEndX < touchStartX) {
    moveToNextSlide();
  }
  if (touchEndX > touchStartX) {
    moveToPrevSlide();
  }
};
