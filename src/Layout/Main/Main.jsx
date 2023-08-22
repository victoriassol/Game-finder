/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState} from "react";

import "./Main.css";
import Card from "Layout/Card/Card";
// import CardExpanded from "Layout/Card/CardExpanded";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetGamesQuery } from "features/apiSlice";

export default function Main({
  fetchData,
  fetchGamesbyId,
  fetchFullGame,
  expand,
  manageExpand,
  cardExpanded,
}) {
  const [page, setPage] = useState(1)

  const {
    data: games,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGamesQuery(page);

  const loadMore = async () => {
    setPage(page + 1)
  };
  console.log(useGetGamesQuery(page));
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <InfiniteScroll
        className="flex flex-wrap justify-evenly gap-1 m-auto py-10 max-w-6xl"
        dataLength={games.results?.length || 0}
        next={loadMore}
        hasMore={true}
        loader={<p>Loading...</p>}
      >
        {games.results.map((game) => (
          <Card
            key={game.id}
            game={game}
            games={games}
            manageExpand={manageExpand}
          />
        ))}
      </InfiniteScroll>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <section>{content}</section>;
}

// return (
//   <section>
//     {expand && (
//       <CardExpanded
//         cardExpanded={cardExpanded}
//         game={game}
//         games={games}
//         fetchGamesbyId={fetchGamesbyId}
//         fetchFullGame={fetchFullGame}
//         manageExpand={manageExpand}
//       />
//     )}
//     <InfiniteScroll
//       className="flex flex-wrap justify-evenly gap-1 m-auto py-10 max-w-6xl"
//       dataLength={games.length}
//       next={fetchGames}
//       hasMore={true}
//       loader={<p>Loading...</p>}
//     >
//       {games.map((game) => {
//         return (
//           <Card
//             game={game}
//             games={games}
//             fetchGamesbyId={fetchGamesbyId}
//             manageExpand={manageExpand}
//           />
//         );
//       })}
//     </InfiniteScroll>
//   </section>
// );
//}
