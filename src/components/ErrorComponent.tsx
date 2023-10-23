import {useNavigate} from "react-router-dom";
import './error-component.css';

export function ErrorComponent() {

    const navigate = useNavigate();

    function goToDashboard() {
        navigate(0)
    }

    return (
        <div className={'error-page'}>
            <h1>Something went wrong</h1>
            <button className={'btn btn-primary'} onClick={goToDashboard}>Reload page</button>
        </div>
    )
}
