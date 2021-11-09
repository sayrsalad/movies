import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import image1 from '../../../assets/images/image1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = ({ history }) => {
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
                    <div className="col col-lg-10">
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
                                        <form>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <FontAwesomeIcon icon="film" className="fa-3x me-3" />
                                                <span className="h1 fw-bold mb-0">Movies</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3">Create your new account</h5>

                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="username" placeholder="Username" required />
                                                <label htmlFor="username">Username</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control" id="email" placeholder="name@example.com" required />
                                                <label htmlFor="email">Email address</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control" id="password" placeholder="Password" required />
                                                <label htmlFor="password">Password</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password" required />
                                                <label htmlFor="confirmpassword">Password</label>
                                            </div>

                                            <div className="pt-1 mt-3 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block" type="button">Register</button>
                                            </div>

                                            {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                                            <p >Already have an account? <Link className="link-primary" to='/login'>Sign In</Link></p>
                                            {/* <a href="#!" className="small text-muted">Terms of use.</a>
                                            <a href="#!" className="small text-muted">Privacy policy</a> */}
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

export default Register;