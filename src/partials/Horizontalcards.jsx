import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import noimage from "/noimage.png";

const Horizontalcards = ({ data }) => {
  return (
    <div className="w-full mb-5 p-5 flex overflow-y-hidden">
      {data.length > 0 ? (
        data.map((d, i) => {
          return (
            <Link
              to={`/${d.media_type}/details/${d.id}`}
              key={i}
              className="sm:min-w-[20%] min-w-[62%] sm:h-[45vh] h-[50vh] bg-zinc-800 rounded-lg mr-5 mb-5"
            >
              <img
                className="w-full h-[50%] object-cover rounded"
                src={d.backdrop_path || d.profile_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path || d.poster_path}`: noimage}
                alt=""
              />
              <div className="text-white p-3 h-[45%] overflow-y-auto">
                <h1 className="text-xl font-black mb-2">
                  {d.title || d.name || d.original_name || d.original_title}
                </h1>
                <p className="">
                  {d.overview.slice(0, 50)}...
                  <Link
                    to={`/${d.media_type}/details/${d.id}`}
                    className="text-blue-400"
                  >
                    more
                  </Link>
                </p>
              </div>
            </Link>
          );
        })
      ) : (
        <h1 className="text-3xl text-white font-black text-center">
          Nothing to Show
        </h1>
      )}
    </div>
  );
};

export default Horizontalcards;
