const scheduleVisual = new Swiper(".section_schedule .swiper", {
  a11y: {
    enabled: true,
    containerMessage: "프로모션 슬라이드 영역입니다.",
    slideLabelMessage:
      "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
    firstSlideMessage: "첫번째 슬라이드입니다.",
    lastSlideMessage: "마지막 슬라이드입니다.",
    paginationBulletMessage: "{{index}}번째 슬라이드로 이동합니다.",
    containerRoleDescriptionMessage: "Carousel",
    itemRoleDescriptionMessage: "Slide",
    slideRole: "listitem",
  },
  slidesPerView: 4,
  navigation: {
    nextEl: ".section_schedule .btn_next",
    prevEl: ".section_schedule .btn_prev",
  },
});

const tabItems = document.querySelectorAll(".tab_item");
const pushButtons = document.querySelectorAll(".push_notification_btn");
const utilLike = document.querySelector(".util_like");

tabItems.forEach((item) => {
  item.onclick = (e) => {
    e.preventDefault();
    [...tabItems].filter((item) => {
      if (item === e.target.parentNode) {
        e.target.parentNode.classList.add("is_active");
        e.target.parentNode.ariaSelected = "true";
      } else {
        item.classList.remove("is_active");
        item.ariaSelected = "false";
      }
    });
  };
});



pushButtons.forEach((pushButton) => {
  pushButton.onclick = (e) => {
    const isPressed = pushButton.getAttribute("aria-pressed") === "true";
    pushButton.setAttribute("aria-pressed", !isPressed);
  };
});

utilLike.onclick = (e) => {
   e.target.ariaPressed = e.target.ariaPressed === "false" ? "true" : "false";
}