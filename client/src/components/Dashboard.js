import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

useState(() => {
        const checkUser = () => {
            if (!localStorage.getItem("username")) {
                navigate("/");
            }
        };
        checkUser();
    }, [navigate]);

    const handleSignOut = () => {
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <div className='dashboard'>
            <h2 style={{ marginBottom: "30px" }}>Nathauch Ketubol</h2>
            <button className='signOutBtn' onClick={handleSignOut}>
                SIGN OUT
            </button>
        </div>
    );
};

export default Dashboard;