/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Main.css";

export default function Main() {
  const [games, setGames] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`https://api.rawg.io/api/games?key=455a12d11cd1428aa4233ceb7ddb317f&page=${1}`);
    const data = await response.json();
    setGames([...games, ...data.results]);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <section className="flex flex-wrap justify-evenly gap-1 m-auto py-10 max-w-6xl">

      {
        games.map((game) => {
          return (
            <div className="w-64 sm:min-w-min lg:w-1/4 shadow-lg rounded-md">
              <div className="h-40 rounded-md">
                <img
                  className="w-full h-40 rounded-md object-cover "
                  src={game.background_image}
                  alt=""
                />
              </div>
              <div className="p-2">
                <div className="flex justify-between">
                  <h2>{game.name}</h2>
                  <p>{games.indexOf(game) + 1}</p>
                </div>
                <div className="flex justify-between">
                  <p>Release date:</p>
                  <p>{game.released}</p>
                </div>
                <div className="flex justify-between space-x-10">
                  <p>Genre:</p>
                  <p>{game.genres.map((genre) => genre.name + ", ")}</p>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}