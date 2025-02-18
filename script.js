/**
 * L'Occhio Oscuro – Advanced Scroll, Parallax, and Torchlight Effects
 *
 * - Smooth inertia-based scrolling & parallax for elements with the ".parallax" class.
 * - Dynamically fades in the temple and dark overlays based on scroll position.
 * - Updates the torchlight effect in the Collection section as the mouse moves.
 */
document.addEventListener("DOMContentLoaded", () => {
  let currentScroll = 0;
  let targetScroll = window.scrollY;
  const easeFactor = 0.1;

  const scrollOverlay = document.querySelector(".scroll-overlay");
  const templeLayer = document.querySelector(".temple-layer");
  const navbar = document.querySelector(".navbar");

  // Torch effect variables for the Collection section
  const shopSection = document.getElementById("shop");
  const torchOverlay = document.querySelector(".torch-overlay");

  // Update target scroll on window scroll (for parallax & overlay effects)
  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
    // Fade in elements when they come into view
    document.querySelectorAll(".fade-in").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        el.classList.add("visible");
      }
    });
  });

  function smoothUpdate() {
    currentScroll += (targetScroll - currentScroll) * easeFactor;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Apply parallax effect on elements with the ".parallax" class
    document.querySelectorAll(".parallax").forEach((layer) => {
      const depth = parseFloat(layer.getAttribute("data-depth")) || 0.5;
      const movement = currentScroll * depth;
      layer.style.transform = `translateY(${movement}px)`;
    });

    // Update the temple layer opacity based on scroll (simulate deeper entry)
    if (templeLayer) {
      const templeOpacity = Math.min(
        (currentScroll / maxScroll) *
          parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--temple-max-opacity")),
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--temple-max-opacity"))
      );
      templeLayer.style.opacity = templeOpacity;
    }

    // Update the dark overlay opacity (overall darkening effect)
    if (scrollOverlay) {
      const overlayOpacity = Math.min(
        (currentScroll / maxScroll) *
          parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--overlay-max-opacity")),
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--overlay-max-opacity"))
      );
      scrollOverlay.style.opacity = overlayOpacity;
    }

    // Toggle navbar style based on scroll threshold
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    requestAnimationFrame(smoothUpdate);
  }
  smoothUpdate();

  /* ----------------------------------
     Torchlight Effect for Collection Section
  ------------------------------------- */
  // When the mouse enters the shop section, remove the full-dark overlay.
  shopSection.addEventListener("mouseenter", () => {
    torchOverlay.classList.remove("full-dark");
  });

  // Update torch overlay position based on mouse movement within the section.
  shopSection.addEventListener("mousemove", (e) => {
    const rect = shopSection.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the section
    const y = e.clientY - rect.top;  // Y position within the section
    // Update custom CSS variables for torch center position
    torchOverlay.style.setProperty("--torch-x", `${x}px`);
    torchOverlay.style.setProperty("--torch-y", `${y}px`);
  });

  // When the mouse leaves the shop section, revert the overlay to full darkness.
  shopSection.addEventListener("mouseleave", () => {
    torchOverlay.classList.add("full-dark");
  });
});
