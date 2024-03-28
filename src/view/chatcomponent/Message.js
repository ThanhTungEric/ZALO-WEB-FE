import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../../router/APIRouters";
import '../../styles/chatcomponent/Message.css'
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'

const messageList = [
    {
        id: 1,
        message: 'Hellosaaaaaaaaaaaaa chào bạn chào bạn chào bạn chào bạn chào bạn chào bạn chào bạn chào bạn',
        time: '12:00',
        senderId: 2,
        isRead: false
    },
    {
        id: 2,
        message: 'Chào bạn chào bạn chào bạn chào bạn chào bạn chào bạn chào bạn chào bạn chào bạn',
        time: '12:00',
        senderId: 1,
        isRead: false
    },
    {
        id: 3,
        message: 'Bạn ăn cơm chưa',
        time: '12:00',
        senderId: 1,
        isRead: false
    },
    {
        id: 4,
        message: 'Tôi ăn rồi',
        time: '12:00',
        senderId: 2,
        isRead: false
    },
    {
        id: 5,
        message: 'Tôi ăn rồi',
        time: '12:00',
        senderId: 2,
        isRead: false
    }, {
        id: 6,
        message: 'Tôi ăn rồi',
        time: '12:00',
        senderId: 2,
        isRead: false
    }, {
        id: 7,
        message: 'Tôi ăn rồi',
        time: '12:00',
        senderId: 2,
        isRead: false
    }, {
        id: 8,
        message: 'Tôi ăn rồi',
        time: '12:00',
        senderId: 2,
        isRead: false
    }
    , {
        id: 9,
        message: 'Tôi ăn rồi',
        time: '12:00',
        senderId: 2,
        isRead: false
    }

]

function Message({ selectedChat, socket }) {
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const insertEmoji = (emoji) => {
        const input = document.querySelector('.input-message');
        input.value += emoji;
    }
    console.log("selected chat", selectedChat)
    console.log(socket)

    const getMessages = async () => {
        const data = await JSON.parse(localStorage.getItem('user'));
        const reponse = await axios.post(recieveMessageRoute, {
            from: data._id,
            to: selectedChat._id
        });
        setMessages(reponse.data);
        console.log("day la tin nhan", reponse.data)
    }

    useEffect(() => {
        getMessages();
    }, [selectedChat]);

    useEffect(() => {
        const getCurrentChat = async () => {
            if (selectedChat) {
                await JSON.parse(
                    localStorage.getItem("user")
                )._id;
            }
        };
        getCurrentChat();
    }, [selectedChat]);

    const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem("user")
        );
        socket.current.emit("send-msg", {
            to: selectedChat._id,
            from: data._id,
            msg,
        });
        await axios.post(sendMessageRoute, {
            from: data._id,
            to: selectedChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
            console.log("send chat", msg)
        }
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <div className="message-container">
            <div>
                {selectedChat ? (
                    <div className='d-flex justify-content-between align-items-center bg-light pt-1 pb-1 pe-2'>
                        <div className='d-flex align-items-center'>
                            <div className='avatar-container'>
                                <img src={selectedChat.avatar} alt="avatar" className='avatar-custom' />
                            </div>
                            <div className='ml-2'>
                                <div className='name'>{selectedChat.fullName}</div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='create-group-chat'></div>
                            <div className='create-group-chat'></div>
                            <div className='create-group-chat'></div>
                            <div className='create-group-chat'></div>
                        </div>
                    </div>
                ) : (
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                        <div className='text-center'>Chọn một cuộc trò chuyện</div>
                    </div>
                )
                }
            </div>
            <div className='chat-messages'>
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                    <div className="content">
                                        <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='message-input-container'>
                <div className='message-list-action d-flex mt-1 pb-1'>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                    <div className='create-group-chat'></div>
                </div>
                <div className='d-flex mt-1'>
                    <div className='message-input'>
                        <input
                            type="text"
                            className='input-message'
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            placeholder='Nhập tin nhắn và emoji'
                        />
                        {/* Trình chọn emoji */}

                    </div>
                    <div className='message-send d-flex'>
                        {/* Hiển thị trình chọn emoji nếu isPickerVisible là true */}
                        <img
                            src="https://www.motionpicturemagazine.com/wp-content/uploads/2023/12/Best-blue-emojis.png.webp"
                            alt="emoji"
                            className="button-image"
                            onClick={() => setIsPickerVisible(!isPickerVisible)}
                        />
                        <div className={isPickerVisible ? 'd-block' : 'd-none'}>
                            <Picker data={data} previewPosition="none" onEmojiSelect={(e) => { insertEmoji(e.native); setIsPickerVisible(false) }} />
                        </div>
                        <div className='create-group-chat'
                            onClick={sendChat}
                        >Gửi</div>
                        <div className='create-group-chat'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message
