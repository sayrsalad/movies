import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = (props) => {
    return (
        <div className={props.sidebarToggle === true ? "sidebar h-100 close" : "sidebar h-100"}>
                <Link to="/dashboard" className="text-decoration-none text-white">
                    <div className="logo-details">
                        <FontAwesomeIcon icon="ticket-alt" className="text-white" />
                        <span className="logo_name fs-5 text-nowrap">Dashboard</span>
                    </div>
                </Link>
                <ul className="nav-links px-0 pt-3">
                    <li>
                        <Link to="/dashboard/movies">
                            <FontAwesomeIcon icon="film" className="text-white" />
                            <span className="link_name fs-6">Movie</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link to="/movie" className="link_name">Movies</Link></li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/dashboard/actor">
                            <FontAwesomeIcon icon="theater-masks" className="text-white" />
                            <span className="link_name fs-6">Actors</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link to="/actor" className="link_name">Actors</Link></li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/dashboard/producer">
                            <FontAwesomeIcon icon="bullhorn" className="text-white" />
                            <span className="link_name fs-6">Producers</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link to="/producer" className="link_name">Genres</Link></li>
                        </ul>
                    </li>

                    {/* <li className={dropdown === true ? "showMenu" : ""}>
                <div className="iocn-link">
                    <a href="/#">
                        <i className='bx bx-collection' ></i>
                        <span className="link_name">Category</span>
                    </a>
                    <FontAwesomeIcon icon="caret-down" className="text-white arrow" onClick={toggleDropdown} />
                </div>
                <ul className="sub-menu">
                    <li><a className="link_name" href="/#">Category</a></li>
                    <li><a href="/#">HTML CSS</a></li>
                    <li><a href="/#">JavaScript</a></li>
                    <li><a href="/#">PHP MySQL</a></li>
                </ul>
            </li> */}

                    {/* <li>
                <div className="profile-details">
                    <div className="profile-content">
                        <img src={empty_profile} alt=" " />
                    </div>
                    <div className="name-job">
                        <div className="profile_name">Prem Shahi</div>
                        <div className="job">Web Desginer</div>
                    </div>
                    <i className='bx bx-log-out' ></i>
                </div>
            </li> */}
                </ul>
        </div>
    )
}

export default Sidebar
