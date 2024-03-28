import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import styles from "../AddFriend/AddFriend.module.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

const AddFriend = () => {

  // lay du lieu tu localStorage
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user)._id;
  const [data, setData] = useState([]);


  /////////////////////////////////////////////////////API get add friend
  useEffect(() => {
    fetch(`http://localhost:8080/friend/get-add-friend/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const transformData = data.map((item) => {
    return {
      _id: item.friend._id,
      fullName: item.friendInfo.fullName,
      birthDate: item.friendInfo.birthDate,
      email: item.friendInfo.email,
      phoneNumber: item.friendInfo.phoneNumber,
      status: item.friendInfo.status,
      idUser1: item.friend.idUser1,
      idUser2: item.friend.idUser2,
      avatar: item.friendInfo.avatar,
    }
  })
  const friendListArray = [];
  transformData.forEach((item) => {
    let newItem = { ...item };
    friendListArray.push(newItem);
  })
  /////////////////////////////////////////////////API get add friend
  // API accept friend
  const getFriendId = transformData.map((item) => {
    return {
      idUser1: item.idUser1,
      idUser2: item.idUser2,
    }
  })
  const userCuatuine = localStorage.getItem("user");
  const userIdCuatuine = JSON.parse(userCuatuine)._id;


  const handleAcceptFriend = async ({ userId1, userId2 }) => {
    try {
      const response = await fetch(`http://localhost:8080/friend/accept-friend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUser1: userId1,
          idUser2: userId2,
        }),

      });

      if (!response.ok) {
        throw new Error('Failed to accept friend.');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error accepting friend:', error);
    }
  };

  /////////////////////////////////////////////////API accept friend
  // pôpup confirm
  const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false);
  const openRefuseModal = () => {
    setIsRefuseModalOpen(true);
  };
  const closeRefuseModal = () => {
    setIsRefuseModalOpen(false);
  };
  // Component xác nhận từ chối
  const ConfirmRefuse = () => {
    return (
      <Modal
        isOpen={isRefuseModalOpen}
        onRequestClose={closeRefuseModal}
        contentLabel="Refuse Confirmation Modal"
        className={styles.refuseModal}
      >
        <div>
          <div className={styles.headerPopup}>
            <h2 style={{ fontSize: 20 }}>Từ chối kết bạn</h2>
            <button onClick={closeRefuseModal}>&#10005;</button>
          </div>
          <div>
            <p className="text-center">Bạn có chắc muốn từ chối kết bạn?</p>
          </div>
          <div className={styles.button}>
            <button
              className={styles["refuse-button"]}
              onClick={closeRefuseModal}
            >
              Đóng
            </button>
            <button className={styles["accept-button"]}>Từ chối kết bạn</button>
          </div>
        </div>
      </Modal>
    );
  };

  //chuyển đến trang chat
  const navigate = useNavigate();
  const handleChatButtonClick = () => {
    // Navigate to the chat screen when the chat button is clicked
    navigate("/chat");
  };

  // Component friend
  const Friend = ({ item, index }) => {
    return (
      <div key={index}>
        <div className={styles.info}>
          <div className={styles.card}>
            <div className={styles["card-border-top"]}></div>

            <div className={styles.img}>
              <img src={item.avatar} alt={item.fullName} className={styles.avt} />
            </div>
            <span> {item.fullName}</span>
            <p className="date text-center"> {item.date}</p>
            <div className="text-center">
              <button
                className={styles["icon-chat"]}
                onClick={handleChatButtonClick}
              >
                <FontAwesomeIcon icon={faComment} />
              </button>
              <div className={styles.button}>
                <button
                  className={styles["refuse-button"]}
                  onClick={openRefuseModal}
                >
                  Từ chối
                </button>
                <button className={styles["accept-button"]} onClick={() => handleAcceptFriend({ userId1: item.idUser1, userId2: item.idUser2 })}
                > Đồng ý</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        {friendListArray.map((item, index) => (
          <Friend key={index} item={item} index={index} />
        ))}
        <ConfirmRefuse />
      </div>
    </div>
  );
};

export default AddFriend;
