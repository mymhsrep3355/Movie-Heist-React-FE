import React, { useContext, useEffect } from "react";
import Context from "../Context";
import FilterGenres from "./FilterGenres";
import {motion } from "framer-motion";
import MovieItems from "./Movies/MovieItems";

const GenreLoad = () => {
  const {
    fetchGenre,
    activegenre,
    setActiveGenre,
    genres,
    setMovies,
    genreFilter,
    movies
  } = useContext(Context);

  useEffect(() => {
    setMovies([]);
  }, [activegenre]);

  return (
    <div className=" w-full border-l-gray-800/5 md:p-8 mb-20 md:mb-0">
      <FilterGenres />
      <motion.div
        layout
        className="flex flex-wrap relative justify-evenly md:justify-around"
      >
        <div className=" w-full flex flex-wrap relative justify-evenly md:justify-around ">
           {movies.map((movie) => (
            <MovieItems key={movie.id} movie={movie}></MovieItems>
           ))} 
        </div>
      </motion.div>
    </div>
  );
};

export default GenreLoad;
