const heroArtwork = new Image();
heroArtwork.src = "https://res.cloudinary.com/jcbjstmz/image/upload/v1785329822/webely_gu90xp.jpg";

const site = document.getElementById("vt-site");

const DAMPING = 0.06;

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (event) => {
  const halfWidth = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;

  targetX = (event.clientX - halfWidth) / halfWidth;
  targetY = (event.clientY - halfHeight) / halfHeight;
});

function animate() {
  currentX += (targetX - currentX) * DAMPING;
  currentY += (targetY - currentY) * DAMPING;

  if (site) {
    site.style.setProperty("--mx", currentX.toFixed(3));
    site.style.setProperty("--my", currentY.toFixed(3));
  }

  requestAnimationFrame(animate);
}

if (site) {
  animate();
}

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  targetX = 0;
  targetY = 0;
}


const flipCards = document.querySelectorAll(".vt-flip-card");

flipCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
});