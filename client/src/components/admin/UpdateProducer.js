import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducer, getProducerDetails, clearErrors } from '../../actions/producerActions';
import { UPDATE_PRODUCER_RESET } from '../../constants/producerConstants';

const UpdateProducer = ({ match, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');

    const [profile, setProfile] = useState('');
    const [oldProfile, setOldProfile] = useState('');
    const [profilePreview, setProfilePreview] = useState('');

    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { producer, error } = useSelector(state => state.producerDetails);
    
    const { loading, error: updateError, isUpdated } = useSelector(state => state.producer);
    
    const producerId = match.params.id;

    useEffect(() => {

        if (producer && producer._id !== producerId) {
            dispatch(getProducerDetails(producerId));
        } else {

            setName(producer.name);
            setEmail(producer.email);
            setWebsite(producer.website);
            setOldProfile(producer.profile.url);
            setOldImages(producer.images);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            history.push('/dashboard/producers');
            alert.success('Producer updated successfully');
            dispatch({ type: UPDATE_PRODUCER_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, producer, producerId]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('website', website);
        formData.set('profile', profile);

        images.forEach(image => {
            formData.append('images', image);
        });

        dispatch(updateProducer(producer._id, formData));
    }

    const onChange = e => {

        if (e.target.id === 'profile') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProfilePreview(reader.result);
                    setProfile(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);

        } else if (e.target.id === 'images') {
            const files = Array.from(e.target.files)

            setImagesPreview([]);
            setImages([]);

            files.forEach(file => {
                const reader = new FileReader();

                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImagesPreview(oldArray => [...oldArray, reader.result]);
                        setImages(oldArray => [...oldArray, reader.result]);
                    }
                }

                reader.readAsDataURL(file);
            });
        }
    }

    return (
        <Fragment>
            <MetaData title={'New Producer'} styles={'html, body, .App { background-color: #F3F3F3 !important; } .home-navbar {background: #141414 !important;} footer p {color: #000000 !important;}'} />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                        <Fragment>
                            <div className="wrapper my-5">
                                <form className="shadow-lg p-5 rounded-3 clearfix" onSubmit={submitHandler} encType='multipart/form-data'>
                                    <h1 className="mb-4">New Producer</h1>

                                    <div className="form-group mb-3">
                                        <label htmlFor="firstname">Name</label>
                                        <input type="text" id="firstname" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="lastname">Email</label>
                                        <input type="email" id="lastname" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="website">Website</label>
                                        <input type="text" id="website" className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)} required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="profile" className="form-label">Profile</label>
                                        <input className="form-control" filename="profile" type="file" id="profile" data-name="profile" onChange={onChange} required />
                                        
                                        {oldProfile ? <img src={oldProfile} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" /> : null}
                                        
                                        {profilePreview ? <img src={profilePreview} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" /> : null}
                                    </div>


                                    <div className='form-group mb-3'>
                                        <label htmlFor="images" className="form-label">Images</label>
                                        <input className="form-control" filename="images" type="file" id="images" data-name="images" onChange={onChange} required multiple />

                                        {oldImages && oldImages.map(img => (
                                            <img src={img.url} key={img.public_id} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                        ))}

                                        {imagesPreview.map(img => (
                                            <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                        ))}
                                    </div>


                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3 float-end"
                                        disabled={loading ? true : false}
                                    >
                                        UPDATE
                                    </button>

                                </form>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateProducer
