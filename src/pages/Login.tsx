import React, {useContext, useEffect} from 'react';
import './Login.css'
import {useNavigate} from "react-router-dom";
import TitleContext from "../context/titleContext";
export const LoginForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(true);
    const title = useContext(TitleContext);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setUsername('');
        setPassword('');
        setIsDisabled(true);
        if (username && password) {
            localStorage.setItem('auth', 'true')
            navigate('/dashboard')
        }
    }

    function handleChangeUsername(event) {
        setUsername(event.target.value.toLowerCase());
    }

    function handleChangePassword(event) {
        setPassword(event.target.value.toLowerCase());
    }

    useEffect(() => {
        if (password !== '' && username !== '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [username, password]);

    return (
        <div className={'Auth-form-container'}>
            <form className={'Auth-form'} onSubmit={handleSubmit}>
                <div className={'Auth-form-title'}>{title}</div>
                <div className={'Auth-form-content'}>
                    <div className={'Auth-form-value'}>
                        <label htmlFor="username-input">Username:</label>
                        <input
                            id="username-input"
                            type="text"
                            onChange={handleChangeUsername}
                            value={username}
                        />
                    </div>
                    <div className={'Auth-form-value'}>
                        <label htmlFor="password-input">Password:</label>
                        <input
                            id="password-input"
                            type="password"
                            onChange={handleChangePassword}
                            value={password}
                        />
                    </div>
                    <button className={'btn btn-primary'} id="login-button" type="submit" disabled={isDisabled}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
