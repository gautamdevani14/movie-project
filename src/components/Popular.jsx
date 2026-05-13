import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  

  document.title = "TMDB | Popular "+ category.toUpperCase();


  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
        
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshhandler = async () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setpopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshhandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full sm:flex sm:flex-row flex-col  items-center justify-between">
        <h1 className="text-zinc-400 sm:text-2xl text-xl sm:mt-0 mt-5 font-semibold">
          <i
            onClick={() => goback()}
            className="cursor-pointer mr-4 text-(--secondary) ri-arrow-left-line"
          ></i>
          Popular <small className="text-sm text-zinc-600">({category.toUpperCase()})</small>
        </h1>

        <div className="flex sm:flex-row flex-col items-center sm:gap-[2%] sm:w-[80%]">
          <Topnav />
          <Dropdown 
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
          
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
