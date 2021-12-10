import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} styles={'html, body, .App { background-color: #F3F3F3 !important; } .home-navbar {background: #141414 !important;} footer p {color: #000000 !important;}'} />
                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-2">
                                    <img className="rounded mt-4" width="150px" src={user.avatar.url} alt={user.avatar.public_id}/>
                                    <span className="font-weight-bold mt-4">{user.username}</span>
                                    <span className="text-black-50">{user.email}</span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="col-md-5 border-right">

                            </div>
                            <div className="col-md-4">
                                <div className="p-3 py-5">
                                    
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div> */}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
