import { Outlet } from "react-router-dom";
import "./Layout.css";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout({ manageNewQuery }) {
  return (
    <div className="bg-neutral-900">
      <Header manageNewQuery={manageNewQuery} />
      <div className="flex bg-gray-900">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
