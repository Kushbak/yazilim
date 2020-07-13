import React from 'react';
import preloader from '../../../assets/images/preloader.gif'

const Preloader = () => {
    return (
        <div className='preloader'>
            {}
            <img src={ preloader } alt="Loading"/>
        </div>
    )
}

export default Preloader;