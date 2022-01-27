import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = (props) => {

    const toggleDropdown = (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
    }


    return (
        <div className={props.sidebarToggle === true ? "sidebar h-100 close" : "sidebar h-100"}>
            <Link to="/" className="text-decoration-none text-white">
                <div className="logo-details">
                    {/* <FontAwesomeIcon icon="ticket-alt" className="text-white" /> */}
                    <span className="logo_name fw-bold text-nowrap mx-auto display-6 text-danger">MOVFLIX</span>
                </div>
            </Link>
            <ul className="nav-links px-0 pt-3">
                <li>
                    <div className="iocn-link">
                        <Link to="/dashboard">
                            <FontAwesomeIcon icon="tachometer-alt" className="text-white main-side-nav-icon" />
                            <span className="link_name fs-6">Dashboard</span>
                        </Link>
                        {/* <FontAwesomeIcon icon="chevron-down" className="text-white arrow" onClick={toggleDropdown} /> */}
                    </div>
                    <ul className="sub-menu">
                        <li><Link to="/dashboard" className="link_name">Dashboard</Link></li>
                    </ul>
                </li>

                <li>
                    <div className="iocn-link">
                        <Link to="/dashboard/movies">
                            <FontAwesomeIcon icon="film" className="text-white main-side-nav-icon" />
                            <span className="link_name fs-6">Movies</span>
                        </Link>
                        <FontAwesomeIcon icon="chevron-down" className="text-white arrow" onClick={toggleDropdown} />
                    </div>
                    <ul className="sub-menu">
                        <li><Link to="/dashboard/movies" className="link_name">Movies</Link></li>
                        <li><Link to="/dashboard/movie/add"><FontAwesomeIcon icon="plus" className="submenu-side-nav-icon" />Add Movie</Link></li>
                    </ul>
                </li>

                <li>
                    <div className="iocn-link">
                        <Link to="/dashboard/actors">
                            <FontAwesomeIcon icon="theater-masks" className="text-white main-side-nav-icon" />
                            <span className="link_name fs-6">Actors</span>
                        </Link>
                        <FontAwesomeIcon icon="chevron-down" className="text-white arrow" onClick={toggleDropdown} />
                    </div>
                    <ul className="sub-menu">
                        <li><Link to="/dashboard/actors" className="link_name">Actor</Link></li>
                        <li><Link to="/dashboard/actor/add"><FontAwesomeIcon icon="plus" className="submenu-side-nav-icon" />Add Actor</Link></li>
                    </ul>
                </li>

                <li>
                    <div className="iocn-link">
                        <Link to="/dashboard/producers">
                            <FontAwesomeIcon icon="bullhorn" className="text-white main-side-nav-icon" />
                            <span className="link_name fs-6">Producers</span>
                        </Link>
                        <FontAwesomeIcon icon="chevron-down" className="text-white arrow" onClick={toggleDropdown} />
                    </div>
                    <ul className="sub-menu">
                        <li><Link to="/dashboard/producers" className="link_name">Producers</Link></li>
                        <li><Link to="/dashboard/producer/add"><FontAwesomeIcon icon="plus" className="submenu-side-nav-icon" />Add Producer</Link></li>
                    </ul>
                </li>


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
