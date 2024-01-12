// css
import styles from "../GroupList/GroupList.module.css";

// img
import avt1 from "../img/father.png";
import avt2 from "../img/mother.png";
import avt3 from "../img/son.png";

const data = [
  {
    type: "Gia đình",
    info: {
      name: "Thanh",
      img: avt1,
    },
  },
  {
    type: "Gia đình",
    info: {
      name: "Thanh Huỳnh",
      img: avt3,
    },
  },
  {
    type: "Bạn bè",
    info: {
      name: "Thanh Huỳnh",
      img: avt2,
    },
  },
  {
    type: "Gia đình",
    info: {
      name: "Thanh",
      img: avt1,
    },
  },
  {
    type: "Văn phòng",
    info: {
      name: "Thanh Huỳnh",
      img: avt3,
    },
  },
  {
    type: "Bạn bè",
    info: {
      name: "Thanh Huỳnh",
      img: avt2,
    },
  },
  {
    type: "Văn phòng",
    info: {
      name: "Thanh",
      img: avt1,
    },
  },
  {
    type: "Công ty",
    info: {
      name: "Thanh Huỳnh",
      img: avt3,
    },
  },
  {
    type: "Công ty",
    info: {
      name: "Thanh Huỳnh",
      img: avt2,
    },
  },
  {
    type: "Dịch vụ",
    info: {
      name: "Thanh",
      img: avt1,
    },
  },
  {
    type: "Dịch vụ",
    info: {
      name: "Thanh Huỳnh",
      img: avt3,
    },
  },
  {
    type: "Quán ăn",
    info: {
      name: "Thanh Huỳnh",
      img: avt2,
    },
  },
  {
    type: "Văn phòng",
    info: {
      name: "Thanh",
      img: avt1,
    },
  },
  {
    type: "A",
    info: {
      name: "Thanh Huỳnh",
      img: avt3,
    },
  },
  {
    type: "B",
    info: {
      name: "Thanh Huỳnh",
      img: avt2,
    },
  },
];

const FriendList = () => {
  const itemsByType = {};
  // Duyệt qua dữ liệu và tổ chức lại thành object theo từng loại
  data.forEach((item) => {
    if (!itemsByType[item.type]) {
      itemsByType[item.type] = [];
    }
    itemsByType[item.type].push(item);
  });
  const renderItemsByType = () => {
    return Object.keys(itemsByType).map((type) => (
      <div key={type}>
        <h2>{type}</h2>
        {itemsByType[type].map((item, index) => (
          <div key={index}>
            <div className={styles.info}>
              <img
                src={item.info.img}
                alt={item.info.name}
                className={styles.avt}
              />
              <h3>{item.info.name}</h3>
            </div>
            <hr style={{ width: "100%" }}></hr>
          </div>
        ))}
      </div>
    ));
  };
  return (
    <div className={styles.container}>
      {/* search tool */}
      <div className={styles.tool}>
        {/* Search Name Input */}
        <div className={styles["group_search_name"]}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input className={styles.input} type="search" placeholder="Search" />
        </div>

        {/* dropdown A-Z  */}
        <div className={styles.dropdown}>
          <div className={styles["paste-button"]}>
            <button className={styles.button}>Sắp xếp &nbsp; ▼</button>
            <div className={styles["dropdown-content"]}>
              <a id="az" href="#">
                A-Z
              </a>
              <a id="za" href="#">
                Z-A
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* list friend */}
      <div className={styles["list-friend"]}>
        <div className={styles.friend}>{renderItemsByType()}</div>
      </div>
    </div>
  );
};
export default FriendList;
