import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logout } from '../../actions/authActions';

import Search from './Search';

import './header.css';

const Header = ({ history }) => {

    const [dropdown, setDropdown] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
            <nav className="navbar home-navbar navbar-expand-lg navbar-dark sticky-top topbar">
                <div className="mx-4 container-fluid">
                    <Link className="me-3 logo-brand" to="/">MOVFLIX</Link>
                    {/* <a className="me-3 logo-brand" href="/#">MOVFLIX</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="fw-bold nav-link text-white" to="/">Home</Link>
                                {/* <a className="fw-bold nav-link text-white" href="/#">Home <span className="sr-only">(current)</span></a> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/actors">Actors</Link>
                                {/* <a className="nav-link text-white" href="/actor">Actors</a> */}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/#">Producers</a>
                            </li>
                        </ul>
                        <Route render={({ history }) => <Search history={history} />} />

                        {user ? (
                            <ul className="navbar-nav mb-2 mb-lg-0" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
                                <li className="nav-item dropdown">
                                    {/* data-bs-toggle="dropdown" */}
                                    <a className={dropdown === true ? "nav-link dropdown-toggle show" : "nav-link dropdown-toggle"} href="/me" id="navbarDropdown" role="button" aria-expanded={dropdown}>
                                        <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded header-profile" />
                                    </a>
                                    <ul className={dropdown === true ? "dropdown-menu dropdown-menu-end m-0 bg-dark show" : "dropdown-menu dropdown-menu-end m-0 bg-dark"} aria-labelledby="navbarDropdown" data-bs-popper="">
                                        <li><a className="dropdown-item link-dark text-white" href="/me">Profile</a></li>
                                        {user && user.role === 'admin' && (
                                            <li><a className="dropdown-item link-dark text-white" href="/dashboard">Dashboard</a></li>
                                        )}
                                        <li><hr className="dropdown-divide text-white m-1" /></li>
                                        {/* <Link className="dropdown-item link-dark text-white" to="/" onClick={logoutHandler}>Logout</Link> */}
                                        <li><a className="dropdown-item link-dark text-white" onClick={logoutHandler} href="/">Logout</a></li>
                                    </ul>
                                </li>
                            </ul>

                        ) : !loading && <a className="btn btn-danger" id="loginBtn" href="/login">Login</a>}

                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header
