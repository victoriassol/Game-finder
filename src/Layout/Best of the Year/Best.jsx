import { React, useState } from "react";

import "./Best.css";
import Games from "Layout/Games/Games";
import { useGetGamesThisYearQuery } from "features/apiSlice";

export default function Best() {
  const [page, setPage] = useState(1);
  const {
    data: games,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGamesThisYearQuery(page);

  const loadMore = async () => {
    setPage(page + 1);
  };
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
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
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <section>{content}</section>;
}
