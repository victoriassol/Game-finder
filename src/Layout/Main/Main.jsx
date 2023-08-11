/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import "./Main.css";
import Card from "Layout/Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Main({
  fetchData,
  fetchGamesbyId,
  games,
  page,
  expand,
  manageExpand,
  cardExpanded,
}) {

  const { contents, isLoading, error } = useSelector((state) => state.game);

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
            <Card
              game={game}
              games={games}
              fetchGamesbyId={fetchGamesbyId}
              manageExpand={manageExpand}
            />
          );
        })}
      </InfiniteScroll>
    </section>
  );
}
