import styles from "./Info.module.css";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Include the CSS file for styling

import { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByNumberPhone } from "../ReduxToolkit/ActionAndRedux";
import bcrypt from 'bcryptjs';

const data = [
    {
        name: "Huynh Chi Thanh",
        img: "https://wallpapers.com/images/featured/pikachu-4k-uzcr6pdp4a36rrd4.jpg",
        dob: "12/02/2002",
        gender: "Nam",
        phone: "0787958654",
    },
];

const Info = () => {
    const [showFormUpdate, setShowFormUpdate] = useState(true);

    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const phoneNumber = urlParams.get('phoneNumber');
    // const password = urlParams.get('password');

    // console.log('Phone number:', phoneNumber);
    // console.log('Password:', password);

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchUserByNumberPhone({ phoneNumber, password }));
    // }
    //     , [dispatch]);

    const d = useSelector((state) => state.users.users);
    console.log(d);



    const handleShowFormUpdate = () => {
        setShowFormUpdate(!showFormUpdate);
    };

    // component update info
    const FormUpdate = ({ data }) => {

        const [gender, setGender] = useState(data[0].gender);

        const handleGenderChange = (event) => {
            setGender(event.target.value);
        };


        return (
            <div className={styles["form-update"]}>
                <div className={styles["form-update-box"]}>
                    <div className={styles["form-update-title"]}>
                        <span className={styles["form-update-title-span"]}>Cập nhật thông tin</span>
                    </div>
                    <div className={styles["form-update-content"]}>
                        {/* gender */}
                        <div className={styles.gr}>
                            <div className={styles["form-update-content-box"]}>
                                <div className={styles["form-update-content-box-title"]}>
                                    <span className={styles["form-update-content-box-title-span"]}>Giới tính</span>
                                </div>
                                <div className={styles["form-update-content-box-input"]}>
                                    {/* Radio buttons for gender */}
                                    <label>
                                        <input
                                            type="radio"
                                            value="Nam"
                                            checked={gender === "Nam"}
                                            onChange={handleGenderChange}
                                        />
                                        Nam
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="Nữ"
                                            checked={gender === "Nữ"}
                                            onChange={handleGenderChange}
                                        />
                                        Nữ
                                    </label>
                                    {/* Add more options if needed */}
                                </div>
                            </div>
                            {/* dob */}
                            <div className={styles["form-update-content-box"]}>
                                <div className={styles["form-update-content-box-title"]}>
                                    <span className={styles["form-update-content-box-title-span"]}>Ngày sinh</span>
                                </div>
                                <div className={styles["form-update-content-box-input"]}>
                                    {/* Use the DatePicker component */}
                                    <DatePicker
                                        selected={new Date(data[0].dob)} // Provide the initial date
                                        dateFormat="dd/MM/yyyy" // Set the desired date format
                                        className={styles["form-update-content-box-input-input"]} // Apply your styling here
                                    />
                                </div>
                            </div>
                        </div>

                        {/* phone */}
                        <div className={styles["form-update-content-box"]}>
                            <div className={styles["form-update-content-box-title"]}>
                                <span className={styles["form-update-content-box-title-span"]}>Điện thoại</span>
                            </div>
                            <div className={styles["form-update-content-box-input"]}>
                                <input type="text" defaultValue={data[0].phone} className={styles["form-update-content-box-input-input"]} />
                            </div>
                        </div>
                    </div>
                    <div className={styles["form-update-button"]}>
                        <button className={styles["form-update-button-button"]}>Cập nhật</button>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className={styles.container}>
            <div className={styles.parent}>
                <div className={styles.card}>
                    <div className={styles["content-box"]}>
                        <span className={styles["card-title"]}>Thông tin cá nhân</span>
                        <div className={styles.line}></div>

                        {/* component info and update info */}
                        {d && (
                            <div className={styles.cover}>
                                <div className={styles.title}>
                                    <span>Email</span>
                                    <span>Ngày sinh</span>
                                    <span>Điện thoại</span>
                                </div>
                                <div className={styles.info}>
                                    <span>{d.email}</span>
                                    <span>{d.birthDate}</span>
                                    <span>{d.phoneNumber}</span>
                                </div>
                            </div>
                        )}
                        <div className={styles.line}></div>
                        <button className={styles.button} onClick={handleShowFormUpdate}>
                            <span className={styles.span}> Cập nhật </span>
                        </button>
                    </div>

                    {/* avt and name */}
                    {
                        d && (
                            <div className={styles["date-box"]}>
                                <div className={styles.img}>
                                    <img src={d.img} alt={"Thanh muốn có bồ huhu :(("} className={styles.avt} />
                                    <span className={styles.month}>{d.fullName}</span>
                                    <span className={styles.date}>a</span>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );

};

export default Info;
