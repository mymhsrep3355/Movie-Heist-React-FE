import React, { useState } from "react";
import { backdrops } from "../utils/FetchMovies";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const TVitems = ({ show }) => {
  const { name, first_air_date, overview, backdrop_path, vote_average } = show;
  // console.log(show.name);
  const [like, setIsLike] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      layout
      className= "inline-block overflow-hidden cursor-pointer m-3 rounded-lg relative w-[150px] sm:w-[200px] md:w-[250px] lg:w-[280px]"
    >
      <button className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl">
        {" "}
        {like ? <AiFillStar /> : <AiOutlineStar />}
      </button>

      <div className="absolute bottom-0 w-full flex justify-between items-end p-3 z-20">
        <h1 className="text-white text-xl font-semibold  break-normal break-words">
          {show.title || show.name}
        </h1>

        {(show.vote_average || 0) > 7 ? (
          <h1 className="font-bold text-green-500 p-2 bg-zinc-900 rounded-full">
            {(show.vote_average || 0).toFixed(1)}
          </h1>
        ) : (show.vote_average || 0) > 5.5 ? (
          <h1 className="font-bold text-orange-400 p-2 bg-zinc-900 rounded-full">
            {(show.vote_average || 0).toFixed(1)}
          </h1>
        ) : (
          <h1 className="font-bold text-red-600 p-2 bg-zinc-900 rounded-full">
            {(show.vote_average || 0).toFixed(1)}
          </h1>
        )}
      </div>

      <Link
        to={`/tv-details/${show.id}`}
        className="h-full w-full shadow absolute z-10"
      ></Link>

      <div>
        {show.poster_path === null ? (
          <img className="img object-cover" src="" />
        ) : (
          <LazyLoadImage
            className="img object-cover"
            src={"https://image.tmdb.org/t/p/w500" + show.poster_path}
          />
        )}
      </div>
    </motion.div>
    );
  };

export default TVitems;




  // <div className=" inline-block overflow-hidden cursor-pointer m-3 rounded-lg relative w-[150px] sm:w-[200px] md:w-[250px] lg:w-[280px]">
  //   {/* <p>{movie.title}</p> */}
  //   <img
  //     className="block w-full h-48 object-cover object-top "
  //     src={backdrops(backdrop_path ?? poster_path, "w500")}
  //     alt={show.name}
  //   />
  //   <div className=" flex flex-col justify-center top-0 left-0 w-full h-48 absolute bg-black/50 opacity-0 hover:opacity-100">
  //     <div className="flex-wrap flex-col flex items-center">
  //       <p className=" whitespace-normal md:text-lg font-sans-bold text-lg font-sans">
  //         {show.name}
  //       </p>
  //       <p className=" whitespace-normal md:text-sm font-sans-bold text-sm font-sans">
  //         {show.first_air_date}
  //       </p>
  //     </div>
  //     <div className="flex">
  //       <button>
  //         {like ? (
  //           <FaHeart
  //             size={20}
  //             className=" absolute top-5 left-3 text-gray-300 "
  //           ></FaHeart>
  //         ) : (
  //           <FaRegHeart
  //             size={20}
  //             className=" absolute top-5 left-3 text-gray-300 "
  //           ></FaRegHeart>
  //         )}
  //       </button>
  //     </div>
  //   </div>
  // </div>