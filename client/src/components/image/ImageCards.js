import React from 'react';

const ImageCards = (props) => {

    return (
        <div className="col-sm-auto my-2">
            <img src={props.image.url} alt={props.image.public_id} className="other-images"/>
        </div>
    )
}

export default ImageCards
