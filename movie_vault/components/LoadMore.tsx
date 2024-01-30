"use client";

import { fetchMovie } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard, { MovieProp } from "./MovieCard";

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<MovieProp[]>([]);

  useEffect(() => {
    if (inView) {
      fetchMovie(page).then((res) => {
        setData([...data, ...res]);
      });
      page++;
    }
  }, [inView, data]);

  return (
    <>
      <section
        ref={ref}
        className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10"
      >
        {data.map((item: MovieProp, index: number) => (
          <MovieCard key={item.id} movie={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
