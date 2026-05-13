import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  asyncloadpeople,
  removepeople,
} from "../store/actions/peopleAction.jsx";
import Loading from "../components/Loading.jsx";
import Horizontalcards from "../partials/Horizontalcards.jsx";
import Dropdown from "../partials/Dropdown.jsx";
import Cards from "../partials/Cards.jsx";

const PeopleDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goback = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const { info } = useSelector((state) => state.people);

  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadpeople(id));

    return () => {
      dispatch(removepeople());
    };
  }, [id]);

  return info ? (
    <div className="px-5 sm:px-[10%] w-screen bg-[#1F1E24] min-h-screen pb-[5%] overflow-x-hidden">
      {/* {part-1 navigation} */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => goback()}
          className="cursor-pointer hover:scale-150 mr-4 ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex flex-col sm:flex-row">
        {/* {part-2 left poster and details} */}
        <div className="w-full sm:w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] 
            h-[50vh] sm:h-[35vh] 
            w-full object-cover object-top rounded-sm"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />

          <hr className="mt-10 mb-5 border-none h-0.5 bg-zinc-500" />

          {/* {social media links} */}
          <div className="text-xl text-white flex gap-x-5 justify-center sm:justify-start">
            <a
              target="_blank"
              className="hover:scale-150 duration-300"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              className="hover:scale-150 duration-300"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              className="hover:scale-150 duration-300"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              className="hover:scale-150 duration-300"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* {personal information} */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Personal Info
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold">
            Known For
          </h1>
          <h1 className="text-zinc-400">
            {info.detail.known_for_department}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Gender
          </h1>
          <h1 className="text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Birthday
          </h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Deathday
          </h1>
          <h1 className="text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className="text-zinc-400">
            {info.detail.place_of_birth}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known As
          </h1>

          <h1 className="text-zinc-400 wrap-break-word">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        {/* {part-3 details and information} */}
        <div className="w-full sm:w-[80%] sm:ml-[5%] mt-10 sm:mt-0">
          <h1 className="text-3xl sm:text-6xl text-zinc-400 font-black my-5 leading-tight">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold">
            Biography
          </h1>

          <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
            {info.detail.biography}
          </p>

          <h1 className="mt-5 text-lg text-zinc-400 font-semibold">
            Known For
          </h1>

          <Horizontalcards data={info.combinedcredits.cast} />

          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5">
            <h1 className="text-xl text-zinc-400 font-semibold">
              Acting
            </h1>

            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div
            className="list-disc text-zinc-400 w-full 
            h-[50vh] mt-5 overflow-x-hidden overflow-y-auto 
            shadow-[rgba(255,255,255,.3)] shadow-xl 
            border-2 border-zinc-700 p-3 sm:p-5 rounded"
          >
            {info[category + "credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-3 sm:p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span className="text-sm sm:text-base">
                    {c.name ||
                      c.title ||
                      c.original_name ||
                      c.original_title}
                  </span>

                  <span className="block text-xs sm:text-sm mt-1">
                    {c.character &&
                      `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PeopleDetails;