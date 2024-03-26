// librairies import
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

// styles import
import styles from "./MainMenu.module.css";

// components import
import Chat from "../view/Chat";
import PhoneBookMenu from "../PhoneBook/PhoneBookMenu";
import Login from "../Login/Login";
import Info from "../Profile/Info";

// images import
import chat from "./img/chat.png";
import phoneBook from "./img/phone-book.png";
import setting from "./img/settings.png";
import logout from "./img/logout.png";
import user from "./img/user.png";

const MainMenu = () => {
  // hide menu when user is not logged in
  const [isLoggedIn, setLoggedIn] = useState(true);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  //hide model
  const [isModelOpen, setIsModelOpen] = useState(false);
  const openModel = () => {
    setIsModelOpen(true);
  };

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#e2f4f2", height: "100%" }}>
        {isLoggedIn && (
          <div className={styles.Link}>
            <Link to="/info">
              <img src={user} className={styles.iconUser} alt="User" />
            </Link>
            <Link to="/chat">
              <img src={chat} className={styles.iconChat} alt="Chat" />
            </Link>
            <Link to="/phone-book">
              <img src={phoneBook} className={styles.iconPhoneBook} alt="Phone Book" />
            </Link>
            <Link to="/">
              <img src={setting} className={styles.iconSetting} alt="Setting" />
            </Link>
            <Link to="/login" onClick={() => handleLogout()}>
              <img src={logout} alt="Logout" className={styles.iconSignOut} />
            </Link>
          </div>
        )}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route exact path="/" element={<Chat />} />

            <Route exact path="/info" element={<Info />} />
            <Route path="/phone-book/*" element={<PhoneBookMenu />} />
            <Route path="/chat" element={<Chat />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default MainMenu;
