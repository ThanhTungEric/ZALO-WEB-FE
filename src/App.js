import "./App.css";
import MainMenu from "./Menu/MainMenu";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainMenu />
      </Provider>
    </div>
  );
}

export default App;
