import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const Cards = ({ data, title }) => {
  return (
    <div className="p-[5%] flex gap-8 flex-wrap w-full h-full bg-(--primary)">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative sm:w-[16vw] w-[40vw]"
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] sm:h-[40vh] h-[22vh] sm:object-cover rounded-sm"
            src={c.backdrop_path || c.profile_path || c.poster_path ? `https://image.tmdb.org/t/p/original/${c.backdrop_path || c.profile_path || c.poster_path}` : noimage}
            alt=""
          />
          <h1 className="sm:text-2xl text-[4vw] text-zinc-400 mt-3 font-semibold">
            {c.title || c.name || c.original_name || c.original_title}
          </h1>

          {c.vote_average && (
            <div className=" absolute sm:right-[-6%] right-[-6%] sm:bottom-[30%] bottom-[35%] rounded-full bg-yellow-600 sm:text-xl text-sm font-semibold text-white sm:w-[5vh] w-[3.5vh] h-[3.5vh] sm:h-[5vh] flex justify-center items-center">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
