document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling/parallax variables
  let currentScroll = 0;
  let targetScroll = window.scrollY;
  const easeFactor = 0.1;
  const templeLayer = document.querySelector(".temple-layer");
  const navbar = document.querySelector(".navbar");
  const rollingBoulder = document.querySelector(".rolling-boulder");

  // Torch elements
  const torchOverlay = document.querySelector(".torch-overlay");
  const torchIconCursor = document.querySelector(".torch-icon-cursor");
  const torchOnWall = document.querySelector(".torch-on-wall");
  let torchRevealed = false; // flag to indicate if user clicked to reveal site

  // Update scroll target and trigger fade-in on scroll
  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
    document.querySelectorAll(".fade-in").forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        element.classList.add("visible");
      }
    });
  });

  // Smooth update loop for parallax, temple fade, navbar, and boulder rotation
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

    // Animate rolling boulder rotation based on scroll (adjust factor as needed)
    if (rollingBoulder) {
      const rotation = currentScroll / 5; // Adjust rotation speed factor here
      rollingBoulder.style.transform = `rotate(${rotation}deg)`;
    }

    requestAnimationFrame(smoothUpdate);
  }
  smoothUpdate();

  // Torchlight effect: Update the torch overlay and icon to follow the cursor
  window.addEventListener("mousemove", (e) => {
    if (torchOverlay && !torchRevealed) {
      torchOverlay.style.setProperty("--torch-x", `${e.pageX}px`);
      torchOverlay.style.setProperty("--torch-y", `${e.pageY}px`);
    }
    if (torchIconCursor && !torchRevealed) {
      torchIconCursor.style.left = `${e.pageX}px`;
      torchIconCursor.style.top = `${e.pageY}px`;
    }
  });

  // On click, animate the torch reveal transition:
  // - Fade out the torch overlay and remove it
  // - Fade out the torch icon cursor
  // - Show the torch fixed on the wall
  document.addEventListener("click", () => {
    if (!torchRevealed) {
      torchRevealed = true;

      // Animate torch overlay fade-out and then remove it
      if (torchOverlay) {
        torchOverlay.style.transition = "opacity 0.5s ease";
        torchOverlay.style.opacity = "0";
        setTimeout(() => {
          torchOverlay.remove();
        }, 500);
      }

      // Fade out the torch icon cursor
      if (torchIconCursor) {
        torchIconCursor.style.transition = "opacity 0.5s ease";
        torchIconCursor.style.opacity = "0";
      }

      // Reveal the torch on the wall (remove .hidden)
      if (torchOnWall) {
        torchOnWall.classList.remove("hidden");
      }
    }
  });
});
