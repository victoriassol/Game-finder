/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./New.css";

export default function New() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);

  function getNewAndPastDate() {
    var pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);
    var date = new Date();
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    var pastYear = pastDate.toLocaleString("default", { year: "numeric" });
    var pastMonth = pastDate.toLocaleString("default", { month: "2-digit" });
    var pastDay = pastDate.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + day;
    var formattedPastDate = pastYear + "-" + pastMonth + "-" + pastDay;
    return `${formattedPastDate},${formattedDate}`;
  }
  const newAndPastDate = getNewAndPastDate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=455a12d11cd1428aa4233ceb7ddb317f&dates=${newAndPastDate}&page=${page}`
      );
      const data = await response.json();
      setGames([...games, ...data.results]);
      setPage(page + 1);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <InfiniteScroll
        className="flex flex-wrap justify-evenly gap-1 m-auto py-10 max-w-6xl"
        dataLength={games.length}
        next={fetchData}
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
