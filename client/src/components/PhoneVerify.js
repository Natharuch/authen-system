import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const PhoneVerify = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const postVerification = async () => {
        fetch("http://localhost:4000/api/verification", {
            method: "POST",
            body: JSON.stringify([code]),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async(res) => res.json())
            .then(async(data) => {
                if (data.error_message) {
                    alert(data.error_message);
                } else {
                    //👇🏻 Navigates to the dashboard page
                    navigate("/dashboard");
                }
            })
            .catch((err) => console.error(err));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        //👇🏻 Calls the function
        postVerification();
        setCode("");
    };

    const QRCode = 'qrcode'
    window.addEventListener("load", () => {
        const uri = document.getElementById("qrCodeData").getAttribute('data-url');
        new QRCode(document.getElementById("qrCode"),
          {
            text: uri,
            width: 150,
            height: 150
          });
      });
    
    return (
        <div className='verify'>
            <h2 style={{ marginBottom: "30px" }}>Verify your Phone number</h2>
            <form className='verify__form' onSubmit={handleSubmit}>
            <div id="qrcode"></div>
                <script type="text/javascript">
                new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");
                </script>

                <label htmlFor='code' style={{ marginBottom: "10px" }}>
                    A code has been sent your phone
                </label>
                <input
                    type='text'
                    name='code'  
                    id='code'
                    className='code'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <button className='codeBtn'>AUTHENTICATE</button>
            </form>
        </div>
    );
};

export default PhoneVerify;