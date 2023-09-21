import React, {useContext, useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Header} from "../components/Header";
import {TitleContext} from "../context/titleContext";
import {Chart} from "../components/Chart";

export function Dashboard() {
    const auth = localStorage.getItem('auth');
    const navigate = useNavigate();
    const title = useContext(TitleContext)

    useEffect(() => {
        if (auth !== 'true') {
            navigate('/login')
        }
        }, [auth, navigate]
    );
    return (
        <>
        <Header title={title}/>
            <Routes>
                <Route path={'/chart'} element={<Chart/>}></Route>
            </Routes>
        </>
    )
}
