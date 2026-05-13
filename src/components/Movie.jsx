import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  

  document.title = "TMDB | Movie "+ category.toUpperCase();


  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
        
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshhandler = async () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setpage(1);
      setmovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    refreshhandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full sm:flex sm:flex-row flex-col items-center justify-between">
        <h1 className="text-zinc-400 sm:text-2xl text-xl sm:mt-0 mt-5 font-semibold">
          <i
            onClick={() => goback()}
            className="cursor-pointer mr-4 text-(--secondary) ri-arrow-left-line"
          ></i>
          Movie <small className="text-sm text-zinc-600">({category.toUpperCase()})</small>
        </h1>

        <div className="flex sm:flex-row flex-col items-center sm:gap-[2%] sm:w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
          
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movie
