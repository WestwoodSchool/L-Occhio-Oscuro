// Smooth Scroll Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-In Effect on Scroll
const sections = document.querySelectorAll('.content-section');
const options = {
    root: null,
    threshold: 0.2,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, options);

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 1s ease-out, transform 1s ease-out";
    observer.observe(section);
});

// Header Background Change on Scroll
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0, 0, 0, 0.95)";
    } else {
        navbar.style.background = "rgba(0, 0, 0, 0.8)";
    }
});

// CTA Button Hover Animation
document.querySelector(".cta-button").addEventListener("mouseover", function() {
    this.style.boxShadow = "0px 0px 20px rgba(212, 175, 55, 0.6)";
});

document.querySelector(".cta-button").addEventListener("mouseleave", function() {
    this.style.boxShadow = "none";
});

// Form Submission (Mock)
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
});
