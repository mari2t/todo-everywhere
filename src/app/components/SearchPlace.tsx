import React, { useContext, useState, useEffect } from "react";
import { useDepartureContext } from "../contexts/DepartureContext";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";

//受け取るプロップスの定義
interface SearchPlaceProps {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPlace: React.FC<SearchPlaceProps> = ({
  searchWord,
  setSearchWord,
}) => {
  const { geocodingDestination, destinationPosition } = useDepartureContext();

  return (
    <div className="flex justify-center ">
      <div
        className=" backdrop-blur-md bg-white bg-opacity-40"
        style={{ width: "50vw", height: "60vh" }}
      >
        <div className="w-full flex text-center justify-center">
          <input
            className="px-3 py-2 w-2/3 rounded-l-xl"
            type="text"
            value={searchWord}
            placeholder="input search place name (ex cafe)"
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
          <div className="text-center bg-white flex items-center rounded-r-xl">
            <IconContext.Provider value={{ color: "#413f3f", size: "2em" }}>
              <FaSearch />
            </IconContext.Provider>
          </div>
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
