import React from 'react';

import Header from '../component/Header/Header';
import ErrorImg from '../images/Error.png'

const Error = () => {
    return(
        <>
            <Header />
            <div className='flex flex-col items-center justify-center'>
                <p className='text-[20px] font-bold text-center m-5'>Está página no es posible localizar</p>
                <p className='text-[20px] font-bold text-center'>404</p>
                <img src={ErrorImg} className='w-[100px]' />
            </div>
            
        </>
    )
}

export default Error;