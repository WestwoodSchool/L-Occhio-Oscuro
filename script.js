// Smooth Scroll Effect for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-In Effect on Scroll using IntersectionObserver
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
      entry.target.style.transform = "translateY(0)";
      entry.target.style.animation = "fadeInUp 1s ease-out";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(50px)";
  section.style.transition = "opacity 1s ease-out, transform 1s ease-out";
  observer.observe(section);
});

// Navbar Background Change on Scroll
window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)";
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.8)";
  }
});

// CTA Button Hover Animation
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("mouseover", function() {
    this.style.boxShadow = "0px 0px 20px rgba(212, 175, 55, 0.6)";
  });
  ctaButton.addEventListener("mouseleave", function() {
    this.style.boxShadow = "none";
  });
}

// Mock Form Submission
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });
}

// Golden Spotlight Effect on Hero Title
document.addEventListener("mousemove", function(e) {
  const mainTitle = document.querySelector(".main-title");
  if (mainTitle) {
    const xPercent = e.clientX / window.innerWidth * 100;
    const yPercent = e.clientY / window.innerHeight * 100;
    const xOffset = (xPercent - 50) / 5;
    const yOffset = (yPercent - 50) / 5;
    mainTitle.style.textShadow = `${xOffset}px ${yOffset}px 30px rgba(212, 175, 55, 0.8)`;
  }
});
