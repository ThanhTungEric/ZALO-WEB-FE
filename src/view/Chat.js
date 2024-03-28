import React, { useState, useRef, useEffect } from "react";
import "../styles/Chat.css";

// component
import ListChat from "./chatcomponent/ListChat";
import ChatInfo from "./chatcomponent/ChatInfo";
import Message from "./chatcomponent/Message";
import ChatIntro from "./chatcomponent/ChatIntro";

////
import { io } from "socket.io-client";

import { useNavigate } from "react-router-dom";
import { host } from '../router/APIRouters';

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);

  
  const navigate = useNavigate();
  const handleChatItemClick = (chatData) => {
    setSelectedChat(chatData);
  };

  const dataSocket = async () => {
    if (!localStorage.getItem('user')) {
      console.log('User not found');
    } else {
      setCurrentUser(
        await JSON.parse(localStorage.getItem('user'))
      );
    }
  };

  useEffect(() => {
    dataSocket();
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);


  return (
    <div className="chat-container">
      <div className="d-flex justify-content-between chat-container-item">
        <ListChat onItemClick={handleChatItemClick} />
        {selectedChat ? (
          <>
            <Message socket={socket} selectedChat={selectedChat} />
            <ChatInfo selectedChat={selectedChat} />
          </>
        ) : (
          <ChatIntro />
        )}
      </div>
    </div>
  );
}

export default Chat;
