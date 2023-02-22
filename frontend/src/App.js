import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComp from "./components/navigation/Navbar";
import Routes from "./components/Routes";
import Footer from "./components/footer/Footer";

import CartGlobal from "./context/CartGlobal";
import background from './assets/background.jpg';

import './css/App.css';

function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem("token") || false); //fetch the token from localStorage, set to false if not available

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CartGlobal>
        <BrowserRouter>
          <NavbarComp
            authed={authed}
            setAuthed={setAuthed}
          />
          <div className="App-background" style={{ backgroundImage: `url(${background})` }}></div>
          <div className="App-container">
            <Routes />
          </div>
        </BrowserRouter>
      </CartGlobal>
      <Footer />
    </>
  )
};

export default App;
