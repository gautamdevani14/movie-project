import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      
      className="w-full sm:h-[50vh] flex flex-col items-start justify-end p-[5%]"
    >
      <h1 className="sm:text-5xl text-4xl w-full font-black text-white">
        {data.title || data.name || data.original_name || data.original_title}
      </h1>
      <p className="text-white sm:w-[70%] w-full mt-3">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
      </p>
      <p className="text-white mt-3">
        <span className="mr-10">
          <i className="text-yellow-500 mr-2 ri-megaphone-fill"></i>
          {data.release_date}
        </span>
        <span>
          <i className="mr-2 text-yellow-500 ri-album-fill"></i>
          {data.media_type.toUpperCase()}
        </span>
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-5 mt-5 rounded bg-(--secondary) text-white font-semibold">
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
