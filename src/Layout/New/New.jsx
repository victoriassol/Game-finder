import { React, useState } from "react";

import "./New.css";
import Games from "Layout/Games/Games";
import { useGetGamesThisWeekQuery } from "features/apiSlice";

export default function Best() {
  const [page, setPage] = useState(1);
  const {
    data: games,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGamesThisWeekQuery(page);

  const loadMore = async () => {
    setPage(page + 1);
  };
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <>
        <h1 className="pt-10 text-4xl font-bold text-white">
          This week releases
        </h1>

        <Games
          games={games.results}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          page={page}
          setPage={setPage}
          loadMore={loadMore}
        />
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <section>{content}</section>;
}
