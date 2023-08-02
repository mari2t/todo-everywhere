import { useDepartureContext } from "../contexts/DepartureContext";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import React, { useState } from "react";

const SearchPlace: React.FunctionComponent = () => {
  const {
    geocodingDestination,
    destinationPosition,
    searchWord,
    setSearchWord,
  } = useDepartureContext();

  const [inputWord, setInputWord] = useState("cafe");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ページリロードを防ぐ
    setSearchWord(inputWord);
  };

  return (
    <div className="flex justify-center ">
      <div
        className=" backdrop-blur-md bg-white bg-opacity-60"
        style={{ width: "50vw", height: "60vh" }}
      >
        <div className="w-full flex text-center justify-center">
          <form onSubmit={handleSubmit} className="flex">
            <input
              className="px-3 py-2 w-2/3 rounded-l-xl"
              type="text"
              value={inputWord}
              placeholder="input search place name (ex cafe)"
              onChange={handleInputChange}
            />
            <button className="text-center bg-white flex items-center rounded-r-xl">
              <IconContext.Provider value={{ color: "#413f3f", size: "2em" }}>
                <FaSearch />
              </IconContext.Provider>
            </button>
          </form>
        </div>
        <iframe
          style={{
            width: "100%",
            height: "90%",
            border: "2px solid gray",
          }}
          className=""
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_API_KEY_g}&q=${searchWord}+in+${geocodingDestination.cityName}+${geocodingDestination.country}&center=${destinationPosition.latitude},${destinationPosition.longitude}&zoom=12`}
        ></iframe>
      </div>
    </div>
  );
};

export default SearchPlace;
