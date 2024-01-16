import React, { useEffect, useState } from 'react'
import '../../styles/chatcomponent/ListChat.css'
import Message from './Message'

const listChat = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        avatar: 'https://res.cloudinary.com/dtpmltwhp/image/upload/v1704788280/chat-app-image/avatar/d5dfhestighncbdqqq6o.jpg',
        message: 'Hello',
        time: '12:00',
        isRead: false
    },
    {
        id: 2,
        name: 'Nguyễn Văn B',
        avatar: 'https://res.cloudinary.com/dtpmltwhp/image/upload/v1704788280/chat-app-image/avatar/d5dfhestighncbdqqq6o.jpg',
        message: 'Hello',
        time: '12:00',
        isRead: false
    },
    {
        id: 3,
        name: 'Nguyễn Văn C',
        avatar: 'https://res.cloudinary.com/dtpmltwhp/image/upload/v1704788280/chat-app-image/avatar/d5dfhestighncbdqqq6o.jpg',
        message: 'Hello',
        time: '12:00',
        isRead: false
    },
    {
        id: 4,
        name: 'Nguyễn Văn D',
        avatar: 'https://res.cloudinary.com/dtpmltwhp/image/upload/v1704788280/chat-app-image/avatar/d5dfhestighncbdqqq6o.jpg',
        message: 'Hello',
        time: '12:00',
        isRead: false
    }
]

const ListChat = ({ onItemClick }) => {
    const [isFocus, setIsFocus] = React.useState(false)

    return (
        <div className="list-chat-container">
            <div className="list-chat-search">
                <div className='d-flex'>
                    <div className='input-search-container'>
                        <input type="text" className="rounded-1 border-0 input-search-custom pt-1 pb-1" placeholder="Tìm kiếm" />
                    </div>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                </div>
                <div className='list-chat-type-container'>
                    <div className='list-chat-type-focus'>
                        <p>Ưu tiên</p>
                    </div>
                    <div className='list-chat-type'>
                        <p>Khác</p>
                    </div>
                    <div className='list-chat-type'>
                        <p>Phân loại</p>
                    </div>
                </div>
            </div>
            <div className='mt-1'>
                {
                    listChat.map((item, index) => {
                        return (
                            <div className={`list-chat-item ${isFocus ? 'focused' : ''}`} key={index} onClick={() => onItemClick(item)}>
                                <div className='avatar-container'>
                                    <img src={item.avatar} alt="avatar" className='avatar-custom' />
                                </div>
                                <div className='info-container'>
                                    <div className='info-name'>
                                        {item.name}
                                    </div>
                                    <div className='info-message'>
                                        Bạn: {item.message}
                                    </div>
                                </div>
                                <div className='time-container'>
                                    {item.time}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ListChat
