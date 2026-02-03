document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.querySelector(".hamburger");
  const sideMenu = document.querySelector(".side-menu");
  const products = document.querySelectorAll(".product-card");
  const searchInput = document.getElementById("searchInput");
  const filterPills = document.querySelectorAll(".pill");
  const sideMenuLinks = document.querySelectorAll(".side-menu a[data-category]");

  /* =========================
     MENU TOGGLE LOGIC
  ========================= */
  const toggleMenu = (state) => {
    const isActive = state !== undefined ? state : !sideMenu.classList.contains("active");
    hamburger.classList.toggle("active", isActive);
    sideMenu.classList.toggle("active", isActive);
  };

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", (e) => {
    if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
      toggleMenu(false);
    }
  });

  /* =========================
     ADVANCED FILTERING (Pills & Side Menu)
  ========================= */
  const applyFilter = (category) => {
    products.forEach(product => {
      const productCat = product.dataset.category;
      if (category === "all" || productCat === category) {
        product.style.display = "block";
        product.style.animation = "fadeIn 0.5s ease forwards";
      } else {
        product.style.display = "none";
      }
    });

    // Update Pill UI
    filterPills.forEach(pill => {
      pill.classList.toggle("active", pill.dataset.filter === category);
    });
  };

  // Click on Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => applyFilter(pill.dataset.filter));
  });

  // Click on Side Menu Categories
  sideMenuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      applyFilter(link.dataset.category);
      toggleMenu(false);
    });
  });

  /* =========================
     REAL-TIME SEARCH
  ========================= */
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();

      products.forEach(product => {
        const title = product.querySelector("h3").innerText.toLowerCase();
        const category = product.dataset.category.toLowerCase();
        
        if (title.includes(query) || category.includes(query)) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  }

  /* =========================
     MOBILE TOUCH OPTIMIZATION
  ========================= */
  let touchStartX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Swipe Right (Open)
    if (touchStartX < 50 && diff < -80) {
      toggleMenu(true);
    }
    // Swipe Left (Close)
    if (diff > 80 && sideMenu.classList.contains("active")) {
      toggleMenu(false);
    }
  }, { passive: true });

});