import { Outlet } from "react-router";

import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import "./Layout.css";

function Layout({tap, setTap, products, cart, setToken}) {
    return ( 
        <div>
            <Header/>
            <Navbar tap={tap} setTap={setTap} products={products} cart={cart} setToken={setToken} />
            <Outlet/>
            <Footer/>
        </div>
     );
}

export default Layout;