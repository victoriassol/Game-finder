import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './Layout/Layout';
import Main from "./Layout/Main/Main";
import New from "./Layout/New/New";
import Reviews from "./Layout/Reviews/Reviews";
import Popular from "./Layout/Popular/Popular";
import Best from "./Layout/Best of the Year/Best";
import LastSearches from "./Layout/Last Searches/LastSearches";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route exact index element={<Main />} />
        <Route exact path="new" element={<New />} />
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
