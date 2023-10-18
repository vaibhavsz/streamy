import React, { useState } from "react";
import { toggleMenu } from "../utils/redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { YT_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/redux/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();

  useEffect(() => {
    // API call
    // console.log("search query: ", searchQuery);
    // Debouncing: Make an API call after every key press,
    // but if the difference between 2 API calls is < 200ms (can be customized)
    // decline the API call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        console.log("## searchCache[searchQuery]: ", searchCache[searchQuery]);
        setSearchSuggestions(Object.values(searchCache[searchQuery]));
      } else {
        getSearchSuggestions();
      }
    }, 200);

    /**
     * ex: We are typing iphone pro max
     * key - i
     * - render the component
     * - useEffect();
     * - start timer => make api call after 200
     *
     * key - ip
     * - destroy the component(useEffect return method)
     * - re-render the component
     * - useEffect()
     * - start timer => make api call after 200 ms
     *
     */
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log("search query: ", searchQuery);
    const data = await fetch(YT_SEARCH_API + searchQuery);
    const json = await data.json();
    setSearchSuggestions(json[1]);
    console.log(json);

    // update the cache
    dispatch(
      cacheResults({
        [searchQuery]: [searchSuggestions],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 grid grid-flow-col self-center p-4 shadow-lg bg-white">
      <div className="flex col-span-1">
        <img
          className="h-12 cursor-pointer"
          src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-462145.png?f=webp"
          alt="menu"
          onClick={() => toggleMenuHandler()}
        />
        <img
          className="h-12"
          src="https://images.squarespace-cdn.com/content/v1/5d6fd1b92a7aeb00017966dd/1643050466685-H688CTMLEV3X94DL8H6O/youtube.png"
          alt="youtube"
        />
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-200 hover:bg-gray-300">
            🔍
          </button>
        </div>
        {/* TODO: Optimize searchSuggestions such that it will cache the API data*/}
        {showSuggestions && searchQuery !== "" && (
          <div className="fixed bg-white my-1 py-2 w-[42rem] shadow-lg rounded-lg border border-gray-200">
            <ul>
              {searchSuggestions.map((s) => {
                return (
                  <li
                    key={s}
                    className="py-2 px-5 shadow-sm hover:bg-gray-100 cursor-default"
                  >
                    🔍 {s}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-1">
        <img
          className="h-12"
          src="https://www.shutterstock.com/image-vector/user-icon-person-profile-avatar-260nw-601712213.jpg"
          alt="user"
        />
      </div>
    </div>
  );
};

export default Head;
