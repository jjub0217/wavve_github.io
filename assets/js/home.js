

const createSwiper = (selector, options) => new Swiper(selector, options);

createSwiper(".section_visual .swiper", {
  a11y: commonA11ySettings,
  pagination: { el: ".visual_pagination", type: "fraction" },
  navigation: {
    nextEl: ".section_visual .btn_next",
    prevEl: ".section_visual .btn_prev",
  },
  slidesPerView: "auto",
  centeredSlides: true,
  autoplay: {
    delay: 5000,
  },
  loop: true,
  spaceBetween: 20,
});

createSwiper(".section_event .swiper", {
  a11y: commonA11ySettings,
  slidesPerView: 3,
  pagination: { el: ".pagination" },
  navigation: {
    nextEl: ".section_event .btn_next",
    prevEl: ".section_event .btn_prev",
  },
  spaceBetween: 12,
});

createSwiper(".section_best_artist .swiper", {
  a11y: commonA11ySettings,
  slidesPerView: 3,
  pagination: { el: ".pagination" },
  navigation: {
    nextEl: ".section_best_artist .btn_next",
    prevEl: ".section_best_artist .btn_prev",
  },
  spaceBetween: 12,
});

createSwiper(".section_artist .artist_area .swiper", {
  a11y: commonA11ySettings,
  slidesPerView: 4,
  pagination: { el: ".pagination" },
  navigation: {
    nextEl: ".section_artist .btn_next",
    prevEl: ".section_artist .btn_prev",
  },
  spaceBetween: 12,
});


const uploadMoreBtn = document.querySelectorAll(".more_btn");


uploadMoreBtn.forEach((btn) => {
  btn.onclick = (e) => {
    const isExpanded = e.target.getAttribute("aria-expanded") === "true";
    const hiddenItems = [...e.target.previousElementSibling.children];
    hiddenItems.forEach((item) => {
      if (item.classList.contains("is_hidden")) {
        item.classList.remove("is_hidden");
      }
    });
    e.target.setAttribute("aria-expanded", isExpanded ? "false" : "true");
  };
});

