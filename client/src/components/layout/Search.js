import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './search.css';

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState("");

    const searchHandler = (e) => {
        e.preventDefault();
        
        if (keyword.trim) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');         
        }
    }

    return (
        <form onSubmit={searchHandler} className="d-flex ms-auto">
            <div className="input-group me-3">
                <input
                    className="form-control bg-dark border-0 text-white remove-form-design"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn border-0 text-white remove-form-design" type="submit"><FontAwesomeIcon icon="search" /></button>
            </div>
        </form>
    )
}

export default Search
