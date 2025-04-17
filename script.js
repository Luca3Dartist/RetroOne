document.addEventListener("DOMContentLoaded", function () {
  // Custom cursor
  const cursorGlow = document.querySelector(".cursor-glow");

  document.addEventListener("mousemove", function (e) {
    requestAnimationFrame(() => {
      cursorGlow.style.opacity = "1";
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  });

  document.addEventListener("mouseleave", function () {
    cursorGlow.style.opacity = "0";
  });

  // Interactive elements cursor effect
  const interactiveElements = document.querySelectorAll(
    "a, button, .feature-card"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", function () {
      cursorGlow.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorGlow.style.opacity = "0.7";
    });

    el.addEventListener("mouseleave", function () {
      cursorGlow.style.transform = "translate(-50%, -50%) scale(1)";
      cursorGlow.style.opacity = "1";
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");
  const heroSection = document.querySelector(".hero");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Parallax effect for hero section
    if (scrollPosition <= heroSection.offsetHeight) {
      heroSection.style.backgroundPositionY = scrollPosition * 0.5 + "px";
    }
  });

  // Navigation active state
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll(".nav-link").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");
    this.classList.toggle("active");
  });

  // Gallery slider
  const galleryTrack = document.querySelector(".gallery-track");
  const gallerySlides = document.querySelectorAll(".gallery-slide");
  const prevButton = document.querySelector(".gallery-arrow.prev");
  const nextButton = document.querySelector(".gallery-arrow.next");
  const dotsContainer = document.querySelector(".gallery-dots");

  let currentIndex = 0;
  let slideWidth = gallerySlides[0].offsetWidth;

  // Create dots for gallery
  gallerySlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("gallery-dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      goToSlide(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".gallery-dot");

  function updateGallery() {
    galleryTrack.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;

    // Update active states
    gallerySlides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateGallery();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % gallerySlides.length;
    updateGallery();
  }

  function prevSlide() {
    currentIndex =
      (currentIndex - 1 + gallerySlides.length) % gallerySlides.length;
    updateGallery();
  }

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  // Resize handler for gallery
  window.addEventListener("resize", function () {
    slideWidth = gallerySlides[0].offsetWidth;
    updateGallery();
  });

  // Automatic sliding for gallery
  let galleryInterval = setInterval(nextSlide, 5000);

  const galleryContainer = document.querySelector(".gallery-container");

  galleryContainer.addEventListener("mouseenter", () => {
    clearInterval(galleryInterval);
  });

  galleryContainer.addEventListener("mouseleave", () => {
    galleryInterval = setInterval(nextSlide, 5000);
  });

  // Button event listeners
  const getStartedBtn = document.getElementById("getStartedBtn");
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const buyBtn = document.getElementById("buyBtn");

  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", function () {
      window.scrollTo({
        top: document.getElementById("features").offsetTop - 80,
        behavior: "smooth",
      });
    });
  }

  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", function () {
      alert("📀 RetroOne Demo Video - Coming Soon!");
    });
  }

  if (buyBtn) {
    buyBtn.addEventListener("click", function () {
      alert(
        "🎮 Thank you for your interest in RetroOne! Pre-orders opening next month."
      );
    });
  }

  // Reveal animations
  const revealElements = document.querySelectorAll(
    ".feature-card, h2, .gallery-slide, .buy-content"
  );

  function reveal() {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 150) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for reveal animations
  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  window.addEventListener("scroll", reveal);

  // Initial reveal call in case elements are already in view
  reveal();
});
