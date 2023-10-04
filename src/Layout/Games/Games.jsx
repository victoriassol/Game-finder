import "./Games.css";
import { React, useState } from "react";

import Card from "Layout/Card/Card";
import CardExpanded from "Layout/Card/CardExpanded";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Games({
  games,
  isLoading,
  isSuccess,
  isError,
  error,
  loadMore,
}) {
  const [cardExpanded, setCardExpanded] = useState();

  const manageExpand = (id) => {
    setCardExpanded(id);
  };
  const manageNext = (id) => {
    setCardExpanded(id++);
  };
  const managePrev = (id) => {
    setCardExpanded(id++);
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
            manageExpand={manageExpand}
            manageNext={manageNext}
            managePrev={managePrev}
          />
        )}
        <InfiniteScroll
          className={`flex flex-wrap max-w-screen-xl py-10 ${
            cardExpanded && "overflow-hidden fixed"
          }`}
          dataLength={games?.length || 0}
          next={loadMore}
          hasMore={true}
          loader={<p>Loading...</p>}>
          {games?.map((game) => (
            <Card
              key={game.id}
              game={game}
              games={games}
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
