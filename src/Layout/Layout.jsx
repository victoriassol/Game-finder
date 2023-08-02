import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout(){
    return (
        <div>
            <Header/>
            <div className="flex">
                <Sidebar/>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}