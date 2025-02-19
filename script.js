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

// Spotlight Effect on Hero Title
document.addEventListener("mousemove", function(e) {
    const title = document.querySelector(".main-title");
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    title.style.textShadow = `${(x - 50) / 5}px ${(y - 50) / 5}px 30px rgba(212, 175, 55, 0.8)`;
});

// Fog Effect
const fogLayer = document.createElement("div");
fogLayer.classList.add("fog-layer");
fogLayer.style.position = "fixed";
fogLayer.style.top = "0";
fogLayer.style.left = "0";
fogLayer.style.width = "100%";
fogLayer.style.height = "100%";
fogLayer.style.pointerEvents = "none";
fogLayer.style.background = "url('fog-overlay.png') repeat";
fogLayer.style.opacity = "0.2";
fogLayer.style.zIndex = "1";
document.body.appendChild(fogLayer);

// Animate Fog Movement
let fogX = 0;
let fogY = 0;
setInterval(() => {
    fogX += 0.2;
    fogY += 0.1;
    fogLayer.style.backgroundPosition = `${fogX}px ${fogY}px`;
}, 50);
