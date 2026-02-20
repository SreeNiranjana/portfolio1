const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const frameCount = 240;

// Generate correct file path from folder "frame"
const currentFrame = (index) => {
  const padded = String(index + 1).padStart(3, "0");
  return `frame/ezgif-frame-${padded}.jpg`;
};

const images = [];
let imagesLoaded = 0;

// Set canvas size
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

// Scroll listener
window.addEventListener("scroll", render);

// Resize listener
window.addEventListener("resize", () => {
  resizeCanvas();
  render();
});
