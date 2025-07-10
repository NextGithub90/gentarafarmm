// JavaScript for GreenCocoa Website

document.addEventListener("DOMContentLoaded", function () {
  // WhatsApp Integration for Contact Form
  const sendWhatsAppButton = document.getElementById("sendWhatsApp");
  if (sendWhatsAppButton) {
    sendWhatsAppButton.addEventListener("click", function () {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const product = document.getElementById("product").value;
      const message = document.getElementById("message").value.trim();

      // Validate form
      if (!name || !email || !product || !message) {
        alert("Mohon lengkapi semua field sebelum mengirim pesan");
        return;
      }

      // Format message for WhatsApp
      const whatsappMessage = `Halo, saya ${name} (${email}) tertarik dengan produk ${product}. \n\nPesan: ${message}`;

      // Create WhatsApp URL with phone number and encoded message
      // Replace with your actual WhatsApp business number
      const phoneNumber = "6282218760754"; // Format: country code + number without +
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      // Open WhatsApp in new tab
      window.open(whatsappURL, "_blank");
    });
  }
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

  // Scroll Reveal Animation
  function reveal() {
    const reveals = document.querySelectorAll("section");

    reveals.forEach((reveal) => {
      const windowHeight = window.innerHeight;
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 150;

      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal(); // Initial check

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
        // Close mobile menu if open
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // Stats Counter Animation
  const counters = document.querySelectorAll(".text-5xl");
  counters.forEach((counter) => {
    const target = parseInt(counter.innerText);
    let count = 0;
    const speed = 2000 / target;

    function updateCount() {
      if (count < target) {
        count++;
        counter.innerText = count + (counter.innerText.includes("+") ? "+" : "");
        setTimeout(updateCount, speed);
      }
    }

    // Start counter when element is in view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.unobserve(counter);
      }
    });

    observer.observe(counter);
  });

  // Enhanced Carousel Controls
  const carousel = document.querySelector("#coffeeProductsCarousel");
  if (carousel) {
    const carouselItems = carousel.querySelectorAll(".carousel-item");
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        bootstrap.Carousel.getInstance(carousel).next();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        bootstrap.Carousel.getInstance(carousel).prev();
      }
    }
  }

  // Form Validation and Animation
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.classList.add("bg-green-700");

        // Reset form
        setTimeout(() => {
          form.reset();
          submitBtn.innerText = originalText;
          submitBtn.classList.remove("bg-green-700");
        }, 2000);
      }, 1500);
    });
  }

  // Add certification icons animation class
  document.querySelectorAll(".bg-white img").forEach((img) => {
    img.classList.add("certification-icon");
  });

  // Add social icons animation class
  document.querySelectorAll(".fab").forEach((icon) => {
    icon.parentElement.classList.add("social-icon");
  });
});
