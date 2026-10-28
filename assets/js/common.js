const main = document.querySelector(".container");
const skip = document.querySelector(".skip > a");
const header = document.querySelector(".header");
const mainLogo = document.querySelector(".site_logo");
const btnClosePopup = document.querySelector(".btn_close_popup");
const popupBox = document.querySelector(".popup_box");
const tabItemTitles = document.querySelectorAll(".tab_item_title") ?? "";
const selectBoxes = document.querySelectorAll(".select_box") ?? "";

const getA11ySettings = (section) => {
  const commonA11ySettings = {
    enabled: true,
    // containerMessage: getText(`swiper.container${section}`),
    slideLabelMessage: getText("swiper.slideLabel"),
    firstSlideMessage: getText("swiper.first"),
    lastSlideMessage: getText("swiper.last"),
    paginationBulletMessage: getText("swiper.bullet"),
    containerRoleDescriptionMessage: getText("swiper.containerRole"),
    itemRoleDescriptionMessage: getText("swiper.itemRole"),
    containerRole: "region",
    slideRole: "listitem",
  };

  return {
    ...commonA11ySettings,
    containerMessage: getText(`swiper.container${section}`),
  };
};

const swipers = [];

const createSwiper = (selector, section, options) => {
  const swiper = new Swiper(selector, {
    ...options,
    a11y: getA11ySettings(section),
  });
  swipers.push({ swiper, section });
  return swiper;
};

document.addEventListener("langchange", () => {
  swipers.forEach(({ swiper, section }) => {
    const a11y = getA11ySettings(section);

    // 첫 번째, 마지막 슬라이드 알림은 Swiper가 알릴 때마다 이 설정을 읽음
    swiper.params.a11y = { ...swiper.params.a11y, ...a11y };

    // 슬라이드 묶음 전체
    swiper.el.setAttribute("aria-label", a11y.containerMessage);
    swiper.el.setAttribute(
      "aria-roledescription",
      a11y.containerRoleDescriptionMessage,
    );

    swiper.slides.forEach((slide, index) => {
      const number = swiper.params.loop
        ? Number(slide.dataset.swiperSlideIndex) + 1
        : index + 1;

      const label = a11y.slideLabelMessage
        .replace("{{index}}", number)
        .replace("{{slidesLength}}", swiper.slides.length);
      slide.setAttribute(
        "aria-roledescription",
        a11y.itemRoleDescriptionMessage,
      );
      slide.setAttribute("aria-label", label);
    });
  });
});

if (popupBox) {
  const openPopup = () => {
    popupBox.dataset.open = "true";
    document.body.classList.add("scroll_hide");
    btnClosePopup.focus();
  };

  const closePopup = () => {
    popupBox.dataset.open = "false";
    document.body.classList.remove("scroll_hide");
  };

  btnClosePopup.addEventListener("click", closePopup);

  // Esc 키로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popupBox.dataset.open === "true") closePopup();
  });

  // 어두운 바깥 영역을 누르면 닫기 (안쪽 흰 상자를 누를 땐 안 닫힘)
  popupBox.addEventListener("click", (e) => {
    if (e.target === popupBox) closePopup();
  });

  openPopup();
}

selectBoxes.forEach((selectBox) => {
  const selectBtn = selectBox.querySelector(".select_title") ?? "";
  const optionButtons = selectBox.querySelectorAll(".option_title");

  selectBtn.onclick = (e) => {
    const isExpanded = e.target.getAttribute("aria-expanded") === "true";
    e.target.setAttribute("aria-expanded", isExpanded ? "false" : "true");
  };

  optionButtons.forEach((button) => {
    button.onclick = (e) => {
      optionButtons.forEach((btn) =>
        btn.setAttribute("aria-selected", "false"),
      );
      e.target.setAttribute("aria-selected", "true");
      selectBtn.textContent = e.target.textContent;
      selectBtn.setAttribute("aria-expanded", "false");
      selectBtn.style.color = "#fff";
    };
  });
});

document.addEventListener("click", (e) => {
  selectBoxes.forEach((selectBox) => {
    if (!selectBox.contains(e.target)) {
      selectBox
        .querySelector(".select_title")
        ?.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  selectBoxes.forEach((selectBox) => {
    selectBox
      .querySelector(".select_title")
      ?.setAttribute("aria-expanded", "false");
  });
});

tabItemTitles.forEach((item) => {
  item.onclick = (e) => {
    e.preventDefault();
    [...tabItemTitles].forEach((item) => {
      if (item === e.target) {
        e.target.setAttribute("aria-selected", "true");
        e.target.focus();
      } else {
        item.setAttribute("aria-selected", "false");
      }
    });
  };
});

document.querySelectorAll("[data-coach]").forEach((coachTarget) => {
  if (getComputedStyle(coachTarget).position === "static") {
    coachTarget.style.position = "relative";
  }
  coachTarget.insertAdjacentHTML(
    "beforeend",
    `<span class="coach_mark" aria-hidden="true">
       <span class="coach_tip">${coachTarget.dataset.coach}</span>
     </span>`,
  );
});

document.addEventListener("click", (e) => {
  const emptyLink = e.target.closest('a[href=""]');
  if (emptyLink) e.preventDefault();
});
