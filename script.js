document.addEventListener('DOMContentLoaded', function() {

  const typedElement = document.querySelector('.typed-text');
  if (typedElement) {
      var typed = new Typed('.typed-text', {
          strings: ["Web Developer", "Freelancer", "App Developer", "Creative Developer"],
          typeSpeed: 100, backSpeed: 60, loop: true, backDelay: 1500,
          showCursor: true, cursorChar: '|', smartBackspace: true
      });
  } else { console.error("Typed.js target element (.typed-text) not found."); }

  if (typeof PureCounter === 'function') {
      new PureCounter();
  } else { console.error("PureCounter library is not loaded correctly."); }

  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
      const progressBars = skillsSection.querySelectorAll('.progress-bar');
      const skillObserverOptions = { root: null, rootMargin: '0px', threshold: 0.3 };
      const skillObserverCallback = (entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  progressBars.forEach(bar => {
                      bar.style.width = bar.getAttribute('aria-valuenow') + '%';
                  });
                  observer.unobserve(skillsSection);
              }
          });
      };
      const skillsObserver = new IntersectionObserver(skillObserverCallback, skillObserverOptions);
      skillsObserver.observe(skillsSection);
  } else { console.error("Skills section (.skills-section) not found."); }

  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
      const toggleBackToTop = () => {
          backToTopButton.classList.toggle('active', window.scrollY > 100);
      }
      window.addEventListener('load', toggleBackToTop);
      document.addEventListener('scroll', toggleBackToTop, { passive: true });
      backToTopButton.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  const mainNavLinks = document.querySelectorAll('#sidebar .sidebar-nav .nav-link, #mobile-navbar .navbar-nav .nav-link');

  function setActiveLink(targetId) {
       mainNavLinks.forEach(link => {
           link.classList.remove('active');
           if (link.getAttribute('href') === targetId) {
               link.classList.add('active');
           }
       });
  }

  mainNavLinks.forEach(link => {
      if (link.getAttribute('href') && link.getAttribute('href').startsWith('#') && link.getAttribute('href').length > 1) {
          link.addEventListener('click', function(e) {
              const targetId = this.getAttribute('href');
              const targetElement = document.querySelector(targetId);

              if (targetElement) {
                  e.preventDefault();

                  const navbarMobile = document.querySelector('#mobile-navbar');
                  const navbarMobileHeight = navbarMobile ? navbarMobile.offsetHeight : 0;
                  const elementPosition = targetElement.offsetTop;
                  const scrollTarget = window.innerWidth < 992 ? elementPosition - navbarMobileHeight : elementPosition;

                  window.scrollTo({
                      top: scrollTarget,
                      behavior: 'smooth'
                  });

                  setActiveLink(targetId);

                  const mobileNavCollapse = document.querySelector('#navbarNavMobile');
                  if (mobileNavCollapse && mobileNavCollapse.classList.contains('show')) {
                       const bsCollapse = bootstrap.Collapse.getInstance(mobileNavCollapse) || new bootstrap.Collapse(mobileNavCollapse, {toggle: false});
                       bsCollapse.hide();
                  }
              } else {
                  console.error("Target element not found for link:", targetId);
              }
          });
      } else if (link.getAttribute('href') === '#hero' || link.getAttribute('href') === '#') {
           link.addEventListener('click', (e) => {
               e.preventDefault();
               window.scrollTo({ top: 0, behavior: 'smooth'});
               setActiveLink('#hero');

               const mobileNavCollapse = document.querySelector('#navbarNavMobile');
               if (mobileNavCollapse && mobileNavCollapse.classList.contains('show')) {
                   const bsCollapse = bootstrap.Collapse.getInstance(mobileNavCollapse) || new bootstrap.Collapse(mobileNavCollapse, {toggle: false});
                   bsCollapse.hide();
               }
           });
      }
  });

  const sections = document.querySelectorAll('main section[id]');
  if (sections.length > 0) {
      const observerOptions = { root: null, rootMargin: '-25% 0px -75% 0px', threshold: 0 };
      const observerCallback = (entries, observer) => {
          entries.forEach(entry => {
               const currentId = '#' + entry.target.getAttribute('id');
               const correspondingLink = document.querySelector(`#sidebar .nav-link[href="${currentId}"], #mobile-navbar .nav-link[href="${currentId}"]`); // Check both navs

               if (entry.isIntersecting && correspondingLink) {
                   setActiveLink(currentId); // Use the function to update both
               }
          });
      };
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      sections.forEach(section => observer.observe(section));

       window.addEventListener('scroll', () => {
           if (window.pageYOffset < sections[0].offsetTop * 0.5 ) {
               setActiveLink('#hero');
           }
       }, { passive: true });
  }

});