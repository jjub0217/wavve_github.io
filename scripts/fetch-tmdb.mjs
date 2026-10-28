import { mkdir, writeFile } from "node:fs/promises";
import { API_URL, IMAGE_BASE_URL } from "./imageBaseUrl.js";
const token = process.env.WAVVE_TMDB_TOKEN;
if (!token) throw new Error(".env에 WAVVE_TMDB_TOKEN이 없습니다");

// const useFetch = (initialUrl = null) => {
//   // let isLoading = false;
//   // let error = null;
//   // let data = null;
const MOVIE_GENRES = [10749, 35, 9648, 80, 53, 10751, 28]; // 로맨스, 코미디, 미스터리, 범죄, 스릴러, 가족, 액션
const TV_GENRES = [35, 9648, 80, 10751, 10759, 10765]; // 코미디, 미스터리, 범죄, 가족, 액션&어드벤처
const TV_BASE =
  "/discover/tv?language=ko-KR&with_origin_country=KR&sort_by=popularity.desc";
const MOVIE_DISCOVER_BASE =
  "/discover/movie?language=ko-KR&sort_by=popularity.desc";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const getData = async (customUrl) => {
  // isLoading = true;
  // try {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${API_URL}${customUrl}`, options);
  if (!res.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
  return res.json();
  // } catch (err) {
  //   // error = err;
  //   return null;
  // } finally {
  //   // isLoading = false;
  // }
};

const getResults = async (path, pages = 2) => {
  const responses = await Promise.all(
    Array.from({ length: pages }, (_, i) => getData(`${path}&page=${i + 1}`)),
  );
  return responses.flatMap((res) => res.results);
};

// (4) 영화: 전체 + 장르별
const movieRaw = [
  ...(await getResults("/movie/now_playing?language=ko-KR&region=KR")),
  ...(
    await Promise.all(
      MOVIE_GENRES.map((id) =>
        getResults(`${MOVIE_DISCOVER_BASE}&with_genres=${id}`),
      ),
    )
  ).flat(),
];

const tvRaw = [
  ...(await getResults(TV_BASE)),
  ...(
    await Promise.all(
      TV_GENRES.map((id) => getResults(`${TV_BASE}&with_genres=${id}`)),
    )
  ).flat(),
];

const uniqueById = (items) =>
  items.filter(
    (item, index) => items.findIndex((other) => other.id === item.id) === index,
  );

const toItem = (item) => ({
  id: item.id,
  title: item.title ?? item.name,
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

const movies = uniqueById(movieRaw)
  .filter((item) => item.backdrop_path)
  .map(toItem);
const dramas = uniqueById(tvRaw)
  .filter((item) => item.poster_path)
  .map(toItem);

await mkdir("assets/data", { recursive: true });
await writeFile("assets/data/movies.json", JSON.stringify(movies, null, 2));
await writeFile("assets/data/dramas.json", JSON.stringify(dramas, null, 2));
