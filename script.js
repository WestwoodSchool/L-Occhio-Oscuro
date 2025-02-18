document.addEventListener("DOMContentLoaded", () => {
  /* 
    Smooth parallax scrolling (optional).
    If you want to keep your temple-layer fade-in or other scroll-based effects,
    you can keep these. Otherwise, remove if not needed.
  */
  let currentScroll = 0;
  let targetScroll = window.scrollY;
  const easeFactor = 0.1;
  const templeLayer = document.querySelector(".temple-layer");
  const navbar = document.querySelector(".navbar");

  // If you want to fade the temple layer as you scroll "deeper"
  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;

    // Trigger fade-in for elements as they approach the viewport
    document.querySelectorAll(".fade-in").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        el.classList.add("visible");
      }
    });
  });

  function smoothUpdate() {
    currentScroll += (targetScroll - currentScroll) * easeFactor;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Parallax effect for elements with .parallax
    document.querySelectorAll(".parallax").forEach((layer) => {
      const depth = parseFloat(layer.getAttribute("data-depth")) || 0.5;
      const movement = currentScroll * depth;
      layer.style.transform = `translateY(${movement}px)`;
    });

    // Fade in the temple layer
    if (templeLayer) {
      const templeOpacity = Math.min(
        (currentScroll / maxScroll) *
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--temple-max-opacity"
            )
          ),
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--temple-max-opacity"
          )
        )
      );
      templeLayer.style.opacity = templeOpacity;
    }

    // Navbar style update based on scroll threshold
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    requestAnimationFrame(smoothUpdate);
  }
  smoothUpdate();

  /* --------------------------------------
     Torch effect that covers entire site
  --------------------------------------- */
  const torchOverlay = document.querySelector(".torch-overlay");

  // On mouse move anywhere in the viewport, update the gradient center
  window.addEventListener("mousemove", (e) => {
    torchOverlay.style.setProperty("--torch-x", `${e.pageX}px`);
    torchOverlay.style.setProperty("--torch-y", `${e.pageY}px`);
  });
});
