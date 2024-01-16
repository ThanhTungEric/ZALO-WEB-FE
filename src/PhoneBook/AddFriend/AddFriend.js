import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import styles from "../AddFriend/AddFriend.module.css";

// img
import avt1 from "../img/father.png";
import avt2 from "../img/mother.png";
import avt3 from "../img/son.png";

const data = [
  {
    name: "Huynh Chi Thanh",
    img: avt1,
    date: "01/01/2024",
  },
  {
    name: "F",
    img: avt3,
    date: "01/01/2024",
  },
  {
    type: "Bạn bè",
    date: "01/01/2024",

    name: "C",
    img: avt2,
    date: "01/01/2024",
  },
  {
    name: "D",
    img: avt1,
    date: "01/01/2024",
  },
  {
    name: "B",
    img: avt3,
    date: "01/01/2024",
  },
  {
    name: "H",
    img: avt2,
    date: "01/01/2024",
  },
  {
    name: "H",
    img: avt2,
    date: "01/01/2024",
  },
];

const AddFriend = () => {
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
          <div className={styles.header}>
            <h2>Từ chối kết bạn</h2>
            <p>&#10005;</p>
          </div>
          <div>
            <p>Bạn có chắc muốn từ chối kết bạn?</p>
          </div>
          <div className={styles.button}>
            <button
              className={styles["refuse-button"]}
              onClick={closeRefuseModal}
            >
              Hủy
            </button>
            <button className={styles["accept-button"]}>Từ chối</button>
          </div>
        </div>
      </Modal>
    );
  };

  // Component friend
  const Friend = ({ item, index }) => {
    return (
      <div key={index}>
        <div className={styles.info}>
          <div className={styles.card}>
            <div className={styles["card-border-top"]}></div>

            <div className={styles.img}>
              <img src={item.img} alt={item.name} className={styles.avt} />
            </div>
            <span> {item.name}</span>
            <p className="date"> {item.date}</p>
            <button className={styles["icon-chat"]}>
              <FontAwesomeIcon icon={faComment} />
            </button>
            <div className={styles.button}>
              <button
                className={styles["refuse-button"]}
                onClick={openRefuseModal}
              >
                Từ chối
              </button>
              <button className={styles["accept-button"]}> Đồng ý</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        {data.map((item, index) => (
          <Friend key={index} item={item} index={index} />
        ))}
        <ConfirmRefuse />
      </div>
    </div>
  );
};

export default AddFriend;
