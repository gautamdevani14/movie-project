import React from "react";
import { Link } from "react-router-dom";

const Sidenav = ({ showSidebar }) => {
  return (
    <div
      className={`fixed sm:static z-50 bg-[#1F1E24]
      w-[70%] sm:w-[20%]
      h-screen border-r-2 border-zinc-400 p-10
      duration-300

      ${
        showSidebar ? "left-0" : "-left-full"
      }

      sm:left-0`}
    >
      <h1 className="text-2xl text-white font-bold">
        <i className="text-(--secondary) ri-tv-fill mr-3"></i>
        <span>TMDB</span>
      </h1>

      <nav className="flex flex-col text-xl text-zinc-400">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>

        <Link
          to={"/trending"}
          className="hover:bg-(--secondary) hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-fire-fill"></i>Trending
        </Link>

        <Link
          to={"/popular"}
          className="hover:bg-(--secondary) hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-bard-fill"></i>Popular
        </Link>

        <Link
          to={"/movie"}
          className="hover:bg-(--secondary) hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-movie-2-fill"></i>Movies
        </Link>

        <Link
          to={"/tvshows"}
          className="hover:bg-(--secondary) hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-tv-2-fill"></i>Tv Shows
        </Link>

        <Link
          to={"/people"}
          className="hover:bg-(--secondary) hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="mr-2 ri-team-fill"></i>People
        </Link>
      </nav>

      <hr className="border-none h-px bg-zinc-400" />

      <nav className="flex flex-col text-xl text-zinc-400">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          Website Information
        </h1>

        <Link
          to={"/about"}
          className="hover:bg-(--secondary) hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="ri-information-fill mr-2"></i>
          About TMDB
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;