import React from 'react';

import Country from './country';

const Countries = (props) => {
    return (
        <div className="row">
            <Country {...props} />
        </div>
    )
}
export default Countries;