import React, { useEffect, useState } from "react";
import Sidenav from "../partials/Sidenav";
import Topnav from "../partials/Topnav";
import Header from "../partials/Header";
import axios from "../utils/axios";
import Horizontalcards from "../partials/Horizontalcards";
import Dropdown from "../partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "TMDB | Homepage";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  // NEW STATE
  const [showSidebar, setshowSidebar] = useState(false);

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <>
      {/* SIDENAV */}
      <Sidenav showSidebar={showSidebar} />

      {/* MENU ICON */}
      <i
        onClick={() => setshowSidebar(!showSidebar)}
        className="sm:hidden text-xl ri-menu-2-line absolute left-2 top-5 text-amber-50 cursor-pointer hover:scale-110 z-100"
      ></i>

      <div className="w-full sm:w-[80%] h-full overflow-y-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className="mb-5 px-5 mt-3 flex justify-between items-center">
          <h1 className="sm:text-3xl text-2xl sm:mr-0 mr-10 font-semibold text-zinc-400">
            Trending
          </h1>

          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        <Horizontalcards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;