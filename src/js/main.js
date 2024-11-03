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

    // Function to add/remove toggle functionality based on screen width
    const setupMenuToggle = () => {
      console.log('setupMenuToggle called');
      const menuToggle = document.getElementById('menu-toggle');
      const mediaQuery = window.matchMedia('(max-width: 768px)');
  
      if (mediaQuery.matches) {
        // Remove any existing listener to prevent multiple bindings
        menuToggle.removeEventListener('click', toggleMenu);
        menuToggle.addEventListener('click', toggleMenu);
      } else {
        // Remove the click event listener when not in mobile view
        menuToggle.removeEventListener('click', toggleMenu);
      }
    };
    // Toggle function for main menu
    const toggleMenu = () => {
      const mainMenuContainer = document.querySelector('.main-menu-container');
      console.log('toggle');
      if (mainMenuContainer.classList.contains('main-menu-container-open')) {
        mainMenuContainer.classList.remove('main-menu-container-open');
          // so that the toggle menu function is called whenever the menu toggle
          // is clicked.
      } else {
        mainMenuContainer.classList.add('main-menu-container-open');
      }
    };

function menuFunctions() {
  const menuItems = document.querySelectorAll('.main-menu .menu-item');
  const menuChildrenContainer = document.getElementById('menu-children-container');
  const menuChildrenContent = document.getElementById('menu-children-content');
  const menuList = menuChildrenContent.querySelector('ul');
  const featuredItem = menuChildrenContent.querySelector('.featured-item');
  const featuredTitle = featuredItem.querySelector('p');
  const featuredImage = featuredItem.querySelector('.featured-item-img');
  const featuredLink = featuredItem.querySelector('a');

  let isInMenuChildren = false;

  menuItems.forEach((item) => {

      const childrenData = item.getAttribute('data-children');
      const parsedChildren = childrenData ? JSON.parse(childrenData) : null;

      if(parsedChildren !== null) {
        item.addEventListener('mouseenter', () => {
  
            // Clear existing menu items
            menuList.innerHTML = '';
  
            if(parsedChildren[1].title && parsedChildren[1].url && parsedChildren[1].thumbnail) {
              featuredTitle.textContent = parsedChildren[1].title;
              featuredItem.href = parsedChildren[1].url;
              featuredImage.src = parsedChildren[1].thumbnail || themeData.themeUrl +'/src/img/2021-logo.png'; // Default or placeholder image if thumbnail is missing
              featuredImage.alt = parsedChildren[1].title;
            }
  
            // Populate the menu list with new sub-items if they exist
            if (parsedChildren && parsedChildren.length) {
  
                parsedChildren.forEach((child) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'child-menu-item';
                    
                    const link = document.createElement('a');
                    if(child.url !== '#') {
                      link.href = child.url;
                      link.className = 'block px-4 py-2';
                      link.textContent = child.title;
                      listItem.appendChild(link);
                    } else {
                      link.href = '#';
                      link.className = 'block px-4 py-2 font-bold underline';
                      link.textContent = child.title;
                      listItem.appendChild(link);
                    }
  
                    // Add event listener to update the featured item on hover
                    listItem.addEventListener('mouseenter', () => {
                        // Update featured item with specific data for this child
                        featuredTitle.textContent = child.title;
                        featuredItem.href = child.url;
                        featuredImage.src = child.thumbnail || themeData.themeUrl +'/src/img/2021-logo.png'; // Default or placeholder image if thumbnail is missing
                        featuredImage.alt = child.title;
                    });
  
                    menuList.appendChild(listItem);
                });
                menuChildrenContainer.classList.add('menu-children-open');
            } else {
                // Hide menu-children container if no children are present
                menuChildrenContainer.classList.remove('menu-children-open');
                menuList.innerHTML = '';
                featuredTitle.textContent = '';
                featuredItem.href = '';
                featuredImage.src = '';
                featuredImage.alt = '';
            }
        });
  
        menuChildrenContainer.addEventListener('mouseenter', () => {
          isInMenuChildren = true;
          menuChildrenContainer.classList.add('menu-children-open');
        });
      
        menuChildrenContainer.addEventListener('mouseleave', () => {
          isInMenuChildren = false;
          menuChildrenContainer.classList.remove('menu-children-open');
          menuList.innerHTML = '';
          featuredTitle.textContent = '';
          featuredItem.href = '';
          featuredImage.src = '';
          featuredImage.alt = '';
        });
  
        document.querySelector('.main-menu').addEventListener('mouseleave', () => {
          setTimeout(() => {
            if (!isInMenuChildren) {
              menuChildrenContainer.classList.remove('menu-children-open');
              menuList.innerHTML = '';
              featuredTitle.textContent = '';
              featuredItem.href = '';
              featuredImage.src = '';
              featuredImage.alt = '';
            }
          }, 100); // Small delay to account for quick transitions
        });
      }

  });

  // Hide menu-children container when mouse leaves the main menu
  document.querySelector('.main-menu').addEventListener('mouseleave', () => {
      menuChildrenContainer.classList.remove('menu-children-open');
  });
}

document.addEventListener("DOMContentLoaded", function() {

    menuFunctions();
    setupMenuToggle();

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


