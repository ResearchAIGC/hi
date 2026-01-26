// Enhanced Main JavaScript functionality - Modular Architecture
class WebsiteFeatures {
  constructor() {
    this.init();
  }

  init() {
    this.initMobileNavigation();
    this.initVideoToggle();
    this.initSmoothScrolling();
    this.initScrollAnimations();
    this.initHeaderScrollEffects();
    this.initCardHoverEffects();
    this.initButtonRippleEffects();
    this.initBackToTopButton();
  }

  // Mobile navigation menu toggle
  initMobileNavigation() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (mobileNavToggle && mobileNavMenu) {
      mobileNavToggle.addEventListener('click', () => {
        const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true' || false;
        mobileNavToggle.setAttribute('aria-expanded', !expanded);
        mobileNavMenu.classList.toggle('hidden');
        this.toggleMobileNavIcon(mobileNavToggle, mobileNavMenu);
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (
          !mobileNavToggle.contains(e.target) &&
          !mobileNavMenu.contains(e.target)
        ) {
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          mobileNavMenu.classList.add('hidden');
          this.toggleMobileNavIcon(mobileNavToggle, mobileNavMenu);
        }
      });

      // Close menu when navigating
      const navLinks = mobileNavMenu.querySelectorAll('a');
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          mobileNavMenu.classList.add('hidden');
        });
      });

      // Keyboard navigation support
      mobileNavToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavToggle.getAttribute('aria-expanded') === 'true') {
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          mobileNavMenu.classList.add('hidden');
          this.toggleMobileNavIcon(mobileNavToggle, mobileNavMenu);
          mobileNavToggle.focus();
        }
      });
    }
  }

  // Toggle mobile navigation icon
  toggleMobileNavIcon(toggle, menu) {
    const icon = toggle.querySelector('svg');
    if (menu.classList.contains('hidden')) {
      // Menu closed - show hamburger icon
      icon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
    } else {
      // Menu open - show close icon
      icon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    }
  }

  // Mouseover video toggle functionality
  initVideoToggle() {
    document.querySelectorAll('.publication-mousecell').forEach((el) => {
      const video = el.querySelector('video');
      const img = el.querySelector('img');
      if (video && img) {
        el.addEventListener('mouseenter', () => {
          video.classList.remove('hidden');
          img.classList.add('hidden');
        });
        el.addEventListener('mouseleave', () => {
          video.classList.add('hidden');
          img.classList.remove('hidden');
        });
      }
    });
  }

  // Smooth scrolling for anchor links
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  // Intersection Observer for scroll animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections and cards
    document
      .querySelectorAll('section, .highlight, .publication-item')
      .forEach((el) => {
        el.classList.add('opacity-0');
        observer.observe(el);
      });
  }

  // Enhanced navigation bar on scroll
  initHeaderScrollEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Add shadow on scroll down
      if (scrollTop > 50) {
        header.classList.add('shadow-md');
        header.classList.remove('shadow-sm');
      } else {
        header.classList.remove('shadow-md');
        header.classList.add('shadow-sm');
      }

      // Hide header on scroll down, show on scroll up
      if (Math.abs(scrollTop - lastScrollTop) > 10) {
        // Threshold for small scrolls
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          header.classList.add('translate-y-[-100%]');
        } else {
          header.classList.remove('translate-y-[-100%]');
        }
      }

      lastScrollTop = scrollTop;
    });
  }

  // Card hover effects
  initCardHoverEffects() {
    document
      .querySelectorAll('.highlight, .publication-item')
      .forEach((card) => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-4px)';
          card.style.transition = 'transform 0.2s ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
        });
      });
  }

  // Button ripple effect
  initButtonRippleEffects() {
    document.querySelectorAll('a, button').forEach((button) => {
      button.addEventListener('click', function (e) {
        if (this.classList.contains('no-underline')) return;

        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background-color: rgba(44, 82, 130, 0.2);
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // Back to top button functionality
  initBackToTopButton() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/></svg>';
    backToTopButton.className =
      'fixed bottom-8 right-8 bg-[var(--color-accent-primary)] text-white p-3 rounded-full shadow-lg opacity-0 invisible transition-all duration-300 ease-in-out hover:bg-[var(--color-accent-primary)]/90 hover:shadow-xl z-50';
    backToTopButton.setAttribute('aria-label', 'Back to top');

    // Add button to body
    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
      } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
      }
    });

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}

// Initialize website features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WebsiteFeatures();
});
