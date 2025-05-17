import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App(props) {

  return (
    <div id="screen" className="App">
      <Header userPrincipal={props.loggedInPrincipal} />
      <Footer />
    </div>
  );
}

export default App;