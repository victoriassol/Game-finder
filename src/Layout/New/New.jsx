/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./New.css";
import Card from "Layout/Card/Card";

export default function New({ fetchData, games, page }) {
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

  const fetchGames = async () => {
    fetchData(
      `https://api.rawg.io/api/games?key=455a12d11cd1428aa4233ceb7ddb317f&dates=${newAndPastDate}&page=${page}`
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
          return <Card game={game} games={games} />;
        })}
      </InfiniteScroll>
    </section>
  );
}
