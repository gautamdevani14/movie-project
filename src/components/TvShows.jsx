import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TvShows = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  
  const [category, setcategory] = useState("airing_today");
  const [tvshow, settvshow] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  

  document.title = "TMDB | Tv Show "+ category.toUpperCase()
  const getTvshow = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settvshow((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
        
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshhandler = async () => {
    if (tvshow.length === 0) {
      getTvshow();
    } else {
      setpage(1);
      settvshow([]);
      getTvshow();
    }
  };

  useEffect(() => {
    refreshhandler();
  }, [category]);

  return tvshow.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full sm:flex sm:flex-row flex-col items-center justify-between">
        <h1 className="text-zinc-400 sm:text-2xl text-xl sm:mt-0 mt-5 font-semibold">
          <i
            onClick={() => goback()}
            className="cursor-pointer mr-4 text-(--secondary) ri-arrow-left-line"
          ></i>
          Tv Shows <small className="text-sm text-zinc-600">({category.toUpperCase()})</small>
        </h1>

        <div className="flex sm:flex-row flex-col items-center sm:gap-[2%] sm:w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "on_the_air", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
          
        </div>
      </div>

      <InfiniteScroll
        dataLength={tvshow.length}
        next={getTvshow}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tvshow} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default TvShows
