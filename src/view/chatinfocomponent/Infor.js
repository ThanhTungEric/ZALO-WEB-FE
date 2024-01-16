import React from 'react'
import '../../styles/chatinfocompoent/Info.css'

function Infor({ selectedChat }) {
    return (
        <div className='info-user-container'>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column align-items-center'>
                    <div className='avatar-container'>
                        <img src={selectedChat.avatar} alt="avatar" className='avatar-custom' />
                    </div>
                    <div className='info-name'>
                        {selectedChat.name}
                    </div>
                    <div className='noticate-component-container'>
                        <div className='noticate-component-parent'>
                            <div className='noticate-component-child'></div>
                            <p>Tắt thông báo</p>
                        </div>
                        <div className='noticate-component-parent'>
                            <div className='noticate-component-child'></div>
                            <p>Tạo nhóm trò chuyện</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Infor
