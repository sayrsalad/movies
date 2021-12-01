import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import image1 from '../../../assets/images/image1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			history.push("/");
		}
	}, [history]);

	const loginHandler = async (e) => {
		e.preventDefault();

		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};

		try {
			const { data } = await axios.post(
				"/api/auth/login",
				{ email, password },
				config
			);

			localStorage.setItem("authToken", data.token);

			history.push("/");
		} catch (error) {
			setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
		}
	};

	return (
		<section className="h-50">
			<div className="container py-5 h-50">
				<div className="row d-flex justify-content-center align-items-center h-75">
					<div className="col col-xl-10">
						<div className="card rounded-3 shadow-lg border-0">
							<div className="row g-0">
								<div className="col-md-6 col-lg-5 d-none d-md-block">
									<img
										src={image1}
										alt="login form"
										className="img-fluid rounded-3" />
								</div>
								<div className="col-md-6 col-lg-7 d-flex align-items-center">
									<div className="card-body p-4 p-lg-5 text-black ">
										<form onSubmit={loginHandler}>
											<div className="d-flex align-items-center mb-3 pb-1">
												<FontAwesomeIcon icon="film" className="fa-3x me-3" />
												<span className="h1 fw-bold mb-0">Movies</span>
											</div>

											<h5 className="fw-normal mb-3 pb-3">Sign into your account</h5>

											{error && <div className="mb-3"><span className="alert alert-danger d-flex">{error}</span></div>}

											<div className="form-floating mb-3">
												<input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
												<label htmlFor="email">Email address</label>
											</div>

											<div className="form-floating mb-3">
												<input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
												<label htmlFor="password">Password</label>
											</div>

											<div className="pt-1 mb-4">
												<button className="btn btn-dark btn-lg btn-block shadow-lg" type="submit">Login</button>
											</div>

											<a className="small text-muted" href="#!">Forgot password?</a>
											<p className="mb-5 pb-lg-2">Don't have an account? <Link className="link-primary" to='/register'>Register Here</Link></p>
											<a href="#!" className="small text-muted">Terms of use.</a>
											<a href="#!" className="small text-muted">Privacy policy</a>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;