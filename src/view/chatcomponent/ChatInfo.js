import React from 'react'
import '../../styles/chatcomponent/ChatInfo.css'
import Infor from '../chatinfocomponent/Infor'
import ReminderList from '../chatinfocomponent/ReminderList'
import PhotoList from '../chatinfocomponent/PhotoList'

function ChatInfo({ selectedChat }) {

    return (
        <div className="chat-info-container">
            <div className='d-flex justify-content-center header-chat-info'>
                <p>Thông tin hội thoại</p>
            </div>
            <div className='scroll-list-compoent'>
                <Infor selectedChat={selectedChat} />
                <ReminderList />
                <PhotoList />
            </div>
        </div>
    )
}

export default ChatInfo
