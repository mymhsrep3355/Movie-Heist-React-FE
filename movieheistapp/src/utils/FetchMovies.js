import axios from 'axios';
export const key = "b93a64480573ce5248c28b200d79d029"; //API KEY

export const RootURL = "https://api.themoviedb.org/3";

// MOVIES

const APIendpoints = {
  popular: `${RootURL}/movie/popular?api_key=${key}`,
  topRated: `${RootURL}/movie/top_rated?api_key=${key}`,
  trending: `${RootURL}/movie/popular?api_key=${key}&language=en-US&page=2`,
  comedy: `${RootURL}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
  upcoming: `${RootURL}/movie/upcoming?api_key=${key}`,
  action: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=18`,
  horror: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=27`,
  romance: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=10749`,
  documentaries: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=99`,

  // TV SHOWS

  TVpopular: `${RootURL}/tv/popular?api_key=${key}&language=en-US&page=1`,
  TVtopRated: `${RootURL}/tv/top_rated?api_key=${key}&language=en-US&page=1`,
  TVtrending: `${RootURL}/trending/tv/week?api_key=${key}`, // Trending TV shows
  TVcomedy: `${RootURL}/search/tv?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
  TVupcoming: `${RootURL}/tv/on_the_air?api_key=${key}&language=en-US&page=1`,
  TVaction: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=18`, // Action TV shows
  TVhorror: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=18`, // Horror TV shows
  TVromance: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=10749`, // Romance TV shows
  TVdocumentaries: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=99`, // Documentary TV shows
};

// export const TVshowsEndpoints = {
//   popular: `${RootURL}/tv/popular?api_key=${key}&language=en-US&page=1`,
//   topRated: `${RootURL}/tv/top_rated?api_key=${key}&language=en-US&page=1`,
//   trending: `${RootURL}/trending/tv/week?api_key=${key}`, // Trending TV shows
//   comedy: `${RootURL}/search/tv?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
//   upcoming: `${RootURL}/tv/on_the_air?api_key=${key}&language=en-US&page=1`,
//   action: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=18`, // Action TV shows
//   horror: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=27`, // Horror TV shows
//   romance: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=10749`, // Romance TV shows
//   documentaries: `${RootURL}/discover/tv?api_key=${key}&language=en-US&with_genres=99`, // Documentary TV shows
// };

export function backdrops(file, size) {
  return `https://image.tmdb.org/t/p/${size}/${file}`; //for posters of movies
}

export default APIendpoints;

// Export individual constants and objects directly
// const key = "b93a64480573ce5248c28b200d79d029";
// const RootURL = "https://api.themoviedb.org/3";

// const APIendpoints = {
//     popular: `${RootURL}/movie/popular?api_key=${key}`,
//     topRated: `${RootURL}/movie/top_rated?api_key=${key}`,
//     trending: `${RootURL}/movie/popular?api_key=${key}&language=en-US&page=2`,
//     comedy: `${RootURL}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
//     upcoming: `${RootURL}/movie/upcoming?api_key=${key}`,
//     action: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=18`,
//     horror: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=27`,
//     romance: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=10749`,
//     documentaries: `${RootURL}/discover/movie?api_key=${key}&language=en-US&with_genres=99`
// };

// const TVshowsEndpoints = {
  
// };

// function backdrops(file, size){
//     return `https://image.tmdb.org/t/p/${size}/${file}`;
// }

// export default {
  //     key,
//     RootURL,
//     APIendpoints,
//     TVshowsEndpoints,
//     backdrops
// };

// export const fetchMovieDetails = async (movieName) => {
//   try {
//    //getting movie detail by name
//     const searchURL = `${RootURL}/search/movie?api_key=${key}&language=en-US&query=${encodeURIComponent(movieName)}&page=1&include_adult=false`;

//    //fetching movie detail
//     const response = await axios.get(searchURL);
//     const movieDetails = response.data.results[0];

//     // Construct the URL for the movie poster
//     const posterURL = movieDetails ? backdrops(movieDetails.poster_path, 'w500') : '';

//     // Return an object containing movie details
//     return {
//       title: movieDetails.title,
//       release_date: movieDetails.release_date,
//       poster_url: posterURL
//     };
//   } catch (error) {
//     console.error('Error fetching movie details:', error);
//     return null;
//   }
// };