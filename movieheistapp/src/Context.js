import { createContext, useState } from "react";
import { RootURL , key} from "./utils/FetchMovies";
// filgen, fecthsea, setback, setgenre 
const Context = createContext();

export function DataProvider({ child }) {
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([]);
  const [typespace, setTypeSpace] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [backgenre, setBackGenre] = useState(false);
  const [searchloader, setsearchLoader] = useState(true);
  const fetchGenre = async () => {
    const data = await fetch(
      `${RootURL}/genre/movie/list?api_key=${key}&with_origin_country=IN&language=en-US`
    );
    const gen = await data.json();
    setGenres(gen.genres);
  }

  const genreFilter = async () =>{
    const data = await fetch(
      `${RootURL}/discover/movie?api_key=${key}&with_genres=${activegenre}&api_key=${key}&with_origin_country=US&language=en-US`
    );
    const genre = await data.json();
    setMovies(movies.concat(genre.results));
    setTypeSpace("Genres")
  }

  const getSearch = async (search) => {
    const data = await fetch(
      `${RootURL}/search/movie?api_key=${key}&query=${search}&api_key=${key}&with_origin_country=US&language=en-US&include_adult=false`
    );
    const searchedMovies = await data.json();
    setSearchedMovies(searchedMovies.results);
    setTypeSpace(`results for the ${search}`)
  }

  return(
    <Context.Provider
    value={{
        fetchGenre,
        genres,
        setActiveGenre,
        activegenre,
        genreFilter,
        getSearch,
        searchedMovies,
        typespace,
        backgenre,
        movies,
        setMovies,
        searchloader,
        setsearchLoader
    }}>
        {child}
    </Context.Provider>
  );
}



export default Context
