const createSwiper = (selector, options) => new Swiper(selector, options);

createSwiper(".section_schedule .swiper", {
  a11y: commonA11ySettings,
  slidesPerView: 4,
  navigation: {
    nextEl: ".section_schedule .btn_next",
    prevEl: ".section_schedule .btn_prev",
  },
});

const pushButtons = document.querySelectorAll(".push_notification_btn");
const utilLike = document.querySelector(".util_like");

pushButtons.forEach((pushButton) => {
  pushButton.onclick = (e) => {
    const isPressed = pushButton.getAttribute("aria-pressed") === "true";
    pushButton.setAttribute("aria-pressed", isPressed ? "false" : "true");
  };
});

utilLike.onclick = (e) => {
  const isPressed = e.target.getAttribute("aria-pressed") === "true";
  e.target.setAttribute("aria-pressed", isPressed ? "false" : "true");
};
