import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/signup";
import ForgotPassword from "./components/ForgotPassword";
import Recommendations from "./pages/Recommendations";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "./Context";
import Genres from "./components/Genres";
import Help from "./pages/help_user/Help";

import TVshows from "./pages/TVshows";
import MovieDetails from "./components/Movies/MovieDetails.jsx";
import TvDetails from "./components/TV/TvDetails.jsx";
import SearchField from "./components/SearchField.jsx";
import Search from "./pages/Search.jsx";
import SearchPage from "./pages/SearchPage.jsx";
const App = () => {
  return (
    <>
      <DataProvider
        child={
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Home></Home>} />
            <Route path="/movie-details/:id" element={<MovieDetails />} />
            <Route path="/tv" element={<TVshows></TVshows>} />
            <Route path="/tv-details/:id" element={<TvDetails></TvDetails>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/preference" element={<Genres></Genres>}></Route>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/recommended" element={<Recommendations />} />
            <Route path="/help" element={<Help></Help>}></Route>
            <Route path="/search/:search" element={<SearchPage></SearchPage>}></Route>
            <Route path="/search" element={<SearchPage></SearchPage>}></Route>
          </Routes>
        }
      ></DataProvider>
    </>
  );
};

export default App;
