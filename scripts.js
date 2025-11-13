// scripts.js

document.addEventListener("DOMContentLoaded", function () {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
    // Scroll reveal using IntersectionObserver with staggered animation
    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      const revealTargets = document.querySelectorAll(".panel, .team-card");
  
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const siblings = Array.from(entry.target.parentElement.children);
              const elementIndex = siblings.indexOf(entry.target);
              const delay = elementIndex * 100;
              
              setTimeout(() => {
                entry.target.classList.add("is-visible");
              }, delay);
              
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px"
        }
      );
  
      revealTargets.forEach((el) => observer.observe(el));
    } else {
      const all = document.querySelectorAll(".panel, .team-card");
      all.forEach((el) => el.classList.add("is-visible"));
    }
  
    // Enhanced hover animations with smooth transitions
    const hoverTargets = document.querySelectorAll(".team-card, .btn-primary");
  
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.classList.add("is-hovered");
      });
  
      el.addEventListener("mouseleave", () => {
        el.classList.remove("is-hovered");
      });
      
      // Add subtle tilt effect on mouse move for team cards
      if (el.classList.contains("team-card")) {
        el.addEventListener("mousemove", (e) => {
          if (!el.classList.contains("is-hovered")) return;
          
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / centerY * -2;
          const rotateY = (x - centerX) / centerX * 2;
          
          el.style.transform = `translateY(-3px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        });
        
        el.addEventListener("mouseleave", () => {
          el.style.transform = "";
        });
      }
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
    
    // Smooth scroll for hero CTA button to contact section
    const heroCtaBtn = document.getElementById("hero-cta-btn");
    if (heroCtaBtn) {
      heroCtaBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const contactSection = document.querySelector("#contact");
        
        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    }
    
    // Add subtle parallax effect to hero section
    if (!prefersReducedMotion) {
      const heroSection = document.querySelector("#console");
      
      if (heroSection) {
        let ticking = false;
        
        window.addEventListener("scroll", () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const scrolled = window.pageYOffset;
              const rate = scrolled * 0.3;
              
              if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
                heroSection.style.opacity = 1 - scrolled / 600;
              }
              
              ticking = false;
            });
            
            ticking = true;
          }
        });
      }
    }
  });