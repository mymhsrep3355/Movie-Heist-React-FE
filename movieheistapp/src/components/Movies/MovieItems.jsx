import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const MovieItems = ({ movie }) => {
  const { title, backdrop_path, poster_path, release_date } = movie;
  // console.log(title);
  // console.log(release_date);

  const [like, setlike] = useState(null);
  const navigate = useNavigate();

  // const openMovieDetails = () => {
  //   navigate(`/movie-details/${movie.id}`);
  // };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      layout
      className="inline-block overflow-hidden cursor-pointer m-3 rounded-lg relative w-[150px] sm:w-[200px] md:w-[250px] lg:w-[280px]"
    >
      <button className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl">
        {" "}
        {like ? <AiFillStar /> : <AiOutlineStar />}
      </button>

      <div className="absolute bottom-0 w-full flex justify-between items-end p-3 z-20">
        <h1 className="text-white text-xl font-semibold  break-normal break-words">
          {movie.title || movie.name}
        </h1>

        {(movie.vote_average || 0) > 7 ? (
          <h1 className="font-bold text-green-500 p-2 bg-zinc-900 rounded-full">
            {(movie.vote_average || 0).toFixed(1)}
          </h1>
        ) : (movie.vote_average || 0) > 5.5 ? (
          <h1 className="font-bold text-orange-400 p-2 bg-zinc-900 rounded-full">
            {(movie.vote_average || 0).toFixed(1)}
          </h1>
        ) : (
          <h1 className="font-bold text-red-600 p-2 bg-zinc-900 rounded-full">
            {(movie.vote_average || 0).toFixed(1)}
          </h1>
        )}
      </div>

      <Link
        to={`/movie-details/${movie.id}`}
        className="h-full w-full shadow absolute z-10"
      ></Link>

      <div>
        {movie.poster_path === null ? (
          <img className="img object-cover" src="" />
        ) : (
          <LazyLoadImage
            className="img object-cover"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          />
        )}
      </div>
    </motion.div>
  );
};

export default MovieItems;

//old temp code
// <div className=" inline-block overflow-hidden cursor-pointer m-3 rounded-lg relative w-[150px] sm:w-[200px] md:w-[250px] lg:w-[280px]">
//   {/* <p>{movie.title}</p> */}
//   <img
//     className="block w-full h-48 object-cover object-top "
//     src={backdrops(backdrop_path ?? poster_path, "w500")}
//     alt={movie.title}
//   />
//   <div className=" flex flex-col justify-center top-0 left-0 w-full h-48 absolute bg-black/50 opacity-0 hover:opacity-100">
//     <div className="flex-wrap flex-col flex items-center">
//       <p className=" whitespace-normal md:text-lg font-sans-bold text-lg font-sans">
//         {title}
//       </p>
//       <p className=" whitespace-normal md:text-sm font-sans-bold text-sm font-sans">
//         {release_date}
//       </p>
//     </div>
//     <div className="flex">
//       <button className="flex justify-center">
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
//     <div className="flex">
//       <button onClick={openMovieDetails}>
//         <RiInformationLine size={20} />
//       </button>
//     </div>
//   </div>
// </div>
