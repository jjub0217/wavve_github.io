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

// const renderMovies = async () => {
//   const res = await fetch("./assets/data/movies.json");
//   const movies = await res.json();
//   const list = document.querySelector("#upload_landscape");

//   console.log(movies);

//   list.innerHTML = movies
//     .map(
//       (item, index) => `
//       <li class="upload_item${index >= 18 ? " is_hidden" : ""}">
//         <a href="" class="link_item">
//           <strong class="upload_title">${item.title}</strong>
//           <div class="image_box">
//             <img src="${item.image}" loading="lazy" width="189" height="106" alt="${item.title} 장면">
//           </div>
//         </a>
//       </li>`,
//     )
//     .join("");
// };

// const renderDramas = async () => {
//   const res = await fetch("./assets/data/dramas.json");
//   const dramas = await res.json();
//   const list = document.querySelector("#upload_portrait");

//   console.log(dramas);

//   list.innerHTML = dramas
//     .map(
//       (item, index) => `
//       <li class="upload_item${index >= 18 ? " is_hidden" : ""}">
//         <a href="" class="link_item">
//           <div class="image_box">
//             <img src="${item.poster}" loading="lazy" width="189" height="106" alt="${item.title} 장면">
//           </div>
//         </a>
//       </li>`,
//     )
//     .join("");
// };

const uploadSections = document.querySelectorAll(".section_upload");

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
      list.innerHTML = `<li class="upload_empty">해당하는 작품이 없습니다.</li>`;
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

  update();
};

// renderMovies();
// renderDramas();

setupUpload({
  section: uploadSections[0],
  listId: "#upload_landscape",
  dataUrl: "./assets/data/movies.json",
  render: (item, index) => `
      <li class="upload_item${index >= 18 ? " is_hidden" : ""}">
        <a href="" class="link_item">
          <strong class="upload_title">${item.title}</strong>
          <div class="image_box">
            <img src="${item.image}" loading="lazy" width="189" height="106" alt="${item.title} 장면">
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
            <img src="${item.poster}" loading="lazy" width="189" height="280" alt="${item.title} 포스터">
          </div>
        </a>
      </li>`,
});
