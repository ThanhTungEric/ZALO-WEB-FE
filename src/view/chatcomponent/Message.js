import React, { useState } from 'react'
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

function Message({ selectedChat }) {

    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState(null);

    // Hàm để chèn emoji được chọn vào ô input
    const insertEmoji = (emoji) => {
        setCurrentEmoji(emoji); // Lưu emoji vào state
        const input = document.querySelector('.input-message'); // Lấy thẻ input
        const startPos = input.selectionStart; // Lấy vị trí con trỏ hiện tại
        const endPos = input.selectionEnd;
        const text = input.value;
        const newText = text.substring(0, startPos) + emoji + text.substring(endPos);
        input.value = newText; // Thêm emoji vào vị trí con trỏ
        input.focus(); // Focus vào input sau khi thêm emoji
        input.setSelectionRange(startPos + emoji.length, startPos + emoji.length); // Di chuyển con trỏ tới cuối emoji vừa thêm
    };

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
                                <div className='name'>{selectedChat.name}</div>
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
            <div className='message-list-container p-1 mt-1'>
                {messageList.map((item, index) => (
                    <div key={index} className={item.senderId === 1 ? 'message-content-container-left' : 'message-content-container-right'}>
                        {item.senderId === 1 ? (
                            <div className='d-flex'>
                                <div className='avatar-container'>
                                    <img src={selectedChat.avatar} alt="avatar" className='avatar-custom-chat' />
                                </div>
                                <div className='message-item'>
                                    <div className='message-content'>
                                        {item.message}
                                    </div>
                                    <div className='message-time'>
                                        {item.time}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='message-item-right'>
                                <div className='message-content'>
                                    {item.message}
                                </div>
                                <div className='message-time'>
                                    {item.time}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
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
                        <div className='create-group-chat'></div>
                        <div className='create-group-chat'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message
