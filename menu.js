document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.querySelector(".hamburger");
  const sideMenu = document.querySelector(".side-menu");
  const menuLinks = document.querySelectorAll(".side-menu a[data-category]");
  const products = document.querySelectorAll(".product");
  const searchInput = document.getElementById("searchInput");

  /* =========================
     HAMBURGER TOGGLE
  ========================= */
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    sideMenu.classList.toggle("active");
  });

  /* =========================
     CLOSE MENU ON OUTSIDE CLICK
  ========================= */
  document.addEventListener("click", function (e) {
    if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
      sideMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  sideMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  /* =========================
     CATEGORY FILTER
  ========================= */
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const category = link.dataset.category;

      products.forEach(function (product) {
        if (category === "all" || product.dataset.category === category) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });

      sideMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  /* =========================
     SEARCH FILTER
  ========================= */
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const value = searchInput.value.toLowerCase();

      products.forEach(function (product) {
        const text = product.innerText.toLowerCase();
        product.style.display = text.includes(value) ? "block" : "none";
      });
    });
  }

  /* =========================
     MOBILE SWIPE MENU
  ========================= */
  let startX = 0;

  document.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", function (e) {
    const endX = e.changedTouches[0].clientX;

    // Swipe right from left edge → OPEN
    if (startX < 40 && endX - startX > 80) {
      sideMenu.classList.add("active");
      hamburger.classList.add("active");
    }

    // Swipe left → CLOSE
    if (startX - endX > 80) {
      sideMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

});
