import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "Layout/Card/Card";

export default function Search({fetchData, games, page}) {
  const { query } = useParams();

  const fetchGames = ()=>{
    fetchData(`https://api.rawg.io/api/games?key=455a12d11cd1428aa4233ceb7ddb317f&search=${query}&ordering=-rating&page=${page}`);
  }

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);


  return (
    <section className="m-auto">
      <h2>Search results for: {query}</h2>
      <InfiniteScroll
        className="flex flex-wrap justify-evenly gap-1 m-auto py-10 max-w-6xl"
        dataLength={games.length}
        next={fetchGames}
        hasMore={true}
        loader={<p>Loading...</p>}
      >
        {games.map((game) => {
          return (
            <Card game={game} games={games}/>
          );
        })}
      </InfiniteScroll>
    </section>
  );
}
