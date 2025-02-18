/**
 * L'Occhio Oscuro – Advanced Scroll, Parallax & Immersive Background Effects
 *
 * - Implements smooth inertia-based scrolling.
 * - Calculates dynamic parallax effects for elements with the ".parallax" class.
 * - Triggers fade-in animations when elements come into view.
 * - Gradually reveals the temple layer and a subtle dark overlay as you scroll down.
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentScroll = 0;
  let targetScroll = window.scrollY;
  const easeFactor = 0.1;

  const scrollOverlay = document.querySelector(".scroll-overlay");
  const templeLayer = document.querySelector(".temple-layer");
  const navbar = document.querySelector(".navbar");

  // Update target scroll on window scroll
  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;

    // Trigger fade-in for elements as they approach viewport
    document.querySelectorAll(".fade-in").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        el.classList.add("visible");
      }
    });
  });

  function smoothUpdate() {
    currentScroll += (targetScroll - currentScroll) * easeFactor;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Parallax for elements with "parallax" class
    document.querySelectorAll(".parallax").forEach((layer) => {
      const depth = parseFloat(layer.getAttribute("data-depth")) || 0.5;
      const movement = currentScroll * depth;
      layer.style.transform = `translateY(${movement}px)`;
    });

    // Update temple layer opacity (simulate entering deeper into a temple)
    if (templeLayer) {
      const templeOpacity = Math.min((currentScroll / maxScroll) * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--temple-max-opacity')), parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--temple-max-opacity')));
      templeLayer.style.opacity = templeOpacity;
    }

    // Update dark overlay opacity (subtle overall darkening)
    if (scrollOverlay) {
      const overlayOpacity = Math.min((currentScroll / maxScroll) * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--overlay-max-opacity')), parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--overlay-max-opacity')));
      scrollOverlay.style.opacity = overlayOpacity;
    }

    // Navbar style update based on scroll
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    requestAnimationFrame(smoothUpdate);
  }

  smoothUpdate();
});
