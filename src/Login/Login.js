import styles from './Login.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const User = [
    {
        USERNAME: 'ChiThanh',
        PASSWORD: '12022002'
    }
]
const Login = () => {
    const [userName, setUserName] = useState('ChiThanh');
    const [password, setPassword] = useState('12022002');
    // const navigate = useNavigate();
    // const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();

        var txtUser = userName;
        var txtPass = password;
        var checklogin = User.some(value => value.USERNAME === txtUser && value.PASSWORD === txtPass);

        if (checklogin) {
            // Chuyển hướng đến trang MainMenu
            // navigate('/menu');
        } else {
            alert("Sai tên đăng nhập hoặc mật khẩu");
        }
    };

    // đồng hồ analog
    const [rotationDegrees, setRotationDegrees] = useState({
        seconds: 0,
        minutes: 0,
        hours: 0
    });
    useEffect(() => {
        const updateRotation = () => {
            const currentTime = new Date();
            const seconds = currentTime.getSeconds() * 6; // Mỗi giây quay 6 độ
            const minutes = currentTime.getMinutes() * 6 + seconds / 60; // Mỗi phút quay 6 độ, và thêm một phần nhỏ từ giây
            const hours = (currentTime.getHours() % 12) * 30 + minutes / 12; // Mỗi giờ quay 30 độ, và thêm một phần nhỏ từ phút

            setRotationDegrees({
                seconds,
                minutes,
                hours
            });
        };
        const intervalId = setInterval(updateRotation, 1000);
        return () => clearInterval(intervalId);
    }, []);
    // đồng hồ digital
    const [time, setTime] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00',
        ampm: 'AM'
    });

    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date();
            let hours = currentTime.getHours();
            let minutes = currentTime.getMinutes();
            let seconds = currentTime.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            // Chuyển đổi sang định dạng 12 giờ
            hours = hours % 12 || 12;

            // Đảm bảo hiển thị dạng số có hai chữ số
            hours = hours < 10 ? `0${hours}` : hours;
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            setTime({
                hours,
                minutes,
                seconds,
                ampm
            });
        };

        const intervalId = setInterval(updateTime, 1000);

        // Xóa interval khi component unmount
        return () => clearInterval(intervalId);
    }, []);

    //chuyển đổi form login/register
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);
    const toggleForm = () => {
        setLoginFormVisible(!isLoginFormVisible);
    };
    return (
        <div className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.clock}>
                    <div className={styles.circle} style={{ "--clr": "#04fc43", transform: `rotate(${rotationDegrees.seconds}deg)` }}>
                        <i></i>
                    </div>
                    <div className={[styles.circle, styles.circle2].join(' ')} style={{ "--clr": "#fee800", transform: `rotate(${rotationDegrees.minutes}deg)` }}>
                        <i></i>
                    </div>
                    <div className={[styles.circle, styles.circle3].join(' ')} style={{ "--clr": "#ff2972", transform: `rotate(${rotationDegrees.hours}deg)` }}>
                        <i></i>
                    </div>


                    <span style={{ "--i": 1 }}> <b>1</b> </span>
                    <span style={{ "--i": 2 }}> <b>2</b> </span>
                    <span style={{ "--i": 3 }}> <b>3</b> </span>
                    <span style={{ "--i": 4 }}> <b>4</b> </span>
                    <span style={{ "--i": 5 }}> <b>5</b> </span>
                    <span style={{ "--i": 6 }}> <b>6</b> </span>
                    <span style={{ "--i": 7 }}> <b>7</b> </span>
                    <span style={{ "--i": 8 }}> <b>8</b> </span>
                    <span style={{ "--i": 9 }}> <b>9</b> </span>
                    <span style={{ "--i": 10 }}> <b>10</b> </span>
                    <span style={{ "--i": 11 }}> <b>11</b> </span>
                    <span style={{ "--i": 12 }}> <b>12</b> </span>
                </div>
                {/* digital */}
                <div className={styles.time}>
                    <div className={styles.hours} style={{ "--clr": "#ff2972" }}>{time.hours}</div>
                    <div className={styles.minutes} style={{ "--clr": "#fee800" }}>{time.minutes}</div>
                    <div className={styles.seconds} style={{ "--clr": "#04fc43" }}>{time.seconds}</div>
                    <div className={styles.ampm}>{time.ampm}</div>
                </div>
            </div>

            <div className={styles["form-box"]}>
                <div className={styles["button-box"]}>
                    <div className={styles.btn}></div>
                    <button
                        type="button"
                        className={`${styles["toggle-btn"]} ${isLoginFormVisible ? 'login' : 'register'}`}
                        onClick={toggleForm}
                    >
                        {isLoginFormVisible ? 'Login' : 'Register'}
                    </button>

                    <button
                        type="button"
                        className={`${styles["toggle-btn"]} ${isLoginFormVisible ? 'register' : 'login'}`}
                        style={{ marginLeft: '12px' }}
                        onClick={toggleForm}
                    >
                        {isLoginFormVisible ? 'Register' : 'Login'}
                    </button>
                </div>

                {isLoginFormVisible ? (
                    <form id="login" action="" className={styles["input-group"]} onSubmit={login}>
                        <input id="txtName" type="text" className={styles["input-field"]} placeholder="User ID" required onChange={(e) => setUserName(e.target.value)} value={userName} />
                        <input id="txtPass" type="password" className={styles["input-field"]} placeholder="User password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                        <input type="checkbox" className={styles["check-box"]} /><span>Remember Password</span>
                        <button id="checkbox" className={styles["submit-btn"]} type="submit" style={{ color: 'whitesmoke', fontWeight: 500, fontSize: '20px' }}>Log in</button>
                    </form>
                ) : (
                    <form id="register" action="" className={styles["input-group"]}>
                        <input type="text" className={styles["input-field"]} placeholder="User ID" id="txtID" required />
                        {/* <span className={styles["err"]} id="errID">*</span> */}
                        <input type="password" className={styles["input-field"]} placeholder="Enter Password" id="txtPW" required />
                        {/* <span className={styles["err"]} id="errPW">*</span> */}
                        <input type="password" className={styles["input-field"]} placeholder="Re-enter Password" id="txtRPW" required />
                        {/* <span className={styles["err"]} id="errRPW">*</span> */}
                        <input type="text" className={styles["input-field"]} placeholder="User Name" required id="txtUN" />
                        {/* <span className={styles["err"]} id="errUN">*</span> */}
                        <input type="text" className={styles["input-field"]} placeholder="User Phone" id="txtPhone" />
                        <input type="checkbox" className={styles["check-box"]} />
                        <span>I agree to the term & condition</span>
                        <button className={styles["submit-btn"]} style={{ color: 'whitesmoke', fontWeight: 500, fontSize: '20px' }} id="regis">Register</button>
                    </form>
                )}
            </div>
        </div>


    );
};


export default Login;