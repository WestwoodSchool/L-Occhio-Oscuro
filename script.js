document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling & parallax variables
  let currentScroll = 0;
  let targetScroll = window.scrollY;
  const easeFactor = 0.1;
  const templeLayer = document.querySelector(".temple-layer");
  const navbar = document.querySelector(".navbar");
  const rollingBoulder = document.querySelector(".rolling-boulder img");

  // Torch elements
  const torchOverlay = document.querySelector(".torch-overlay");
  const torchIconCursor = document.querySelector(".torch-icon-cursor");
  const torchOnWall = document.querySelector(".torch-on-wall");
  let torchRevealed = false; // Prevent multiple clicks on torch reveal

  // Hidden Map Elements
  const hiddenMap = document.querySelector("#hidden-map");
  const closeMapBtn = document.querySelector(".close-map");

  // Portal Transition
  const portalTransition = document.querySelector(".portal-transition");

  // Smooth scrolling & effects
  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;

    // Fade-in elements when they enter viewport
    document.querySelectorAll(".fade-in").forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        element.classList.add("visible");
      }
    });

    // Show portal transition when scrolling into shop section
    const shopSection = document.querySelector("#shop");
    if (shopSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
      portalTransition.style.display = "block";
      portalTransition.style.opacity = "1";
    } else {
      portalTransition.style.opacity = "0";
      setTimeout(() => {
        portalTransition.style.display = "none";
      }, 500);
    }
  });

  // Smooth update loop for parallax, temple fade, navbar, and rolling boulder animation
  function smoothUpdate() {
    currentScroll += (targetScroll - currentScroll) * easeFactor;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Parallax effect for elements with .parallax
    document.querySelectorAll(".parallax").forEach((layer) => {
      const depth = parseFloat(layer.getAttribute("data-depth")) || 0.5;
      const movement = currentScroll * depth;
      layer.style.transform = `translateY(${movement}px)`;
    });

    // Update temple layer opacity based on scroll depth
    if (templeLayer) {
      const templeMaxOpacity = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--temple-max-opacity")
      ) || 0.7;
      const newOpacity = Math.min((currentScroll / maxScroll) * templeMaxOpacity, templeMaxOpacity);
      templeLayer.style.opacity = newOpacity;
    }

    // Update navbar styling based on scroll
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Animate rolling boulder based on scroll speed
    if (rollingBoulder) {
      const rotation = currentScroll * 3; // Adjust speed factor here
      rollingBoulder.style.transform = `rotate(${rotation}deg)`;
    }

    requestAnimationFrame(smoothUpdate);
  }
  smoothUpdate();

  // Torchlight effect: Update overlay & torch cursor to follow the mouse
  window.addEventListener("mousemove", (e) => {
    if (!torchRevealed) {
      torchOverlay.style.setProperty("--torch-x", `${e.pageX}px`);
      torchOverlay.style.setProperty("--torch-y", `${e.pageY}px`);
    }
    if (torchIconCursor) {
      torchIconCursor.style.left = `${e.pageX}px`;
      torchIconCursor.style.top = `${e.pageY}px`;
    }
  });

  // Click-to-Reveal Torch (Moves to Wall & Reveals Site)
  document.addEventListener("click", () => {
    if (!torchRevealed) {
      torchRevealed = true;

      // Animate torch overlay fade-out and then remove it
      torchOverlay.style.transition = "opacity 0.5s ease";
      torchOverlay.style.opacity = "0";
      setTimeout(() => {
        torchOverlay.remove();
      }, 500);

      // Fade out the torch icon cursor
      torchIconCursor.style.transition = "opacity 0.5s ease";
      torchIconCursor.style.opacity = "0";

      // Show torch on wall
      torchOnWall.classList.remove("hidden");
    }
  });

  // Hidden Map Toggle (Opens on Click, Closes on Button)
  document.querySelector("#shop").addEventListener("click", () => {
    hiddenMap.style.display = "block";
  });

  closeMapBtn.addEventListener("click", () => {
    hiddenMap.style.display = "none";
  });
});
