import { React, useState } from "react";

import "./Main.css";
import Card from "Layout/Card/Card";
import CardExpanded from "Layout/Card/CardExpanded";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetGamesQuery } from "features/apiSlice";

export default function Main({
  fetchGamesbyId,
  fetchFullGame,
  manageExpand,
  cardExpanded,
  setCardExpanded,
}) {
  const [page, setPage] = useState(1);
  const {
    data: games,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGamesQuery(page);

  const loadMore = async () => {
    setPage(page + 1);
  };
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <>
        {cardExpanded && (
          <CardExpanded
            cardExpanded={cardExpanded}
            setCardExpanded={setCardExpanded}
            games={games}
            fetchGamesbyId={fetchGamesbyId}
            fetchFullGame={fetchFullGame}
            manageExpand={manageExpand}
          />
        )}
        <InfiniteScroll
          className={`flex flex-wrap justify-evenly gap-1 m-auto py-10 max-w-6xl ${
            cardExpanded && "overflow-hidden fixed"
          }`}
          dataLength={games?.results?.length || 0}
          next={loadMore}
          hasMore={true}
          loader={<p>Loading...</p>}>
          {games?.results.map((game) => (
            <Card
              key={game.id}
              game={game}
              games={games?.results}
              manageExpand={manageExpand}
              cardExpanded={cardExpanded}
            />
          ))}
        </InfiniteScroll>
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <section>{content}</section>;
}
