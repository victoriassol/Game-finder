import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout(){
    return (
        <div>
            <Header/>
            <div className="flex">
                <Sidebar/>
                <Main/>
            </div>
            <Footer/>
        </div>
    )
}