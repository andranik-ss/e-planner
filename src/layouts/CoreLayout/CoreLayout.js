import React from 'react';

import '../../styles/core.scss';
import './CoreLayout.scss';

import Header from '../../components/Header';

export const CoreLayout = ({ children }) => {

    if (children.props.location && children.props.location.pathname.indexOf('app') >= 0) {
        return (
            <div className='text-center'>
                <div className='core-layout__viewport container'>
                    { children }
                </div>
            </div>
        )
    }

    return (
        <div className='text-center'>
            <Header landingPage={true}/>
            <div className='core-layout__viewport container'>
                { children }
            </div>
        </div>
    );
};

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
};

export default CoreLayout;
