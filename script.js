document.addEventListener("DOMContentLoaded", () => {
  // Variables for smooth scrolling / parallax effects
  let currentScroll = 0;
  let targetScroll = window.scrollY;
  const easeFactor = 0.1;

  // Elements for parallax and temple fade effects
  const templeLayer = document.querySelector(".temple-layer");
  const navbar = document.querySelector(".navbar");
  const torchOverlay = document.querySelector(".torch-overlay");

  // Update target scroll and trigger fade-ins on scroll
  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;

    // Fade in elements with the .fade-in class when near viewport
    document.querySelectorAll(".fade-in").forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        element.classList.add("visible");
      }
    });
  });

  // Smooth update loop for parallax and temple fade effects
  function smoothUpdate() {
    currentScroll += (targetScroll - currentScroll) * easeFactor;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Apply parallax effect on elements with the .parallax class
    document.querySelectorAll(".parallax").forEach((layer) => {
      const depth = parseFloat(layer.getAttribute("data-depth")) || 0.5;
      const movement = currentScroll * depth;
      layer.style.transform = `translateY(${movement}px)`;
    });

    // Fade in temple layer based on scroll depth
    if (templeLayer) {
      const templeMaxOpacity = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--temple-max-opacity")
      ) || 0.7;
      const newOpacity = Math.min((currentScroll / maxScroll) * templeMaxOpacity, templeMaxOpacity);
      templeLayer.style.opacity = newOpacity;
    }

    // Update navbar style based on scroll
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    requestAnimationFrame(smoothUpdate);
  }
  smoothUpdate();

  // Torchlight Effect: Update the torch center based on mouse movement
  window.addEventListener("mousemove", (e) => {
    // Only update if the torch overlay exists (i.e. hasn't been disabled)
    if (torchOverlay) {
      torchOverlay.style.setProperty("--torch-x", `${e.pageX}px`);
      torchOverlay.style.setProperty("--torch-y", `${e.pageY}px`);
    }
  });

  // On any click, disable the torch effect and reveal the entire site.
  document.addEventListener("click", () => {
    if (torchOverlay) {
      // Remove the torch overlay from the DOM so the site remains fully visible.
      torchOverlay.remove();
    }
  });
});
