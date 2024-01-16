import React, { useState } from 'react'
import '../styles/Chat.css'

// component
import ListChat from './chatcomponent/ListChat'
import ChatInfo from './chatcomponent/ChatInfo'
import Message from './chatcomponent/Message'
import ChatIntro from './chatcomponent/ChatIntro'

function Chat() {
    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatItemClick = (chatData) => {
        setSelectedChat(chatData);
    };

    return (
        <div className="chat-container">
            <div className='d-flex justify-content-between chat-container-item'>
                <ListChat onItemClick={handleChatItemClick} />
                {selectedChat ? (
                    <>
                        <Message selectedChat={selectedChat} />
                        <ChatInfo selectedChat={selectedChat}/>
                    </>
                ) : (
                    <ChatIntro />
                )}
            </div>
        </div>
    )
}

export default Chat
