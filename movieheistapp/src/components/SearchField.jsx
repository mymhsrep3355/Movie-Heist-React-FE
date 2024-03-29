import React, { useContext, useState } from 'react'
import Context from '../Context.js'
import { useNavigate } from 'react-router-dom';


const SearchField = () => {
    const {genreFilter,getSearch,setGenres} = useContext(Context);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [typeTime, setTypeTime] = useState(null);

    const handleSearch = (e) => {
        if(typeTime) clearTimeout(typeTime);

    const NewSepTimeout = setTimeout(() => {
        onKeyUp(search);
    }, 200);
    setTypeTime(NewSepTimeout);

}

const onKeyUp = (search) => {
  // console.log(query)
  if (search !== "") {
      search = search.trim();

    if (search === "") {
      navigate("/");
    } else {
      navigate(`/search/${search}`)
    }
  }
};

  return (
    <>
    <div className="w-full bg-gradient-to-r from-red-600 h-[7rem] md:h-[12rem]">
      <div className='h-full w-full bg-black/30 flex justify-center items-center'>
        <input
          type="search"
          name="searchbar"
          placeholder='Search'
          className='p-3 w-full mx-10 md:w-[50rem] opacity-75 rounded-xl outline-none text-slate-900'
          // onEnter={(e) => handleSearch()}
          onKeyUp={(e) => handleSearch()}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
    </>
  )
}

export default SearchField