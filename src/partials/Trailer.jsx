import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };

  return (
    <div className="absolute z-100 bg-[rgba(0,0,0,0.9)] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => goback()}
        className="absolute cursor-pointer hover:scale-150 mr-4 ri-close-fill text-3xl text-white top-[5%] right-[5%]"
      ></Link>

      {ytvideo ? (
        <ReactPlayer
          controls
          height={550}
          width={1000}
          src={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        ></ReactPlayer>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
