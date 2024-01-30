"use server";

import { Calistoga } from "next/font/google";

export const fetchMovie = async (page: number) => {
  const api_key = "f09d1b6a0377cbda0bf5e98f5057f5d0";
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  const { results } = data;

  return results;
};
