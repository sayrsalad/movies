import React from 'react';
import './loader.css';

const Loader = () => {
    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div className="d-flex justify-content-center">
                <div className="spinner spinner-border text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>

    )
}

export default Loader
