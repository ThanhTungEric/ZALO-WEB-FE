import logo from "./logo.svg";
import "./App.css";
import PhoneBookMenu from "./PhoneBook/PhoneBookMenu";
import MainMenu from "./Menu/MainMenu";
import Login from "./Login/Login";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Switch } from "react-router-dom";

//
import Chat from "./view/Chat";

function App() {

  return (



    <div className="App">
      {/* <PhoneBookMenu /> */}
      {/* <Chat /> */}
      <MainMenu />
      {/* <Login /> */}
    </div>
  );
}

export default App;
