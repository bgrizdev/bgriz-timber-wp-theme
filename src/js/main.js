const fadeLogo = () => {
    let pos = window.scrollY;
    let hero = document.getElementById('hero').getBoundingClientRect().height;
    let logo = document.getElementById('banner-logo');
    //let downArrow = document.getElementById('down-arrow');

    let windowBottom = window.scrollY + window.innerHeight;
    let elementTop = document.querySelector(".scroll-content").getBoundingClientRect().top + window.scrollY;
    let pixel = windowBottom - elementTop;

    if (logo) {
        if (pos <= hero) {
            var op = 1 - pos / hero;
        } else {
            op = 0;
        }
        logo.style.opacity = op;
        if (elementTop > pixel) {
            logo.style.marginBottom = pixel + 'px';
        }
        //if (downArrow) {
        //    downArrow.style.opacity = op;
        //}
    }
};


document.addEventListener("DOMContentLoaded", function() {

    window.addEventListener('scroll', fadeLogo);

    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const sticky = 'sticky';
    const nosticky = 'not-sticky';
    const contactButton = document.getElementById('contactButton');

    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // Downscroll
        header.classList.remove(sticky);
        header.classList.add(nosticky);
        contactButton.style.transform = 'translateX(0%)';
      } else {
        // Upscroll
        header.classList.remove(nosticky);
        header.classList.add(sticky);
        contactButton.style.transform = 'translateX(150%)';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    const contactOverlay = document.getElementById('contactOverlay');
    const closeButton = document.getElementById('closeButton');

    contactButton.addEventListener('click', () => {
      contactOverlay.classList.remove('hidden');
    });

    closeButton.addEventListener('click', () => {
      contactOverlay.classList.add('hidden');
    });

    contactOverlay.addEventListener('click', (e) => {
      if (e.target === contactOverlay) {
        contactOverlay.classList.add('hidden');
      }
    });

});


