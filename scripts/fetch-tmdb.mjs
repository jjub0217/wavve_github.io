import { mkdir, readFile, writeFile } from "node:fs/promises";
import { API_URL, IMAGE_BASE_URL } from "./imageBaseUrl.js";

const token = process.env.WAVVE_TMDB_TOKEN;
if (!token) throw new Error(".env에 WAVVE_TMDB_TOKEN이 없습니다");

const MOVIE_GENRES = [10749, 35, 9648, 80, 53, 10751, 28]; // 로맨스, 코미디, 미스터리, 범죄, 스릴러, 가족, 액션
const TV_GENRES = [35, 9648, 80, 10751, 10759, 10765]; // 코미디, 미스터리, 범죄, 가족, 액션&어드벤처
// 같은 목록을 한국어(ko-KR)와 일본어(ja-JP)로 두 번 받기 위해 언어를 넣어 주소를 만듦
const tvBase = (lang) =>
  `/discover/tv?language=${lang}&with_origin_country=KR&sort_by=popularity.desc`;
const movieDiscoverBase = (lang) =>
  `/discover/movie?language=${lang}&sort_by=popularity.desc`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const getData = async (customUrl) => {
  const res = await fetch(`${API_URL}${customUrl}`, options);
  if (!res.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
  return res.json();
};

const getResults = async (path, pages = 2) => {
  const responses = await Promise.all(
    Array.from({ length: pages }, (_, i) => getData(`${path}&page=${i + 1}`)),
  );
  return responses.flatMap((res) => res.results);
};

// (4) 영화: 전체 + 장르별, 드라마: 전체 + 장르별
const getRaw = async (lang) => {
  const movieRaw = [
    ...(await getResults(`/movie/now_playing?language=${lang}&region=KR`)),
    ...(
      await Promise.all(
        MOVIE_GENRES.map((id) =>
          getResults(`${movieDiscoverBase(lang)}&with_genres=${id}`),
        ),
      )
    ).flat(),
  ];

  const tvRaw = [
    ...(await getResults(tvBase(lang))),
    ...(
      await Promise.all(
        TV_GENRES.map((id) => getResults(`${tvBase(lang)}&with_genres=${id}`)),
      )
    ).flat(),
  ];

  return { movieRaw, tvRaw };
};

const ko = await getRaw("ko-KR");
const ja = await getRaw("ja-JP");

// 작품 id로 일본어 제목을 찾는 표. 영화와 드라마는 id가 겹칠 수 있어서 따로 만듦
const toTitleTable = (items) => {
  const table = {};
  items.forEach((item) => {
    table[item.id] = item.title ?? item.name;
  });
  return table;
};

const jaMovieTitles = toTitleTable(ja.movieRaw);
const jaTvTitles = toTitleTable(ja.tvRaw);

const manual = JSON.parse(
  await readFile("assets/data/titles_ja_manual.json", "utf8"),
);

const pickJaTitle = (item, jaTitles, manualTitles) => {
  const ja = jaTitles[item.id];
  if (ja && !/[가-힣]/.test(ja)) return ja;
  return manualTitles[item.id] ?? null;
};

const uniqueById = (items) =>
  items.filter(
    (item, index) => items.findIndex((other) => other.id === item.id) === index,
  );

const toItem = (item, jaTitles, manualTitles) => ({
  id: item.id,
  title: item.title ?? item.name,
  title_ja: pickJaTitle(item, jaTitles, manualTitles),
  genre_ids: item.genre_ids,
  popularity: item.popularity,
  release_date: item.release_date ?? item.first_air_date,
  vote_average: item.vote_average,
  image: item.backdrop_path
    ? `${IMAGE_BASE_URL.backdrop}${item.backdrop_path}`
    : null,
  poster: item.poster_path
    ? `${IMAGE_BASE_URL.poster}${item.poster_path}`
    : null,
});

const movies = uniqueById(ko.movieRaw)
  .filter((item) => item.backdrop_path)
  .map((item) => toItem(item, jaMovieTitles, manual.movie));
const dramas = uniqueById(ko.tvRaw)
  .filter((item) => item.poster_path)
  .map((item) => toItem(item, jaTvTitles, manual.tv));

await mkdir("assets/data", { recursive: true });
await writeFile("assets/data/movies.json", JSON.stringify(movies, null, 2));
await writeFile("assets/data/dramas.json", JSON.stringify(dramas, null, 2));
