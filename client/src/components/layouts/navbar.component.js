/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/css/Sidebar.css';
import empty_profile from '../../assets/images/empty_profile.png';
import { Link, withRouter } from "react-router-dom";


const Navbar = ({ props, history }) => {

	const [sidebar, setSidebar] = useState("");
	const [dropdown, setDropdown] = useState("");

	const parseJwt = (token) => {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	};

	const logoutHandler = () => {
		localStorage.removeItem("authToken");
		history.push("/login");
	}

	const sidebarToggle = () => {
		setSidebar(!sidebar);
	}

	const sidebarClose = () => {
		setSidebar(true);
	}

	const sidebarOpen = () => {
		setSidebar(false);
	}

	const toggleDropdown = () => {
		setDropdown(!dropdown);
	}

	useEffect(() => {
		try {
			const { exp } = parseJwt(localStorage.getItem("authToken"));
			const expirationTime = (exp * 1000) - 60000;

			if (Date.now() > expirationTime) {
				logoutHandler();
			}

		} catch (error) {
			console.log(error);
		}

	});

	return (
		<>

			{/* onMouseEnter={sidebarOpen} onMouseLeave={sidebarClose} */}
			<div className={sidebar === true ? "sidebar h-100 close" : "sidebar h-100"}>
				<Link to="/" className="text-decoration-none text-white">
					<div className="logo-details">
						<FontAwesomeIcon icon="ticket-alt" className="text-white" />
						<span className="logo_name fs-5">Cinema</span>
					</div>
				</Link>
				<ul className="nav-links px-0 pt-3">
					<li>
						<Link to="/movie">
							<FontAwesomeIcon icon="film" className="text-white" />
							<span className="link_name fs-6">Movie</span>
						</Link>
						<ul className="sub-menu blank">
							<li><Link to="/movie" className="link_name">Movies</Link></li>
						</ul>
					</li>

					<li>
						<Link to="/actor">
							<FontAwesomeIcon icon="theater-masks" className="text-white" />
							<span className="link_name fs-6">Actors</span>
						</Link>
						<ul className="sub-menu blank">
							<li><Link to="/actor" className="link_name">Actors</Link></li>
						</ul>
					</li>

					<li>
						<Link to="/genre">
							<FontAwesomeIcon icon="feather-alt" className="text-white" />
							<span className="link_name fs-6">Genres</span>
						</Link>
						<ul className="sub-menu blank">
							<li><Link to="/genre" className="link_name">Genres</Link></li>
						</ul>
					</li>

					<li>
						<Link to="/producer">
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

				<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top home-section topbar">
					<div className="container-fluid">
						<FontAwesomeIcon icon="bars" onClick={sidebarToggle} className="sidebar-toggler" size="2x" />
						{/* <a className="navbar-brand fw-bold" href="/#">Movies</a> */}
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
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
										<li><a className="dropdown-item" href="/#">Action</a></li>
										<li><a className="dropdown-item" href="/#">Another action</a></li>
										<li><hr className="dropdown-divider" /></li>
										<li><a className="dropdown-item" href="/#" onClick={logoutHandler}>Logout</a></li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</nav>


		</>
		// <nav className="navbar navbar-expand-md navbar-dark bg-dark">
		//     <div className="container-fluid">
		//         <Link className="navbar-brand" to="/">Movies</Link>
		//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
		//             <span className="navbar-toggler-icon"></span>
		//         </button>
		//         <div className="collapse navbar-collapse" id="navbarCollapse">
		//             <ul className="navbar-nav me-auto mb-2 mb-md-0">
		//                 <li className="nav-item">
		//                     <Link className="nav-link" to="/movie">Movies</Link>
		//                 </li>
		//                 <li className="nav-item">
		//                     <Link className="nav-link" to="/actor">Actors</Link>
		//                 </li>
		//                 <li className="nav-item">
		//                     <Link className="nav-link" to="/producer">Producers</Link>
		//                 </li>
		//                 <li className="nav-item">
		//                     <Link className="nav-link" to="/genre">Genres</Link>
		//                 </li>
		//             </ul>

		//         </div>
		//     </div>
		// </nav>
	)


}

export default withRouter(Navbar);