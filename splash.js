document.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splash');
  const splashButton = document.querySelector('.splash-button');

  // On click, trigger the zoom animation and navigate to main.html
  splashButton.addEventListener('click', function() {
    // Add class to start zoom animation (defined in CSS)
    splash.classList.add('zoom');
    // After animation (1.5s), navigate to the main site
    setTimeout(function() {
      window.location.href = 'main.html';
    }, 1500);
  });
});
