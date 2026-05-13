import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  document.title = "TMDB | About TMDB";

  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <div className="overflow-auto">
      <h1 className="text-zinc-400 px-[5%] mt-5 text-2xl sm:mb-[2%] mb-[10%] font-semibold relative top-0">
        <i
          onClick={() => goback()}
          className="cursor-pointer mr-4 text-(--secondary) ri-arrow-left-line"
        ></i>
        About Us
      </h1>


      <div className="sm:w-[70%] w-[90%] mx-auto flex flex-col gap-5 justify-center">
        <h1 className="sm:text-5xl text-3xl w-full text-center font-semibold text-(--secondary)">
          Let's talk about TMDB
        </h1>

        <h4 className="w-full sm:text-2xl text-xl text-center text-zinc-400">
          The Movie Database (TMDB) is a community built movie and TV database.
          Every piece of data has been added by our amazing community. TMDB's
          strong international focus and breadth of data is largely unmatched
          and something we're incredibly proud of. Put simply, we live and
          breathe community and that's precisely what makes us different.
        </h4>

        <h1 className="sm:text-5xl text-3xl my-[4%] w-full text-center font-semibold text-(--secondary)">
          The TMDB advantage
        </h1>




        <div className="text-zinc-400 flex flex-col gap-10 mb-[5%] text-xl">
          <div className="flex ">
            <span className="text-red-500 mr-5 font-bold">1</span>
            <p className="font-medium">
              Every year since 2008, the number of contributions to our database
              has increased (check out our last years wrap!) With over 1,500,000
              developers and companies using our platform, TMDB has become a
              premiere source for metadata.
            </p>
          </div>

          <div className="flex ">
            <span className="text-red-500 mr-5 font-bold">2</span>
            <p className="font-medium">
              Along with extensive metadata for movies, TV shows and people, we
              also offer one of the best selections of high resolution posters
              and backdrops. On average, over 1,000 images are added every
              single day.
            </p>
          </div>

          <div className="flex ">
            <span className="text-red-500 mr-5 font-bold">3</span>
            <p className="font-medium">
              We're international. While we officially support 39 languages we
              also have extensive regional data. Every single day TMDB is used
              in over 180 countries.
            </p>
          </div>

          <div className="flex ">
            <span className="text-red-500 mr-5 font-bold">4</span>
            <p className="font-medium">
              Our community is second to none. Between our staff and community
              moderators, we're always here to help. We're passionate about
              making sure your experience on TMDB is nothing short of amazing.
            </p>
          </div>

          <div className="flex ">
            <span className="text-red-500 mr-5 font-bold">5</span>
            <p className="font-medium">
              Trusted platform. Every single day our service is used by millions
              of people while we process over 10 billion requests. We've proven
              for years that this is a service that can be trusted and relied
              on.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
