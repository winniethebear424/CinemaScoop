import Link from "next/link";
import MovieCard, { IMovieCard } from "./MovieCard";
import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

interface Props {
  movies: any
  type: string
  classification: string
}

const MovieBar = ({ props }: { props: any }) => {
  const [showMovies, setShowMovies] = useState(props.movies.results.slice(0, 4));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHover) {
        setCurrentIndex((currentIndex) => (currentIndex + 4) % props.movies.results.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHover, props.movies.results.length]);

  useEffect(() => {
    let slicedMovies = [];
    for (let i = 0; i < 4; i++) {
      slicedMovies[i] = props.movies.results[(currentIndex + i) % props.movies.results.length];
    }
    setShowMovies(slicedMovies);
  }, [currentIndex, props.movies.results]);

  return (
    <div className="flex flex-col mb-6">
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-medium">{props.classification} Movies</h1>
        <Link
          href={`/movies/${props.type}`}
          className="py-2 px-5 bg-slate-800 text-md font-normal text-white"
        >
          See all
        </Link>
      </div>
      <motion.div
        className="grid grid-cols-4 mt-4 gap-4"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{
          ease: "linear",
          duration: 2,
          x: { duration: 1 }
        }}
      >
        {showMovies.map((movie: IMovieCard) => (
          <MovieCard key={movie?.id} movie={movie} />
        ))}
      </motion.div>


    </div>
  );
};

export default MovieBar;
