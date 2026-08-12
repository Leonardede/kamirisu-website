/* ============================================================
   KAMIRISU — PARALLAX.JS
   ============================================================
   This file has exactly two jobs, kept separate from script.js
   on purpose (see chat explanation):

   1. PRELOAD the hero artwork, so it's already sitting in the
      browser's memory before it's needed — no flash/pop-in.

   2. Track the mouse position and store it as two CSS variables
      (--mx and --my) on the page. style.css reads those two
      variables inside its animations to make the hero artwork
      lean slightly toward wherever the mouse is.

   This file does NOT touch page-switching or nav — script.js
   already owns that job completely.
   ============================================================ */


/* ------------------------------------------------------------
   PART 1 — PRELOADING
   `new Image()` creates an invisible, never-displayed image
   object purely to trigger the browser into downloading the
   file right away. Once this line runs, the browser already has
   the picture cached, so when the CSS shows it, it appears
   instantly instead of loading late.
   ------------------------------------------------------------ */
const heroArtwork = new Image();
heroArtwork.src = "https://res.cloudinary.com/jcbjstmz/image/upload/v1785329822/webely_gu90xp.jpg";


/* ------------------------------------------------------------
   PART 2 — MOUSE PARALLAX
   ------------------------------------------------------------ */

// This is the element whose CSS variables we'll update.
// We attach --mx / --my to the whole site wrapper, so any CSS
// rule anywhere in the page can read them if it wants to.
const site = document.getElementById("vt-site");

// "Damping" softens the motion so it doesn't feel jittery/instant.
// Instead of jumping straight to the mouse's exact position, the
// artwork eases toward it a little bit on every animation frame.
// A smaller number = smoother/slower catch-up. A bigger number =
// snappier/more immediate response.
const DAMPING = 0.06;

// These track where the artwork currently "is" (current) versus
// where the mouse wants it to be (target). We smoothly move
// `current` toward `target` a little on every frame.
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (event) => {
  // innerWidth/innerHeight = the size of the browser window.
  // We compare the mouse's position against the CENTER of the
  // screen, then divide by half the width/height. That gives us
  // a value roughly between -1 (far left/top) and 1 (far right/
  // bottom), with 0 meaning "dead center."
  const halfWidth = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;

  targetX = (event.clientX - halfWidth) / halfWidth;
  targetY = (event.clientY - halfHeight) / halfHeight;
});

function animate() {
  // Move `current` a small step closer to `target` every frame.
  // This is what creates the soft, trailing, "expensive" feeling
  // of motion instead of the art snapping directly to the mouse.
  currentX += (targetX - currentX) * DAMPING;
  currentY += (targetY - currentY) * DAMPING;

  if (site) {
    site.style.setProperty("--mx", currentX.toFixed(3));
    site.style.setProperty("--my", currentY.toFixed(3));
  }

  // requestAnimationFrame asks the browser to run this function
  // again right before the next screen repaint — this is the
  // standard, smooth way to do continuous animation in JS
  // (much smoother than setInterval).
  requestAnimationFrame(animate);
}

// Only start the animation loop if the site wrapper actually
// exists on the page — a small safety check.
if (site) {
  animate();
}

// If the person has asked their operating system to reduce motion
// (an accessibility preference), we skip the parallax loop
// entirely so nothing moves unexpectedly for them.
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

