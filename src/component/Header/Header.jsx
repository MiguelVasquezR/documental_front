import {React, useState} from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../images/Menu'

import Logo from '../../images/Logo.png'
import Close from '../../images/Close'

const Header = () => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActive(!active);
    }

    if (active){
        return (
            <div className='bg-primary w-screen h-screen relative flex flex-col justify-center items-center'>

                <div className='fixed top-8 right-8' onClick={handleClick}>
                    <Close color={'white'} w={32} />
                </div>  

                <ul className='text-secondary-a'>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/"}>Inicio</Link>
                    </li>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/biblioteca"}>Biblioteca</Link>                        
                    </li>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/videoteca"}>Videoteca</Link>
                    </li>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/prestamo"}>Prestamo</Link>
                    </li>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/devoluciones"}>Devoluciones</Link>
                    </li>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/texto"}>Libro</Link>
                    </li>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/pelicula"}>Película</Link>
                    </li>
                </ul>

            </div>
        );
    }

    return (
        <>
            <header className='bg-primary w-screen flex flex-row justify-between items-center px-4'>
                <div onClick={handleClick}>
                    <Menu color={'white'} w={32} />
                </div>
            
                <section className='text-secondary-a flex flex-row items-center justify-center'>
                    <img src={Logo} className='w-[100px]'/>
                    <h1 className=''>Centro Documental</h1>
                </section>
            </header>                    
        </>
    );
}

export default Header;