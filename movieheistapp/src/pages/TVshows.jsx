import React from "react";
import TVshowSection from "../components/TV/TVshowSection";
import AppNavigation from "../components/AppNavigation";
import Rows from "../components/Movies/Rows";
import endpoints from "../utils/FetchMovies";

const TVshows = () => {
  return (
    <div>
      <AppNavigation></AppNavigation>
      <TVshowSection></TVshowSection>
      <Rows title="Popular" url={endpoints.TVpopular}></Rows>
      <Rows title="Upcoming" url={endpoints.TVupcoming}></Rows>
      <Rows title="Action" url={endpoints.TVaction}></Rows>
      <Rows title="Top Rated" url={endpoints.TVtopRated}></Rows>
      <Rows title="Trending" url={endpoints.TVtrending}></Rows>
      <Rows title="Horror" url={endpoints.TVhorror}></Rows>
    </div>
  );
};

export default TVshows;
