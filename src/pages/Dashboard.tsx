import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Header} from "../components/Header";
import {TitleContext} from "../context/titleContext";

export function Dashboard() {
    const auth = localStorage.getItem('auth');
    const navigate = useNavigate();
    const title = useContext(TitleContext)

    useEffect(() => {
        if (auth !== 'true') {
            navigate('/login')
        }
    });
    return (
        <Header title={title}/>
    )
}
