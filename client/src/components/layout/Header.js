import React, { Fragment } from 'react';
// import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './header.css';

const Header = () => {
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
                                <a className="nav-link text-white" href="/#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/#">Pricing</a>
                            </li>
                        </ul>
                        <form className="d-flex ms-auto">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
								<button className="btn btn-outline-success" type="submit">Search</button> */}
                        </form>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon="user" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
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
