// ===== LOADER =====
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1500);
});

// ===== CURSOR GLOW =====
const cursorGlow = document.querySelector(".cursor-glow");
if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector(".navbar");
if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");
            const children = entry.target.querySelectorAll(".reveal-child");
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.15}s`;
                child.classList.add("active");
            });
        });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("active"));
}

// ===== HERO PARTICLES =====
const particlesContainer = document.querySelector(".hero-particles");
if (particlesContainer) {
    for (let i = 0; i < 30; i += 1) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 6}s`;
        particle.style.width = `${2 + Math.random() * 3}px`;
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll(".counter");
if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const target = Number.parseInt(entry.target.getAttribute("data-target") || "0", 10);
            const suffix = entry.target.getAttribute("data-suffix") || "";
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    entry.target.textContent = `${Math.floor(current).toLocaleString()}${suffix}`;
                    requestAnimationFrame(updateCounter);
                    return;
                }

                entry.target.textContent = `${target.toLocaleString()}${suffix}`;
            };

            updateCounter();
            counterObserver.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    counters.forEach((element) => counterObserver.observe(element));
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
    });
});

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const button = contactForm.querySelector(".submit-btn");
        if (!button) return;

        button.textContent = "送信中...";
        button.disabled = true;

        setTimeout(() => {
            button.textContent = "送信完了";
            button.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";

            setTimeout(() => {
                button.textContent = "送信";
                button.style.background = "";
                button.disabled = false;
                contactForm.reset();
            }, 2500);
        }, 1500);
    });
}

// ===== TILT EFFECT ON SERVICE CARDS =====
if (window.innerWidth > 768) {
    document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}
