"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { getImagePath } from "@/src/lib/getImagePath";
import { Movie } from "@/types";

type Props = {
  movies: Movie[];
};

Autoplay.globalOptions = { delay: 8000 }; // slide every 8 seconds

function CarouselBanner({ movies }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);

  return (
    <div ref={emblaRef} className="overflow-hidden relative cursor-pointer">
      <div className="flex">
        {movies.map((movie, index) => (
          <div key={movie.id} className="flex-full min-w-0 relative">
            <Image
              key={movie.id}
              src={getImagePath({
                imagePath: movie.backdrop_path,
                size: "w1920",
              })}
              alt={movie.title}
              fetchPriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
              width={1920}
              height={1080}
              className="object-cover h-[70vh] md-[60vh]"
            />

            <div className="flex flex-col justify-center absolute mt-0 top-0 left-0 z-20 bg-transparent h-full w-full bg-gradient-to-r from-gray-900/90 to-transparent p-10 space-y-5 text-white">
              <h2 className="text-5xl font-bold max-w-xl z-50">
                {movie.title}
              </h2>
              <p className="max-w-xl line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/25 to-gray-300 dark:to-[#1A1C29]"></div>
    </div>
  );
}

export default CarouselBanner;
