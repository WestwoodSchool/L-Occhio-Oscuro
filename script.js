document.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splash');
  const splashButton = document.querySelector('.splash-button');
  const mainContent = document.getElementById('main-content');
  
  // Prevent scrolling while splash is active
  document.body.style.overflow = 'hidden';
  
  // On click of the invisible splash button, trigger zoom-in animation
  splashButton.addEventListener('click', function() {
    splash.classList.add('zoom');
    // After animation completes (1.5s), hide the splash screen and reveal the main content
    setTimeout(function() {
      splash.style.display = 'none';
      mainContent.style.display = 'block';
      document.body.style.overflow = 'auto';
    }, 1500);
  });
  
  // Set up fade-in effects for content sections using IntersectionObserver
  const sections = document.querySelectorAll('.content-section');
  const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: "0px"
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.animation = 'fadeInUp 1s ease-out';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
});
