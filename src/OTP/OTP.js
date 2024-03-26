import React, { useEffect, useState, useRef } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OtpInput from 'otp-input-react';
import { BsTelephone } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth } from '../firebase.config';
import { toast, Toaster } from 'react-hot-toast';
import styles from '../Login/Login.module.css';
import Login from '../Login/Login';

import { useNavigate } from 'react-router-dom';


import "../OTP/OTP.css"

const OTP = ({ isLoginFormVisible, toggleForm }) => {
    const recaptchaContainerRef = useRef(null);
    const [user, setUser] = useState(null);
    const [showOtp, setShowOtp] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [lastRequestTime, setLastRequestTime] = useState(0);
    const [requestCount, setRequestCount] = useState(0);
    const [otp, setOtp] = useState('');
    const phone = phoneNumber.slice(2);



    const REQUEST_INTERVAL = 60000;
    const MAX_REQUESTS = 100;

    const navigate = useNavigate(); // Use the useHistory hook




    //check if user is already logged in
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
    //check if user is already logged in
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
    //check if user is already logged in
    function onSignUp() {
        const currentTime = Date.now();

        // Validate phone number
        if (!phoneNumber) {
            alert('Please enter a valid phone number');
            return;
        }

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
        const format = '+' + phoneNumber;
        signInWithPhoneNumber(auth, format, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOtp(true);
                toast.success('OTP sent successfully');
            }).catch((error) => {
                console.log(error);
                toast.error('Invalid phone number');
                setLoading(false);
            });
    }
    //check username
    const checkUsername = () => {
        const txtName = document.getElementById('txtName');
        if (txtName.value === "") {
            toast.error('Tên đăng nhập không được để trống');
            return false;
        }
        else {
            return true;
        }
    }
    const checkPassword = () => {
        const txtPW = document.getElementById('txtPW');
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (txtPW.value === "") {
            toast.error('Mật khẩu không được để trống');
            return false;
        }
        else if (!re.test(txtPW.value)) {
            toast.error('Mật khẩu phải chứa ít nhất 1 chữ số, 1 chữ thường, 1 chữ hoa và từ 6-20 ký tự');
            return false;
        }
        else {
            return true;
        }
    }
    const rePassword = () => {
        const txtPW = document.getElementById('txtPW');
        const txtRPW = document.getElementById('txtRPW');
        if (txtRPW.value === "") {
            toast.error('Xác nhận mật khẩu không được để trống');
            return false;
        }
        else if (txtPW.value !== txtRPW.value) {
            toast.error('Mật khẩu không khớp');
            return false;
        }
        else {
            return true;
        }
    }
    const checkBirthday = () => {
        const txtBD = document.getElementById('txtBD');
        const currentDate = new Date();
        const birthday = new Date(txtBD.value);
        if (birthday > currentDate) {
            toast.error('Ngày sinh không hợp lệ');
            return false;
        }
        if (txtBD.value === "") {
            toast.error('Ngày sinh không được để trống');
            return false;
        }
        else {
            return true;
        }
    }
    const checkEmail = () => {
        const txtE = document.getElementById('txtE');
        const re = /\S+@\S+\.\S+/;
        if (txtE.value === "") {
            toast.error('Email không được để trống');
            return false;
        }
        else if (!re.test(txtE.value)) {
            toast.error('Email không hợp lệ');
            return false;
        }
        else {
            return true;
        }
    }

    const CheckRegister = (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện

        const txtName = document.getElementById('txtName').value;
        const txtPW = document.getElementById('txtPW').value;
        const txtBD = document.getElementById('txtBD').value;
        const txtP = document.getElementById('txtP').value;
        const txtE = document.getElementById('txtE').value;
        const txtRPW = document.getElementById('txtRPW').value;


        if (txtName && txtPW && txtBD && txtP && txtE && txtRPW) {
            const userData = {
                fullName: txtName,
                password: txtPW,
                birthDate: txtBD,
                phoneNumber: txtP,
                email: txtE
            }
            console.log(userData)

            fetch(`http://localhost:8080/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to register');
                    }
                    toast.success('Đăng ký thành công');
                    toggleForm();
                    return response.json();
                })
                .then(data => {
                    console.log('Registration successful:', data);
                    alert("Login success")
                    // Xử lý phản hồi từ server nếu cần
                })
                .catch(error => {
                    console.error('Registration failed:', error.message);
                    // Xử lý lỗi nếu cần
                });
            // chuyển đến trang đăng nhập
        }
    }

    return (
        <div>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
            {
                user ?
                    (
                        // <h2>Login success</h2>
                        <form id="register" action="" className={styles["input-group"]}>
                            <input type="text" className={styles["input-field"]} placeholder="Tên đăng nhập" id="txtName" onBlur={checkUsername} />
                            <input type="password" className={styles["input-field"]} placeholder="Mật khẩu" id="txtPW" required onBlur={checkPassword} />
                            <input type="password" className={styles["input-field"]} placeholder="Xác nhận mật khẩu" id="txtRPW" required onBlur={checkPassword} />
                            <input type="date" className={styles["input-field"]} id="txtBD" required onBlur={checkBirthday} />
                            <input type="text" className={styles["input-field"]} placeholder="Số điện thoại" required id="txtP" value={phone} />
                            <input type="text" className={styles["input-field"]} placeholder="Email" id="txtE" onBlur={checkEmail} />
                            {/* <input type="checkbox" className={styles["check-box"]} />
                        <span>I agree to the term & condition</span> */}
                            <button onClick={(event) => CheckRegister(event)} className={styles["submit-btn"]} style={{ color: 'whitesmoke', fontWeight: 500, fontSize: '20px' }} id="regis">Register</button>
                        </form>
                    ) :
                    (
                        <div>
                            {showOtp ? (
                                <div>
                                    <OtpInput OTPLength={6} OTPType="number" disable={false} autoFocus className="otp-container" value={otp} onChange={setOtp}></OtpInput>
                                    <button onClick={onOtpVerify} className='btn-verify'>
                                        {
                                            loading && <CgSpinner className='animate-spin'></CgSpinner>
                                        }
                                        <span>Verify OTP</span>
                                    </button>
                                </div>
                            )
                                :
                                (
                                    <div className='text-center'>
                                        <BsTelephone className="icon" />
                                        <label className="label">Enter your phone number</label>
                                        <div className="center-phone-input">
                                            <PhoneInput className="phone" country={"in"} value={phoneNumber} onChange={setPhoneNumber}></PhoneInput>
                                        </div>
                                        <button onClick={onSignUp} class='button'>
                                            {
                                                loading && <CgSpinner className='animate-spin' />
                                            }
                                            <span>Send code via SMS</span>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    )
            }
        </div>
    );
};
export default OTP;