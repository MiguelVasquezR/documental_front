import {React, useState} from 'react'

import Lupa from '../../images/Lupa.jsx'

const Barra = ({}) => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }



    const handleKeyPress = (e) => {
        setSearch(e.target.value);
    }


    return (
        <div className='border-[1px] border-solid rounded-md w-[300px] max-w-2xl h-[40px] bg-secondary-a mx-auto my-8 flex flex-row justify-center items-center'>
            <input type="text" placeholder="Buscar" onChange={handleKeyPress} value={search} className='bg-transparent h-[100%] border-none outline-none p-4 '/>
            <div onClick={handleSearch} className=''>
                <Lupa color={'black'} w={28} />
            </div>
        </div>
    )
}


export default Barra;