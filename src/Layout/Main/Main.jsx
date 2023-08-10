/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./Main.css";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Main({ fetchData, games, page }) {

  const fetchGames = () => {
    fetchData(
      `https://api.rawg.io/api/games?key=455a12d11cd1428aa4233ceb7ddb317f&ordering=-rating&page=${page}`
    );
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <section>
      <InfiniteScroll
        className="flex flex-wrap justify-evenly gap-1 m-auto py-10 max-w-6xl"
        dataLength={games.length}
        next={fetchGames}
        hasMore={true}
        loader={<p>Loading...</p>}
      >
        {games.map((game) => {
          return (
            <div
              className="w-64 sm:min-w-min lg:w-1/4 shadow-lg rounded-md"
              key={games.indexOf(game)}
            >
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
      </InfiniteScroll>
    </section>
  );
}
