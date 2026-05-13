import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {

  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);


  document.title = "TMDB | Trending " + category.toUpperCase();



  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`,
      );
      // settrending(data.results);
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
      // console.log(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshhandler = async () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      settrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshhandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full sm:flex sm:flex-row flex-col items-center justify-between">
        <h1 className="text-zinc-400 sm:text-2xl text-xl sm:mt-0 mt-5 font-semibold">
          <i
            onClick={() => goback()}
            className="cursor-pointer mr-4 text-(--secondary) ri-arrow-left-line"
          ></i>
          Trending <small className="text-sm text-zinc-600">({category.toUpperCase()})</small>
        </h1>

        <div className="flex sm:flex-row flex-col items-center gap-[2%] sm:w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
