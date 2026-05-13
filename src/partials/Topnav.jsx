import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import { useEffect } from "react";
import noimage from "/noimage.png";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    getSearches();
  }, [query]);

  

  return (
    <div className="w-[80%] h-[10vh] relative flex  mx-auto items-center">
      
      <i className="sm:text-3xl ml-6 text-xl text-zinc-400 ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] mx-10 sm:p-5  sm:text-xl text-[4.5vw] text-zinc-200 outline-none border-none bg-transparent"
        type="text"
        placeholder="Search anything..."
      />
      {query && (
        <i
          onClick={() => setquery("")}
          className="text-3xl cursor-pointer text-zinc-400 ri-close-fill"
        ></i>
      )}

      <div className="absolute z-100 sm:w-[55%] w-[90%] max-h-[50vh] bg-zinc-200 top-[95%] left-[5%] overflow-auto rounded">
        {searches.map((s, i) => (
          <Link
            // to={`/${s.media_type}/details/${s.id}`}
            to={`/${
  s.media_type === "person" ? "people" : s.media_type
}/details/${s.id}`}
            key={i}
            className="text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 duration-300 p-10 w-full flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="sm:w-[12vh] w-[7vh] h-[7vh] sm:h-[10vh] rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                  : noimage
              }
              alt=""
            />
            <span>{s.title || s.name || s.original_name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
