import styles from "./PhoneBookMenu.module.css";

// component
import FriendList from "./FriendList/FriendList";
import GroupList from "./GroupList/GroupList";

// State
import React, { useState } from "react";

// icon
import UserIcon from "./img/add-user.png";
import GroupIcon from "./img/add-group.png";
import Friend from "./img/friend.png";
import Mail from "./img/mail.png";
import List from "./img/list.png";

const PhoneBookMenu = () => {
  // show and hide friend list
  const [showFriendList, setShowFriendList] = useState(true);
  const toggleFriendList = () => {
    setShowFriendList(true);
    setShowGroupList(false);
  };
  // show and hide group list
  const [showGroupList, setShowGroupList] = useState(false);
  const toggleGroupList = () => {
    setShowFriendList(false);
    setShowGroupList(true);
  };

  return (
    <div className={styles.main}>
      {/* Bên trái */}
      <div className={styles.left}>
        {/* <div className={styles.fixed}> */}
        <div className={styles.leftTop}>
          <div className={styles.container}>
            <div className={styles["search-container"]}>
              <input
                className={styles.input}
                type="text"
                placeholder="Tìm kiếm"
              />
              <svg viewBox="0 0 24 24" className={styles["search__icon"]}>
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className={styles.iconRow}>
            <div className={styles["add_user"]}>
              <img
                src={UserIcon}
                alt="User Icon"
                className={styles["icon_user"]}
              ></img>
            </div>
            <div className={styles["add_user_group"]}>
              <img
                src={GroupIcon}
                alt="User Icon"
                className={styles["icon_user"]}
              ></img>
            </div>
          </div>
        </div>
        {/* Bên trái phía dưới */}
        <div className={styles.leftBottom}>
          {/* icon  */}
          <button
            className={styles["icon_friend_list"]}
            onClick={toggleFriendList}
          >
            <img
              src={Friend}
              alt="User Icon"
              className={styles["icon_friend_list_sub"]}
            ></img>
            <h4>Danh sách bạn bè</h4>
          </button>

          {/* icon */}
          <button
            className={styles["icon_group_list"]}
            onClick={toggleGroupList}
          >
            <img
              src={List}
              alt="User Icon"
              className={styles["icon_group_list_sub"]}
            ></img>
            <h4>Danh sách bạn nhóm</h4>
          </button>

          {/* icon */}
          <button className={styles["icon_friend_request"]}>
            <img
              src={Mail}
              alt="User Icon"
              className={styles["icon_friend_request_sub"]}
            ></img>
            <h4>Lời mời kết bạn</h4>
          </button>
        </div>
        {/* </div> */}
        {/* Bên trái phía trên */}
      </div>
      {/* Hết bên trái */}

      {/* Bên phải */}
      <div className={styles.right}>
        {showFriendList && <FriendList />}
        {showGroupList && <GroupList />}
      </div>

      {/* Hết bên phải */}
    </div>
  );
};
export default PhoneBookMenu;
