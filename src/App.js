import logo from "./logo.svg";
import "./App.css";
import PhoneBookMenu from "./PhoneBook/PhoneBookMenu";
import MainMenu from "./Menu/MainMenu";
import Login from "./Login/Login";
import React from "react";
import { Provider } from 'react-redux';
import store from "./ReduxToolkit/Store";

function App() {

  return (



    <div className="App">
      <Provider store={store}>
        <MainMenu />
      </Provider>

    </div>
    // <div className="App">
    //   {/* <PhoneBookMenu /> */}
    //   {/* <Chat /> */}
    //   <MainMenu />
    //   {/* <Login /> */}
    // </div>
  );
}

export default App;
