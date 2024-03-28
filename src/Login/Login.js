import 'firebase/auth';
import 'firebase/compat/auth';
import React, { useEffect, useState, useRef } from 'react';
import styles from './Login.module.css';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import 'react-phone-input-2/lib/style.css';
import { auth } from '../firebase.config';
import { toast, Toaster } from 'react-hot-toast';
import OTP from '../OTP/OTP';

// redux

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux-toolkit/userSlice';
const Login = () => {
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const url = `http://localhost:8080/user/login`;

    const loginbutton = async (e) => {
        e.preventDefault();
        const data = {
            phoneNumber: phoneNumber,
            password: password
        };
        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                dispatch(login({userInfo: userData}));
                window.location.href = '/info';
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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

    //otp
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [user, setUser] = useState(null);
    const [requestCount, setRequestCount] = useState(0);
    const [lastRequestTime, setLastRequestTime] = useState(0);

    const recaptchaContainerRef = useRef(null);
    const MAX_REQUESTS = 5; // Maximum number of requests allowed
    const REQUEST_INTERVAL = 60000;

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                recaptchaContainerRef.current, // Use the ref to get the DOM element
                {
                    'size': 'invisible',
                    'callback': (response) => {
                        onSignUp();
                    },
                    'expired-callback': () => {
                        // Handle expired callback if needed
                    }
                },
                auth
            );
        }
    }

    function onOtpVerify() {
        setLoading(true);
        window.confirmationResult.confirm(otp).then(async (result) => {
            console.log(result);
            setUser(result.user);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }

    function onSignUp() {
        const currentTime = Date.now();

        // Check if the last request was made within the allowed time interval
        if (currentTime - lastRequestTime < REQUEST_INTERVAL) {
            setRequestCount(requestCount + 1);

            // Check if the maximum number of requests is reached
            if (requestCount >= MAX_REQUESTS) {
                toast.error('Too many requests. Please try again later.');
                return;
            }
        } else {
            // Reset request count if the time interval has passed
            setRequestCount(1);
        }

        setLastRequestTime(currentTime);
        setLoading(true);
        onCaptchVerify();
        setLoading(true);
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const format = '+' + phone;
        signInWithPhoneNumber(auth, format, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOtp(true);
                toast.success('OTP sent successfully');
            }).catch((error) => {
                console.log(error);
                alert('Số điên thoại không hợp lệ');
                setLoading(false);
            });
    }
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
                <div>
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
                        <form id="login" action="" className={styles["input-group"]} onSubmit={loginbutton}>
                            <input id="txtPhone" type="text" className={styles["input-field"]} placeholder="Số điện thoại" required onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                            <input id="txtPass" type="password" className={styles["input-field"]} placeholder="User password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                            <input type="checkbox" className={styles["check-box"]} /><span>Remember Password</span>
                            <button id="checkbox" className={styles["submit-btn"]} type="submit" style={{ color: 'whitesmoke', fontWeight: 500, fontSize: '20px' }} >Log in</button>
                        </form>
                    ) : (
                        <OTP isLoginFormVisible={isLoginFormVisible} toggleForm={toggleForm} />

                    )}
                </div>

                {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
            </div>

        </div>

    );
};


export default Login;