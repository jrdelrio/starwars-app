import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";

import { Home } from "./views/home.jsx";
import { Single } from "./views/single.jsx";
import { SinglePeople } from "./views/single-people";
import injectContext from "./store/appContext.js";

import { Navbar } from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const Layout = () => {
  // const basename = process.env.BASENAME || "";
  const basename = "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/single/:type/:id" element={<SinglePeople />} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
