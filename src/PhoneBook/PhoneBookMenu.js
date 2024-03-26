import styles from "./PhoneBookMenu.module.css";

// component
import FriendList from "./FriendList/FriendList";
import GroupList from "./GroupList/GroupList";
import AddFriend from "./AddFriend/AddFriend";

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
    setShowAddFriend(false);
  };
  // show and hide group list
  const [showGroupList, setShowGroupList] = useState(false);
  const toggleGroupList = () => {
    setShowFriendList(false);
    setShowGroupList(true);
    setShowAddFriend(false);
  };
  // show and hide add friend
  const [showAddFriend, setShowAddFriend] = useState(false);
  const toggleAddFriend = () => {
    setShowAddFriend(true);
    setShowFriendList(false);
    setShowGroupList(false);
  };

  return (
    <div className={styles.main}>
      {/* Bên trái */}
      <div className={styles.left}>
        {/* <div className={styles.fixed}> */}
        <div className={styles.leftTop}>
          <div className={styles.container}>
            <div className={styles["input-search-container"]}>
              <input type="text" className="rounded-1 border-0 input-search-custom pt-1 pb-1" placeholder="Tìm kiếm" />
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
            <p className={styles["text"]}>Danh sách bạn bè</p>
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
            <p className={styles["text"]}>Danh sách bạn nhóm</p>
          </button>

          {/* icon */}
          <button
            className={styles["icon_friend_request"]}
            onClick={toggleAddFriend}
          >
            <img
              src={Mail}
              alt="User Icon"
              className={styles["icon_friend_request_sub"]}
            ></img>
            <p className={styles["text"]}>Lời mời kết bạn</p>
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
        {showAddFriend && <AddFriend />}
      </div>

      {/* Hết bên phải */}
    </div>
  );
};
export default PhoneBookMenu;
