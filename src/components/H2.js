import React from 'react';
import PropTypes from 'prop-types';


const H2 = ({ children }) => (
    <span style={{ paddingTop: '20px', fontSize: '18pt' }}>
        {children}
    </span>
);

H2.propTypes = {
    children: PropTypes.element
};

export default H2;
