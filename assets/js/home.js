// const createSwiper = (selector, options) => new Swiper(selector, options);

createSwiper(".section_visual .swiper", ".visual", {
  // a11y: getA11ySettings(".visual"),
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

createSwiper(".section_event .swiper", ".event", {
  // a11y: getA11ySettings(".event"),
  slidesPerView: 3,
  pagination: { el: ".pagination" },
  navigation: {
    nextEl: ".section_event .btn_next",
    prevEl: ".section_event .btn_prev",
  },
  spaceBetween: 12,
});

createSwiper(".section_best_artist .swiper", ".collection", {
  // a11y: getA11ySettings(".collection"),
  slidesPerView: 3,
  pagination: { el: ".pagination" },
  navigation: {
    nextEl: ".section_best_artist .btn_next",
    prevEl: ".section_best_artist .btn_prev",
  },
  spaceBetween: 12,
});

createSwiper(".section_artist .artist_area .swiper", ".radio", {
  // a11y: getA11ySettings(".radio"),
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
  // e.target은 버튼 안의 span일 수 있어서 btn(이벤트를 붙인 버튼)을 씀
  btn.onclick = () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    const hiddenItems = [...btn.previousElementSibling.children];
    hiddenItems.forEach((item) => {
      if (item.classList.contains("is_hidden")) {
        item.classList.remove("is_hidden");
      }
    });
    btn.setAttribute("aria-expanded", isExpanded ? "false" : "true");
  };
});

const uploadSections = document.querySelectorAll(".section_upload");

// 일본어일 때 일본어 제목이 있으면 그것을, 없으면 한국어 제목을 씀
const titleOf = (item) =>
  (document.documentElement.lang === "ja" && item.title_ja) || item.title;

const setupUpload = async ({ section, listId, dataUrl, render }) => {
  // 저장될 json 파일 경로 dataUrl
  // dataUrl: "./assets/data/movies.json",
  const res = await fetch(dataUrl);
  const items = await res.json(); // 한 번만 받아 둠
  const state = { genre: "all", sort: "popularity" }; // 지금 고른 값 : 초기값
  const list = document.querySelector(listId);
  const moreBtn = section.querySelector(".more_btn");

  const update = () => {
    const filtered =
      state.genre === "all"
        ? items
        : items.filter((item) => item.genre_ids.includes(Number(state.genre)));

    const sorted = [...filtered].sort((a, b) =>
      state.sort === "release_date"
        ? b.release_date.localeCompare(a.release_date)
        : b[state.sort] - a[state.sort],
    );

    if (sorted.length === 0) {
      list.innerHTML = `<li class="upload_empty">${getText("upload.empty")}</li>`;
    } else {
      list.innerHTML = sorted.slice(0, 24).map(render).join("");
    }
    moreBtn.setAttribute("aria-expanded", "false");
    moreBtn.hidden = sorted.length <= 18;
  };

  section.querySelectorAll(".option_title").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.genre) state.genre = button.dataset.genre;
      if (button.dataset.sort) state.sort = button.dataset.sort;
      update();
    });
  });

  // 언어가 바뀌면 목록을 다시 그림. 더보기로 펼쳐 둔 상태는 그대로 유지
  document.addEventListener("langchange", () => {
    const expanded = moreBtn.getAttribute("aria-expanded") === "true";
    update();
    if (expanded) {
      list
        .querySelectorAll(".is_hidden")
        .forEach((item) => item.classList.remove("is_hidden"));
      moreBtn.setAttribute("aria-expanded", "true");
    }
  });

  update();
};

setupUpload({
  section: uploadSections[0],
  listId: "#upload_landscape",
  dataUrl: "./assets/data/movies.json",
  render: (item, index) => `
      <li class="upload_item${index >= 18 ? " is_hidden" : ""}">
        <a href="" class="link_item">
          <strong class="upload_title">${titleOf(item)}</strong>
          <div class="image_box">
            <img src="${item.image}" loading="lazy" width="189" height="106" alt="${titleOf(item)} ${getText("upload.scene")}">
          </div>
        </a>
      </li>`,
});

setupUpload({
  section: uploadSections[1],
  listId: "#upload_portrait",
  dataUrl: "./assets/data/dramas.json",
  render: (item, index) => `
      <li class="upload_item${index >= 18 ? " is_hidden" : ""}">
        <a href="" class="link_item">
          <div class="image_box">
            <img src="${item.poster}" loading="lazy" width="189" height="280" alt="${titleOf(item)} ${getText("upload.poster")}">
          </div>
        </a>
      </li>`,
});
