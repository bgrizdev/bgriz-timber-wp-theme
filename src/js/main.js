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

function menuFunctions() {
  const menuItems = document.querySelectorAll('.main-menu .menu-item');
  const menuChildrenContainer = document.getElementById('menu-children-container');
  const menuChildrenContent = document.getElementById('menu-children-content');
  const menuList = menuChildrenContent.querySelector('ul');
  const featuredItem = menuChildrenContent.querySelector('.featured-item');
  const featuredTitle = featuredItem.querySelector('p');
  const featuredImage = featuredItem.querySelector('img');
  const featuredLink = featuredItem.querySelector('a');

  let isInMenuChildren = false;

  menuItems.forEach((item) => {
      const childrenData = item.getAttribute('data-children');
      const parsedChildren = childrenData ? JSON.parse(childrenData) : null;

      item.addEventListener('mouseenter', () => {
          // Clear existing menu items
          menuList.innerHTML = '';

          // Populate the menu list with new sub-items if they exist
          if (parsedChildren && parsedChildren.length) {
              parsedChildren.forEach((child) => {
                  const listItem = document.createElement('li');
                  listItem.className = 'child-menu-item';
                  
                  const link = document.createElement('a');
                  link.href = child.url;
                  link.className = 'block px-4 py-2';
                  link.textContent = child.title;
                  listItem.appendChild(link);

                  // Add event listener to update the featured item on hover
                  listItem.addEventListener('mouseenter', () => {
                      // Update featured item with specific data for this child
                      featuredTitle.textContent = child.title;
                      featuredLink.href = child.url;
                      featuredImage.src = child.thumbnail || ''; // Default or placeholder image if thumbnail is missing
                      featuredImage.alt = child.title;
                  });

                  menuList.appendChild(listItem);
              });
              menuChildrenContainer.classList.add('menu-children-open');
          } else {
              // Hide menu-children container if no children are present
              menuChildrenContainer.classList.remove('menu-children-open');
              menuList.innerHTML = '';
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
      });

      document.querySelector('.main-menu').addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (!isInMenuChildren) {
            menuChildrenContainer.classList.remove('menu-children-open');
          }
        }, 100); // Small delay to account for quick transitions
      });
  });

  // Hide menu-children container when mouse leaves the main menu
  document.querySelector('.main-menu').addEventListener('mouseleave', () => {
      menuChildrenContainer.classList.remove('menu-children-open');
  });
}

document.addEventListener("DOMContentLoaded", function() {

    menuFunctions();

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


