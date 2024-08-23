const createSwiper = (selector, options) => new Swiper(selector, options);

  createSwiper(".section_visual .swiper", {
    pagination: { el: ".pagination", type: "fraction" },
    slidesPerView: 3,
    spaceBetween: 12,
  });

// const mainVisual = new Swiper(".section_visual .swiper", {
//   // a11y: {
//   //   // enabled: true,
//   //   //   containerMessage: "프로모션 슬라이드 영역입니다.",
//   //   //   slideLabelMessage:
//   //   //     "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
//   //   //   firstSlideMessage: "첫번째 슬라이드입니다.",
//   //   //   lastSlideMessage: "마지막 슬라이드입니다.",
//   //   //   paginationBulletMessage: "{{index}}번째 슬라이드로 이동합니다.",
//   //   //   containerRoleDescriptionMessage: "Carousel",
//   //   //   itemRoleDescriptionMessage: "Slide",
//   //   //   slideRole: "listitem",
//   //   // },
//   //   // navigation: {
//   //   //   nextEl: ".section_event .btn_next",
//   //   //   prevEl: ".section_event .btn_prev",
//   // },
//   pagination: { el: ".pagination", type: "fraction" },
//   slidesPerView: 4,
//   spaceBetween: 12,
// });

const eventVisual = new Swiper(".section_event .swiper", {
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
  slidesPerView: 3,
  pagination: {
    el: ".pagination",
  },
  navigation: {
    nextEl: ".section_event .btn_next",
    prevEl: ".section_event .btn_prev",
  },
  spaceBetween: 12,
});

const bestArtistVisual = new Swiper(".section_best_artist .swiper", {
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
  slidesPerView: 3,
  pagination: {
    el: ".pagination",
  },
  navigation: {
    nextEl: ".section_best_artist .btn_next",
    prevEl: ".section_best_artist .btn_prev",
  },
  spaceBetween: 12,
});

const artistVisual = new Swiper(".section_artist .artist_area .swiper", {
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
  pagination: {
    el: ".pagination",
  },
  navigation: {
    nextEl: ".section_artist .btn_next",
    prevEl: ".section_artist .btn_prev",
  },
  spaceBetween: 12,
});

const pushButtons = document.querySelectorAll(".push_notification_btn");
const selectBoxes = document.querySelectorAll(".select_box");
const uploadMoreBtn = document.querySelectorAll(".more_btn");

pushButtons.forEach((pushButton) => {
  pushButton.onclick = (e) => {
    const isPressed = pushButton.getAttribute("aria-pressed") === "true";
    pushButton.setAttribute("aria-pressed", !isPressed);
  };
});

uploadMoreBtn.forEach((btn) => {
  btn.onclick = (e) => {
    const hiddenItems = [...e.target.previousElementSibling.children];
    hiddenItems.forEach((item) => {
      if (item.classList.contains("is_hidden")) {
        item.classList.remove("is_hidden");
      }
    });
    e.target.previousElementSibling.ariaExpanded = "true";
    e.target.classList.add("is_hidden");
  };
});

selectBoxes.forEach((selectBox) => {
  const selectBtn = selectBox.querySelector(".option_title");
  const optionButtons = selectBox.querySelectorAll('button[role="option"]');

  selectBtn.onclick = (e) => {
    e.target.ariaExpanded =
      e.target.ariaExpanded === "false" ? "true" : "false";
  };

  optionButtons.forEach((button) => {
    button.onclick = (e) => {
      optionButtons.forEach((btn) => (btn.ariaSelected = "false"));
      e.target.ariaSelected = "true";
    };
  });
});
