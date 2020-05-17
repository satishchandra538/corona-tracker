import React from 'react';
import './countries.css';

import Country from './country';

const Countries = (props) => {
    return (
        <div className="row countries">
            <Country {...props} />
        </div>
    )
}
export default Countries;