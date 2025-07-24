  // Initialize AOS
  AOS.init({
    once: true,
    duration: 1000,
  });

  // Typed.js for hero headline
  const typed = new Typed('#typed-text', {
    strings: [
      'Global Dubbing.',
      'Realistic Lip Sync.',
      'AI-Powered Voiceovers.'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // Owner image tilt effect
  const tiltContainer = document.querySelector('.tilt');
  const tiltInner = tiltContainer.querySelector('.tilt-inner');
  tiltContainer.addEventListener('mousemove', e => {
    const rect = tiltContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;
    tiltInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  tiltContainer.addEventListener('mouseleave', () => {
    tiltInner.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

  // Scroll progress bar
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });

  // Portfolio lightbox modal
  const lightbox = document.getElementById('lightbox');
  const lightboxVideo = lightbox.querySelector('video');
  const closeBtn = lightbox.querySelector('.close-btn');
  const videoThumbs = document.querySelectorAll('.video-thumb');

  videoThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-video-src');
      lightboxVideo.src = src;
      lightbox.classList.add('active');
      lightboxVideo.focus();
    });
    thumb.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        thumb.click();
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
    lightboxVideo.src = '';
  });
  closeBtn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeBtn.click();
    }
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeBtn.click();
    }
  });

  // Animated counters
  const counters = document.querySelectorAll('.counter');
  const options = {
    root: null,
    threshold: 0,
    rootMargin: '0px',
  };
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        let count = 0;
        const increment = target / 100;
        const interval = setInterval(() => {
          count += increment;
          if (count >= target) {
            el.textContent = target + (el === counters[1] ? '%' : '');
            clearInterval(interval);
          } else {
            el.textContent = Math.floor(count) + (el === counters[1] ? '%' : '');
          }
        }, 20);
        observer.unobserve(el);
      }
    });
  }, options);
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // Demo video toggle
  const watchDemoBtn = document.getElementById('watch-demo-btn');
  const demoVideo = document.getElementById('demo-video');
  watchDemoBtn.addEventListener('click', () => {
    if (demoVideo.classList.contains('hidden')) {
      demoVideo.classList.remove('hidden');
      demoVideo.scrollIntoView({ behavior: 'smooth' });
      demoVideo.play();
      watchDemoBtn.textContent = 'Hide Demo';
    } else {
      demoVideo.pause();
      demoVideo.classList.add('hidden');
      watchDemoBtn.textContent = 'Watch Demo';
    }
  });

  // Contact form validation
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const nameInput = form.name;
    const emailInput = form.email;
    const messageInput = form.message;

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Name validation
    if (!nameInput.value.trim()) {
      nameError.classList.remove('hidden');
      valid = false;
    } else {
      nameError.classList.add('hidden');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.classList.remove('hidden');
      valid = false;
    } else {
      emailError.classList.add('hidden');
    }

    // Message validation
    if (!messageInput.value.trim()) {
      messageError.classList.remove('hidden');
      valid = false;
    } else {
      messageError.classList.add('hidden');
    }

    if (valid) {
      alert('Thank you for your message! I will get back to you soon.');
      form.reset();
    }
  });

  // Custom cursor
  const cursor = document.getElementById('custom-cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  // Hover effect on interactive elements
  const hoverables = 'a, button, input, textarea, .video-thumb, .hamburger, .close-btn';
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
  