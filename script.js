const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const frameCount = 240;

// Generate image path
const currentFrame = (index) => {
  const padded = String(index + 1).padStart(3, "0");
  return `frame/ezgif-frame-${padded}.jpg`;
};

const images = [];
let imagesLoaded = 0;

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

// Preload images
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);

  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === frameCount) {
      render();
    }
  };

  images.push(img);
}

// Render frame according to scroll
function render() {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
}

// Scroll animation
window.addEventListener("scroll", render);

// Resize animation
window.addEventListener("resize", () => {
  resizeCanvas();
  render();
});


// =====================
// Fade-In Animation
// =====================

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

sections.forEach((section) => {
  observer.observe(section);
});


// =====================
// Dark / Light Mode
// =====================

const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      toggleBtn.innerHTML = "☀️ Light Mode";
    } else {
      toggleBtn.innerHTML = "🌙 Dark Mode";
    }

  });
}
