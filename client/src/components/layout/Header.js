import React, { Fragment, useState } from 'react';
import { Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Search from './Search';

import './header.css';
import './search.css';

const Header = () => {

    const [dropdown, setDropdown] = useState("");
    // const alert = useAlert();
    // const dispatch = useDispatch();

    // const { user, loading } = useSelector(state => state.auth)
    // const { cartItems } = useSelector(state => state.cart)

    // const logoutHandler = () => {
    //     dispatch(logout());
    //     alert.success('Logged out successfully.')
    // }

    return (
        <Fragment>
            <nav className="navbar home-navbar navbar-expand-lg navbar-dark sticky-top topbar">
                <div className="mx-4 container-fluid">
                    <a className="me-3 logo-brand" href="/#">MOVFLIX</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="fw-bold nav-link text-white" href="/#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/#">Actors</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/#">Producers</a>
                            </li>
                        </ul>
                        <Route render={({ history }) => <Search history={history} />} />
                        <ul className="navbar-nav mb-2 mb-lg-0" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
                            <li className="nav-item dropdown">
                                <a className={dropdown === true ? "nav-link dropdown-toggle show" : "nav-link dropdown-toggle"} href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={dropdown}>
                                    <FontAwesomeIcon icon="user" />
                                </a>
                                <ul className={dropdown === true ? "dropdown-menu dropdown-menu-end m-0 show" : "dropdown-menu dropdown-menu-end m-0"} aria-labelledby="navbarDropdown" data-bs-popper="">
                                    <li><a className="dropdown-item" href="/#">Profile</a></li>
                                    <li><a className="dropdown-item" href="/#">Dashboard</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/#">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header
