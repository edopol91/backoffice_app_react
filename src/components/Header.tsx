import {useNavigate, NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faChartSimple, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
export function Header({title}) {
    const navigate = useNavigate();

    function logout(event) {
        event.preventDefault();
        localStorage.setItem('auth', 'false')
        navigate('/login')
    }

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <span>
                            {title}
                        </span>
                    </li>
                    <li>
                        <NavLink to={"products"}>
                            <FontAwesomeIcon color={'white'} icon={faBars} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"chart"}>
                            <FontAwesomeIcon color={'white'} icon={faChartSimple} />
                        </NavLink>
                    </li>
                </ul>
                <div className="button-container">
                    <div onClick={logout}>
                        <FontAwesomeIcon color={'white'} icon={faRightFromBracket} />
                    </div>
                </div>
            </nav>
        </header>
    )
}
