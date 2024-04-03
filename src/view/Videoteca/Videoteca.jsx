import React from 'react';

import Header from '../../component/Header/Header';

import Lupa from '../../images/Lupa';

const Videoteca = () => {
    return (
        <>
            <Header />

            <div className='border-[1px] border-solid rounded-md w-[300px] max-w-2xl h-[40px] bg-secondary-a mx-auto my-8 flex flex-row justify-center items-center'>
                <input type="text" placeholder="Buscar" className='bg-transparent h-[100%] border-none outline-none p-4 ' />
                <div className=''>
                    <Lupa color={'black'} w={28} />
                </div>
            </div>

        </>
    );
}

export default Videoteca;