import React, { Component } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/css/Sidebar.css';
import empty_profile from '../../assets/images/empty_profile.png';
import { withRouter } from "react-router-dom";


const Navbar = ({ history }) => {

	const [sidebar, setSidebar] = useState("");

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

	return (
		<>

			{/* onMouseEnter={sidebarOpen} onMouseLeave={sidebarClose} */}
			<div className={sidebar === true ? "sidebar h-100 close" : "sidebar h-100"}>
				<div className="logo-details">
					<FontAwesomeIcon icon="user" className="text-white" />
					<span className="logo_name">CodingLab</span>
				</div>
				<ul className="nav-links">
					<li>
						<a href="/#">
							<i className='bx bx-grid-alt' ></i>
							<span className="link_name">Dashboard</span>
						</a>
						<ul className="sub-menu blank">
							<li><a className="link_name" href="/#">Category</a></li>
						</ul>
					</li>
					<li>
						<div className="iocn-link">
							<a href="/#">
								<i className='bx bx-collection' ></i>
								<span className="link_name">Category</span>
							</a>
							<FontAwesomeIcon icon="caret-down" className="text-white arrow"/>
						</div>
						<ul className="sub-menu">
							<li><a className="link_name" href="/#">Category</a></li>
							<li><a href="/#">HTML CSS</a></li>
							<li><a href="/#">JavaScript</a></li>
							<li><a href="/#">PHP MySQL</a></li>
						</ul>
					</li>
					<li>
						<div className="iocn-link">
							<a href="/#">
								<i className='bx bx-book-alt' ></i>
								<span className="link_name">Posts</span>
							</a>
							<FontAwesomeIcon icon="caret-down" className="text-white arrow"/>
						</div>
						<ul className="sub-menu">
							<li><a className="link_name" href="/#">Posts</a></li>
							<li><a href="/#">Web Design</a></li>
							<li><a href="/#">Login Form</a></li>
							<li><a href="/#">Card Design</a></li>
						</ul>
					</li>
					<li>
						<a href="/#">
							<i className='bx bx-pie-chart-alt-2' ></i>
							<span className="link_name">Analytics</span>
						</a>
						<ul className="sub-menu blank">
							<li><a className="link_name" href="/#">Analytics</a></li>
						</ul>
					</li>
					<li>
						<a href="/#">
							<i className='bx bx-line-chart' ></i>
							<span className="link_name">Chart</span>
						</a>
						<ul className="sub-menu blank">
							<li><a className="link_name" href="/#">Chart</a></li>
						</ul>
					</li>
					<li>
						<div className="iocn-link">
							<a href="/#">
								<i className='bx bx-plug' ></i>
								<span className="link_name">Plugins</span>
							</a>
							<FontAwesomeIcon icon="caret-down" className="text-white arrow"/>
						</div>
						<ul className="sub-menu">
							<li><a className="link_name" href="/#">Plugins</a></li>
							<li><a href="/#">UI Face</a></li>
							<li><a href="/#">Pigments</a></li>
							<li><a href="/#">Box Icons</a></li>
						</ul>
					</li>
					<li>
						<a href="/#">
							<i className='bx bx-compass' ></i>
							<span className="link_name">Explore</span>
						</a>
						<ul className="sub-menu blank">
							<li><a className="link_name" href="/#">Explore</a></li>
						</ul>
					</li>
					<li>
						<a href="/#">
							<i className='bx bx-history'></i>
							<span className="link_name">History</span>
						</a>
						<ul className="sub-menu blank">
							<li><a className="link_name" href="/#">History</a></li>
						</ul>
					</li>
					<li>
						<a href="/#">
							<i className='bx bx-cog' ></i>
							<span className="link_name">Setting</span>
						</a>
						<ul className="sub-menu blank">
							<li><a className="link_name" href="/#">Setting</a></li>
						</ul>
					</li>
					{/* <li>
						<div className="profile-details">
							<div className="profile-content">
								<img src={empty_profile} alt=" " />
							</div>
							<div className="name-job">
								<div className="profile_name">Prem Shahi</div>
								<div claclassNamess="job">Web Desginer</div>
							</div>
							<i className='bx bx-log-out' ></i>
						</div>
					</li> */}
				</ul>
			</div>
			<section className="home-section">
				<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
					<div className="container-fluid">
						<FontAwesomeIcon icon="user" onClick={sidebarToggle} className="text-white" />
						<a className="navbar-brand fw-bold" href="/#">Movies</a>
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

			</section>
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