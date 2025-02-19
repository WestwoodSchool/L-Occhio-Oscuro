document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const splashButton = document.querySelector('.splash-button');

  // On click, add .zoom class to #splash to start animation
  // After 1.5s, navigate to main.html
  splashButton.addEventListener('click', () => {
    splash.classList.add('zoom');
    setTimeout(() => {
      window.location.href = 'main.html'; // <-- redirect to your main site
    }, 1500);
  });
});
