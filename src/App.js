/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setGames([...games, ...data.results]);
      setPage(page + 1);
    } catch (error) {
      return;
    }
  };

  const fetchGamesbyId = async (id) => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games/${id}?key=455a12d11cd1428aa4233ceb7ddb317f`);
      const data = await response.json();
      console.log(id);
      console.log(data)
      setGame(data);
    } catch (error) {
      return;
    }
  };

  const manageExpand = (id) => {
    setCardExpanded(id);
    fetchGamesbyId(id)
    setExpand(!expand);
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
                fetchData={fetchData}
                fetchGamesbyId={fetchGamesbyId}
                game={game}
                games={games}
                page={page}
                manageExpand={manageExpand}
                expand={expand}
                cardExpanded={cardExpanded}
                clearResults={clearResults}
              />
            }
          />
          <Route
            exact
            path="search/:query"
            element={<Search games={games} page={page} fetchData={fetchData} />}
          />
          <Route
            exact
            path="new"
            element={<New fetchData={fetchData} games={games} page={page} />}
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
