/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import Main from "./Layout/Main/Main";
import Search from "./Layout/Search/Search";
import New from "./Layout/New/New";
import Reviews from "./Layout/Reviews/Reviews";
import Popular from "./Layout/Popular/Popular";
import Best from "./Layout/Best of the Year/Best";
import LastSearches from "./Layout/Last Searches/LastSearches";

function App() {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({});
  const [page, setPage] = useState(1);
  const [expand, setExpand] = useState(false);
  const [cardExpanded, setCardExpanded] = useState();

  const manageExpand = (id) => {
    setCardExpanded(id);
  };

  const clearResults = () => {
    setGames([]);
    setPage(1);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout clearResults={clearResults} />}>
          <Route
            exact
            index
            element={
              <Main
                game={game}
                games={games}
                page={page}
                manageExpand={manageExpand}
                expand={expand}
                cardExpanded={cardExpanded}
                setCardExpanded={setCardExpanded}
                clearResults={clearResults}
              />
            }
          />
          <Route
            exact
            path="search/:query"
            element={<Search games={games} page={page} />}
          />
          <Route
            exact
            path="new"
            element={<New games={games} page={page} />}
          />
          <Route exact path="reviews" element={<Reviews />} />
          <Route exact path="popular" element={<Popular />} />
          <Route exact path="best-of-the-year" element={<Best />} />
          <Route exact path="last-searches" element={<LastSearches />} />
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
