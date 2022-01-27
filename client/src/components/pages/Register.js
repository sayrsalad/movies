import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';

import MetaData from '../layout/MetaData';
// import Loader from '../layout/Loader';

import { register, clearErrors } from '../../actions/authActions';


const Register = ({ history }) => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = user;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('https://res.cloudinary.com/djqpxmv5o/image/upload/v1639001382/movflix/avatars/1636619587424empty_profile_f28fsh.png');

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

    const registerHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('username', username);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        // formData.set('avatar', avatar);
        dispatch(register(formData));
    };

    const onChange = e => {

        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    return (
        <Fragment>
            <MetaData title={'Register'} styles={'html, body, .App { background-color: #0d0d0d !important; }'} />
            <section className="h-50">
                <div className="container py-5 h-50">
                    <div className="row d-flex justify-content-center align-items-center h-75">
                        <div className="col col-xl-10">
                            <div className="card rounded-3 shadow-lg border-0 login-bg">
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="/images/image1.jpg"
                                            alt="login form"
                                            className="img-fluid rounded-3" />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-secondary">
                                            <form onSubmit={registerHandler} encType='multipart/form-data'>
                                                <div className="d-flex align-items-center mb-3 pb-1 text-white">
                                                    {/* <FontAwesomeIcon icon="film" className="fa-3x me-3" /> */}
                                                    <span className="h1 fw-semibold mb-0 auth-logo">Movflix</span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3 text-secondary">Create your new account</h5>

                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control bg-dark border-0 text-white remove-form-design" id="username" placeholder="Username" name="username" value={username} onChange={onChange} required />
                                                    <label htmlFor="username">Username</label>
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <input type="email" className="form-control bg-dark border-0 text-white remove-form-design" id="email" placeholder="name@example.com" name="email" value={email} onChange={onChange} required />
                                                    <label htmlFor="email">Email address</label>
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <input type="password" className="form-control bg-dark border-0 text-white remove-form-design" id="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                                                    <label htmlFor="password">Password</label>
                                                </div>

                                                <div className="form-floating mb-3">
                                                    <input type="password" className="form-control bg-dark border-0 text-white remove-form-design" id="confirmpassword" placeholder="Confirm Password" name="confirmpassword" required />
                                                    <label htmlFor="confirmpassword">Password</label>
                                                </div>



                                                <div className="input-group mb-3 text-center">
                                                    <span className="" id="input-group-left-example">
                                                        <figure className='avatar'>
                                                            <img
                                                                src={avatarPreview}
                                                                className='rounded'
                                                                alt='Avatar Preview'
                                                            />
                                                        </figure>
                                                    </span>

                                                    <input className="form-control bg-dark border-0 remove-form-design avatar-input text-secondary" filename="avatar" type="file" id="avatar" data-name="avatar" name="avatar" onChange={onChange} />

                                                </div>

                                                {/* <div className='bg-dark p-2 rounded'>
                                                    <div className='d-flex align-items-center'>
                                                        <div className="mb-3">
                                                            <input className="form-control bg-dark border-0 text-white remove-form-design" filename="avatar" type="file" id="avatar" data-name="avatar" name="avatar" onChange={onChange} />
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div className="pt-1 mt-3 mb-4">
                                                    <button className="btn btn-danger btn-lg btn-block" disabled={loading ? true : false} type="submit">Register</button>
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
        </Fragment>
    )
}

export default Register
