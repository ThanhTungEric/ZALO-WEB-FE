import React, { useEffect, useState } from 'react'
import '../../styles/chatcomponent/ListChat.css'
import Message from './Message'

const ListChat = ({ onItemClick }) => {
    const [isFocus, setIsFocus] = React.useState(false)
    const [data, setData] = useState([]);
    //http://localhost:8080/friend/get-friend/6602dc87fb5cb27863e9519c
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/friend/get-friend/6602dc87fb5cb27863e9519c')
                const data = await response.json()
                const friendInfos = data.map(item => item.friendInfo);
                console.log(data)
                setData(friendInfos);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])


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
                    data.map((item, index) => {
                        return (
                            <div className={`list-chat-item ${isFocus ? 'focused' : ''}`} key={index} onClick={() => onItemClick(item)}>
                                <div className='avatar-container'>
                                    <img src={item.avatar} alt="avatar" className='avatar-custom' />
                                </div>
                                <div className='info-container'>
                                    <div className='info-name'>
                                        {item.fullName}
                                    </div>
                                    <div className='info-message'>
                                        Bạn: nônnoo
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
