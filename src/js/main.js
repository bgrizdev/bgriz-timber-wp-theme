import '../scss/main.scss';

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
// prevent toggle from double event handler
let isToggleSetup = false;
    // Function to add/remove toggle functionality based on screen width
    function setupMenuToggle() {
      const menuToggle = document.getElementById('menu-toggle');
      const checkbox = menuToggle.querySelector('input[type="checkbox"]');
      const mainMenuContainer = document.querySelector('.main-menu-container');
      const mobileMenuChildrenContent = document.getElementById('mobile-menu-children-content');
      const mobileMenuChildrenContainer = document.getElementById('mobile-menu-children-container');
    
      // Store initial children content
      const initialChildrenContent = mobileMenuChildrenContent.innerHTML;
    
      // Add an event listener only to the outer container, not the checkbox
      menuToggle.addEventListener('click', (e) => {
        // Prevent the checkbox from propagating the click
        if (e.target === checkbox) {
          e.stopPropagation();
          return;
        }
    
        // Toggle the menu open/close classes
        mainMenuContainer.classList.toggle('main-menu-container-open');
        document.body.classList.toggle('no-scroll');
    
        if (mainMenuContainer.classList.contains('main-menu-container-open')) {
          // Restore initial menu content when opening
          if (!mobileMenuChildrenContent.innerHTML.trim()) {
            mobileMenuChildrenContent.innerHTML = initialChildrenContent;
          }
        } else {
          // Clear the mobile menu children content when closing
          mobileMenuChildrenContent.innerHTML = '';
          mobileMenuChildrenContainer.classList.remove('menu-children-open');
        }
      });
    }
    
    

function menuFunctions() {

  const menuItems = document.querySelectorAll('#desktop-nav-main-menu .menu-item');
  const menuChildrenContainer = document.getElementById('menu-children-container');
  const menuChildrenContent = document.getElementById('menu-children-content');
  const menuList = menuChildrenContent.querySelector('ul');
  const featuredItem = menuChildrenContent.querySelector('.featured-item');
  const featuredTitle = featuredItem.querySelector('p');
  const featuredImage = featuredItem.querySelector('.featured-item-img');

  let isInMenuChildren = false;

  menuItems.forEach((item) => {

      const childrenData = item.getAttribute('data-children');
      const parsedChildren = childrenData ? JSON.parse(childrenData) : null;

      if(parsedChildren !== null) {
        item.addEventListener('mouseenter', function() {

            document.querySelectorAll('.menu-item').forEach(menuItem => {
                menuItem.classList.remove('background-enter');
            });

            this.classList.add('background-enter');

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
                listItem.className = 'child-menu-item inline-block';
                
                const link = document.createElement('a');
                link.href = child.url !== '#' ? child.url : '#';
                link.className = child.url !== '#' ? 'block px-4 py-2' : 'block px-4 py-2 font-bold underline';
                link.textContent = child.title;
                listItem.appendChild(link);
            
                // Only add event listener if child.url is not '#'
                if (child.url !== '#') {
                  listItem.addEventListener('mouseenter', () => {
                    // Update featured item with specific data for this child
                    featuredTitle.textContent = child.title;
                    featuredItem.href = child.url;
                    featuredImage.src = child.thumbnail || themeData.themeUrl + '/src/img/2021-logo.png'; // Default or placeholder image if thumbnail is missing
                    featuredImage.alt = child.title;
                  });
                }
            
                menuList.appendChild(listItem);
              });
              menuChildrenContainer.classList.add('menu-children-open');
            }
             else {
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
      
        menuChildrenContainer.addEventListener('mouseleave', (event) => {
          // Check if the mouse moved into the header element
          const relatedTarget = event.relatedTarget;
          const isEnteringHeader = relatedTarget && (relatedTarget.classList.contains('main-menu-container') || relatedTarget.classList.contains('header-inner'));
          
          if (!isEnteringHeader) {
            isInMenuChildren = false;
            menuChildrenContainer.classList.remove('menu-children-open');
            item.classList.remove('background-enter');
            menuList.innerHTML = '';
            featuredTitle.textContent = '';
            featuredItem.href = '';
            featuredImage.src = '';
            featuredImage.alt = '';
          }
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


function mobileMenuFunction() {
  const mobileMenuItems = document.querySelectorAll('#mobile-nav-main-menu .menu-item');
  const mobileMenuChildrenContainer = document.getElementById('mobile-menu-children-container');
  const mobileMenuChildrenContent = document.getElementById('mobile-menu-children-content');
  const mobileMenuList = mobileMenuChildrenContent.querySelector('ul');

  const populateMenu = (parsedChildren) => {
    mobileMenuList.innerHTML = ''; 

    if (parsedChildren && parsedChildren.length) {
      parsedChildren.slice(0, 4).forEach((child) => {
        const mobileListItem = document.createElement('li');
        mobileListItem.className = 'child-menu-item';
    
        const link = document.createElement('a');
        if (child.url !== '#') {
          link.href = child.url;
          link.className = 'block px-4 py-2';
          link.textContent = child.title;
    
          const img = document.createElement('img');
          img.src = child.thumbnail;
          img.alt = child.title;
          link.appendChild(img);
    
          mobileListItem.appendChild(link);
        } else {
          link.href = '#';
          link.className = 'block px-4 py-2 font-bold underline';
          link.textContent = child.title;
    
          mobileListItem.appendChild(link);
        }
    
        mobileMenuList.appendChild(mobileListItem);
      });
    
      mobileMenuChildrenContainer.classList.add('menu-children-open');
    }
    
  };

  // Initialize the menu with the first item containing `data-children`
  const firstItemWithChildren = Array.from(mobileMenuItems).find((item) => item.hasAttribute('data-children'));
  if (firstItemWithChildren) {
    const initialChildrenData = firstItemWithChildren.getAttribute('data-children');
    const initialParsedChildren = initialChildrenData ? JSON.parse(initialChildrenData) : null;

    if (initialParsedChildren) {
      populateMenu(initialParsedChildren);
    }
  }

  // Add event listeners to update the menu on item click
  mobileMenuItems.forEach((item) => {
    const childrenData = item.getAttribute('data-children');
    const parsedChildren = childrenData ? JSON.parse(childrenData) : null;

    if (parsedChildren !== null) {
      item.addEventListener('click', () => {
        populateMenu(parsedChildren);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {

    menuFunctions();
    mobileMenuFunction()
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


