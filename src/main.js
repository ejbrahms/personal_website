// eric.brah.ms — v2 "AR / Robotics HUD" interactions

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile menu toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', open);
      hamburgerBtn.setAttribute('aria-expanded', String(open));
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Active section highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
  highlightNavOnScroll();

  // 3. HUD clock — live ticking status readout
  const clockEl = document.getElementById('clock-time');
  if (clockEl) {
    const tick = () => {
      clockEl.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
    };
    tick();
    setInterval(tick, 1000);
  }

  // 4. Scroll target-lock reveal — bounding boxes "lock on" as sections enter view
  const lockTargets = document.querySelectorAll('.lock-target');
  if (lockTargets.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      lockTargets.forEach((el) => el.classList.add('locked'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('locked');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );
      lockTargets.forEach((el) => observer.observe(el));
    }
  }

  // 5. Custom targeting-reticle cursor, with coordinate readout
  const reticle = document.getElementById('reticle');
  const coords = document.getElementById('reticle-coords');
  const heroReticle = document.getElementById('hero-reticle');

  if (reticle && isFinePointer && !prefersReducedMotion) {
    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let active = false;

    window.addEventListener(
      'pointermove',
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (coords) {
          coords.textContent = `X:${String(Math.round(e.clientX)).padStart(4, '0')} Y:${String(Math.round(e.clientY)).padStart(4, '0')}`;
        }
        if (!active) {
          active = true;
          reticle.style.opacity = '1';
        }

        if (heroReticle) {
          const rect = heroReticle.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = ((e.clientX - cx) / window.innerWidth) * -14;
          const dy = ((e.clientY - cy) / window.innerHeight) * -14;
          heroReticle.style.transform = `translate(${dx}px, calc(-50% + ${dy}px))`;
        }
      },
      { passive: true }
    );

    window.addEventListener('pointerleave', () => {
      reticle.style.opacity = '0';
    });

    const raf = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      reticle.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  } else if (reticle) {
    reticle.remove();
  }
});
