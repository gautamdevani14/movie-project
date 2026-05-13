import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import Loading from "../components/Loading.jsx";
import Horizontalcards from "../partials/Horizontalcards.jsx";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  console.log(info);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.profile_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-fit sm:px-[10%] px-[8%]"
    >
      {/* {part-1 navigation} */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl ">
        <Link
          onClick={() => goback()}
          className="cursor-pointer hover:scale-150 mr-4 ri-arrow-left-line"
        ></Link>
        <a
          target="_blank"
          className="hover:scale-150"
          href={info.detail.homepage}
        >
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          className="hover:scale-150"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          className="hover:scale-150"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          IMDB
        </a>
      </nav>

      {/* {part-2 poster and details} */}
      <div className="w-full sm:flex sm:flex-row flex-col">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] sm:h-[55vh] object-center rounded-sm"
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt=""
        />

        <div className="content sm:ml-[5%] sm:mt-0 mt-7 text-white">
          <h1 className="sm:text-5xl text-4xl text-white font-black">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="sm:text-3xl text-2xl font-bold text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex text-zinc-100 items-center gap-x-5 mt-2 mb-4">
            <span className="right-[-6%] bottom-[30%] rounded-full bg-yellow-600 text-xl font-semibold text-white sm:w-[5vh] w-[4vh] sm:h-[5vh] h-[4vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="w-15 font-semibold sm:text-2xl text-[4.5vw] sm:leading-6 leading-5">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mt-3 mb-3">Overview</h1>
          <p className="w-full text-sm">{info.detail.overview}</p>

          <h1 className="text-2xl mt-3 mb-3">Tv Translated</h1>
          <p className="w-full text-sm mb-10">{info.translations.join(", ")}</p>

          <Link
            className="mt-10 p-5 font-bold bg-(--secondary) rounded-md"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* {part-3 available on  platforms} */}

      <div className="w-[80%] sm:mt-0 mt-[15vw] flex flex-col gap-y-5 mb-5">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* part-4 seasons */}
      <hr className="mt-10 text-white border-none h-0.5 bg-zinc-200" />
      <h1 className="text-white text-3xl font-semibold mt-5 ml-5">Seasons</h1>
      <div className="w-full mb-5 p-5 flex gap-5 overflow-y-hidden ">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div className="sm:w-[15vh] w-[10vh] mr-[10%]">
              <img
                key={i}
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]  sm:min-w-[15vw] min-w-[30vw] h-[25vh] sm:h-[40vh] object-center rounded-sm"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                alt=""
              />
              <h1 className="sm:text-2xl text-zinc-400 mt-3 font-semibold">
                {s.name}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="sm:text-3xl text-white font-black text-center">
            Nothing to Show
          </h1>
        )}
      </div>

      {/* part-5 Recommendations and similar sruff */}
      <hr className="mt-10 text-white border-none h-0.5 bg-zinc-200" />
      <h1 className="text-white text-3xl font-semibold mt-5 ml-5">
        Recommendations & Similar Stuff
      </h1>
      <Horizontalcards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
