document.addEventListener('DOMContentLoaded', () => {
  /* Smooth Scroll for all anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  /* Fade-In Effect on Scroll using IntersectionObserver */
  const sections = document.querySelectorAll('.content-section');
  const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: "0px"
  };
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        entry.target.style.animation = "fadeInUp 1s ease-out";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach(section => {
    // Initialize with starting values for animation
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
    sectionObserver.observe(section);
  });

  /* Navbar Background Change on Scroll */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)";
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.8)";
    }
  });

  /* Golden Spotlight Effect on Hero Title */
  document.addEventListener('mousemove', (e) => {
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
      const xPercent = e.clientX / window.innerWidth * 100;
      const yPercent = e.clientY / window.innerHeight * 100;
      const xOffset = (xPercent - 50) / 5;
      const yOffset = (yPercent - 50) / 5;
      mainTitle.style.textShadow = `${xOffset}px ${yOffset}px 30px rgba(212, 175, 55, 0.8)`;
    }
  });

  /* Product Modal Interactivity */
  const productItems = document.querySelectorAll('.product-item');
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalClose = document.querySelector('.modal-close');

  productItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title');
      const img = item.getAttribute('data-img');
      const desc = item.getAttribute('data-description');
      
      modalTitle.textContent = title;
      modalImg.src = img;
      modalDescription.textContent = desc;
      
      modal.classList.remove('hidden');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Optional: close modal if clicking outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  /* Mock Contact Form Submission */
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      form.reset();
    });
  }
});
