import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { login, clearErrors } from '../../actions/authActions';

import './login.css';

const Login = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/');
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }


    }, [dispatch, alert, isAuthenticated, error, history]);

    const loginHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} styles={'html, body, .App { background-color: #0d0d0d !important; }'}/>
                    <section className="h-50">
                        <div className="container py-5 h-50">
                            <div className="row d-flex justify-content-center align-items-center h-75">
                                <div className="col col-xl-10">
                                    <div className="card rounded-3 shadow border-0 login-bg">
                                        <div className="row g-0">
                                            <div className="col-md-6 col-lg-5 d-none d-md-block">
                                                <img
                                                    src="/images/image1.jpg"
                                                    alt="login form"
                                                    className="img-fluid rounded-3" />
                                            </div>
                                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                                <div className="card-body p-4 p-lg-5 text-secondary">
                                                    <form onSubmit={loginHandler}>
                                                        <div className="d-flex align-items-center mb-3 pb-1 text-white">
                                                            {/* <FontAwesomeIcon icon="film" className="fa-3x me-3" /> */}
                                                            <span className="h1 fw-semibold mb-0 auth-logo">Movflix</span>
                                                        </div>

                                                        <h5 className="fw-normal mb-3 pb-3 text-secondary">Sign into your account</h5>

                                                        {error && <div className="mb-3"><span className="alert alert-danger d-flex">{error}</span></div>}

                                                        <div className="form-floating mb-3">
                                                            <input type="email" className="form-control bg-dark border-0 text-white remove-form-design" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                            <label htmlFor="email">Email address</label>
                                                        </div>

                                                        <div className="form-floating mb-3">
                                                            <input type="password" className="form-control bg-dark border-0 text-white remove-form-design" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                            <label htmlFor="password">Password</label>
                                                        </div>

                                                        <div className="pt-1 mb-4">
                                                            <button className="btn btn-danger btn-lg btn-block shadow-lg" type="submit">Login</button>
                                                        </div>
                                                        
                                                        <Link to="#" className="small text-secondary">Forgot password?</Link>
                                                        <p className="mb-5 pb-lg-2 text-secondary">Don't have an account? <Link className="link-light" to='/register'>Register Here</Link></p>
                                                        <a href="#!" className="small text-secondary">Terms of use.</a>
                                                        <a href="#!" className="small text-secondary">Privacy policy</a>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
