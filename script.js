// JavaScript for GreenCocoa Website

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Navbar scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("bg-green-950");
      header.classList.add("shadow-lg");
    } else {
      header.classList.remove("bg-green-950");
      header.classList.remove("shadow-lg");
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animated");
      }
    });
  };

  // Add animate-on-scroll class to elements
  const sectionsToAnimate = document.querySelectorAll("section");
  sectionsToAnimate.forEach((section) => {
    section.classList.add("animate-on-scroll");
    section.querySelectorAll("h2, h3, p, .card, .feature-box").forEach((element) => {
      element.classList.add("animate-on-scroll");
    });
  });

  // Run animation check on load and scroll
  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);

  // Counter animation for stats
  const startCounters = function () {
    const counters = document.querySelectorAll(".counter-value");
    const speed = 200;

    counters.forEach((counter) => {
      const animate = function () {
        const value = +counter.getAttribute("data-count");
        const data = +counter.innerText;
        const time = value / speed;

        if (data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        } else {
          counter.innerText = value;
        }
      };

      animate();
    });
  };

  // Start counters when they come into view
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
  }

  // Form validation
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      // Simple validation
      if (nameInput && nameInput.value.trim() === "") {
        isValid = false;
        nameInput.classList.add("border-red-500");
      } else if (nameInput) {
        nameInput.classList.remove("border-red-500");
      }

      if (emailInput) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
          isValid = false;
          emailInput.classList.add("border-red-500");
        } else {
          emailInput.classList.remove("border-red-500");
        }
      }

      if (messageInput && messageInput.value.trim() === "") {
        isValid = false;
        messageInput.classList.add("border-red-500");
      } else if (messageInput) {
        messageInput.classList.remove("border-red-500");
      }

      if (isValid) {
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4";
        successMessage.innerHTML = "<strong>Success!</strong> Your message has been sent. We will contact you soon.";

        contactForm.appendChild(successMessage);
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }

  // Image gallery lightbox
  const galleryImages = document.querySelectorAll("#gallery img");
  if (galleryImages.length > 0) {
    galleryImages.forEach((image) => {
      image.addEventListener("click", function () {
        const lightbox = document.createElement("div");
        lightbox.className = "fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50";

        const lightboxImage = document.createElement("img");
        lightboxImage.src = this.src;
        lightboxImage.className = "max-h-[80vh] max-w-[80vw] object-contain";

        const closeButton = document.createElement("button");
        closeButton.className = "absolute top-4 right-4 text-white text-4xl";
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", function () {
          lightbox.remove();
        });

        lightbox.appendChild(lightboxImage);
        lightbox.appendChild(closeButton);

        // Close lightbox when clicking outside the image
        lightbox.addEventListener("click", function (e) {
          if (e.target === lightbox) {
            lightbox.remove();
          }
        });

        document.body.appendChild(lightbox);
      });
    });
  }

  // Add animation classes to elements
  document.querySelectorAll(".stats-section .counter-container").forEach((el, index) => {
    el.classList.add("animate-on-scroll");
    el.style.animationDelay = `${index * 0.2}s`;
  });

  document.querySelectorAll(".feature-box").forEach((el, index) => {
    el.classList.add("animate-on-scroll");
    el.style.animationDelay = `${index * 0.1}s`;
  });

  // Back to top button
  const createBackToTopButton = function () {
    const button = document.createElement("button");
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = "fixed bottom-6 right-6 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:bg-green-700 hover:scale-110 opacity-0";
    button.id = "back-to-top";

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        button.classList.remove("opacity-0");
        button.classList.add("opacity-100");
      } else {
        button.classList.remove("opacity-100");
        button.classList.add("opacity-0");
      }
    });
  };

  createBackToTopButton();

  // Add parallax effect to hero section
  const heroSection = document.querySelector("section.bg-cover");
  if (heroSection) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    });
  }

  // WhatsApp float button
  const whatsappFloat = document.querySelector(".whatsapp-float");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      whatsappFloat.classList.add("show");
    } else {
      whatsappFloat.classList.remove("show");
    }
  });
});
