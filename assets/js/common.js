const main = document.querySelector(".container");
const skip = document.querySelector(".skip > a");
const header = document.querySelector(".header");
const mainLogo = document.querySelector(".site_logo");
const btnClosePopup = document.querySelector(".btn_close_popup");
const popupBox = document.querySelector(".popup_box");
const tabItemTitles = document.querySelectorAll(".tab_item_title") ?? "";
const selectBoxes = document.querySelectorAll(".select_box") ?? "";
const commonA11ySettings = {
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
};

// document.addEventListener("DOMContentLoaded", () => {
//   if (popupBox.getAttribute("aria-expanded") === "true") {
//     btnClosePopup.focus();
//   }
// })

// popupBox.addEventListener("keydown", (e) => {
//   if (e.key === "Escape") {
//     closePopup();
//   }
// });
// popupBox.addEventListener("click", (e) => {
//   document.addEventListener("keydown", (event) => {
//     if (event.key === "Escape" || event.key === "Esc") {
//       closePopup();
//     }
//   }, { once: true });
// });

// const closePopup = () => {
//   document.body.classList.remove("scroll_hide");
//   popupBox.setAttribute("aria-expanded", "false");
// };

// btnClosePopup.onclick = (e) => {
//   e.target.setAttribute("aria-expanded", "false");
//   closePopup()
// };

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
