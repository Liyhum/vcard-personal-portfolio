'use strict';

// Loading animation
window.addEventListener('load', function() {
  // Hide loading screen
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 600);
    }, 1000);
  }
  
  document.body.classList.add('loaded');
  
  // Add entrance animations to elements
  const animateElements = document.querySelectorAll('.sidebar, article, .navbar');
  animateElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax effect for background
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('body::before');
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar);
  
  // Add animation to sidebar content
  const sidebarContent = sidebar.querySelector('.sidebar-info_more');
  if (sidebarContent) {
    if (sidebar.classList.contains('active')) {
      sidebarContent.style.transform = 'translateY(0)';
      sidebarContent.style.opacity = '1';
    } else {
      sidebarContent.style.transform = 'translateY(-20px)';
      sidebarContent.style.opacity = '0';
    }
  }
});

// Add hover effects to service items
document.querySelectorAll('.service-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.02)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add typing effect to name
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
  const nameElement = document.querySelector('.info-content .name');
  if (nameElement) {
    const originalText = nameElement.textContent;
    setTimeout(() => {
      typeWriter(nameElement, originalText, 150);
    }, 1000);
  }
});

// Add scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-item, .project-item, .testimonials-item').forEach(el => {
  observer.observe(el);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  
  // Add animation to modal
  const modal = document.querySelector('.testimonials-modal');
  if (modal) {
    if (modalContainer.classList.contains('active')) {
      modal.style.transform = 'scale(1)';
      modal.style.opacity = '1';
    } else {
      modal.style.transform = 'scale(1.2)';
      modal.style.opacity = '0';
    }
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
      filterItems[i].style.animation = 'scaleUp 0.5s ease forwards';
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
      filterItems[i].style.animation = 'scaleUp 0.5s ease forwards';
    } else {
      filterItems[i].classList.remove("active");
      filterItems[i].style.animation = 'none';
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
      formBtn.style.transform = 'scale(1.05)';
    } else {
      formBtn.setAttribute("disabled", "");
      formBtn.style.transform = 'scale(1)';
    }

  });
  
  // Add focus effects
  formInputs[i].addEventListener("focus", function() {
    this.parentElement.style.transform = 'translateY(-2px)';
  });
  
  formInputs[i].addEventListener("blur", function() {
    this.parentElement.style.transform = 'translateY(0)';
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        
        // Add entrance animation to active page
        pages[i].style.animation = 'fadeIn 0.6s ease-in-out';
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Add floating animation to social icons
document.querySelectorAll('.social-item .social-link').forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.animation = 'float 1s ease-in-out infinite';
  });
  
  icon.addEventListener('mouseleave', function() {
    this.style.animation = 'none';
  });
});

// Add particle effect on click
document.addEventListener('click', function(e) {
  const particle = document.createElement('div');
  particle.className = 'click-particle';
  particle.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    width: 10px;
    height: 10px;
    background: var(--orange-yellow-crayola);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    animation: particleExplode 0.6s ease-out forwards;
  `;
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 600);
});

// Particle Effect for Background
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resizeCanvas);

  // Particle settings
  const particles = [];
  const PARTICLE_COUNT = Math.floor((width * height) / 4000); // density
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 1.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      alpha: 0.2 + Math.random() * 0.3
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
      // Move
      p.x += p.dx;
      p.y += p.dy;
      // Wrap
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
});

// Dark Mode Toggle + Ripple Animation
window.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const iconMoon = toggleBtn.querySelector('.icon-moon');
  const iconSun = toggleBtn.querySelector('.icon-sun');
  const ripple = document.getElementById('theme-ripple-overlay');

  // Load theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    iconMoon.style.display = 'none';
    iconSun.style.display = 'inline';
  } else {
    body.classList.remove('dark');
    iconMoon.style.display = 'inline';
    iconSun.style.display = 'none';
  }

  toggleBtn.addEventListener('click', (e) => {
    body.classList.add('theme-fade');
    setTimeout(() => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      iconMoon.style.display = isDark ? 'none' : 'inline';
      iconSun.style.display = isDark ? 'inline' : 'none';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, 250);
    setTimeout(() => {
      body.classList.remove('theme-fade');
    }, 500);
  });
});

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes particleExplode {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
  
  .animate-in {
    animation: slideInUp 0.6s ease-out forwards;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  body.loaded .sidebar,
  body.loaded article,
  body.loaded .navbar {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);