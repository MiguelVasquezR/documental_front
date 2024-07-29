import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";

import Menu from '../../images/Menu'

import Logo from '../../images/Logo.png'
import Close from '../../images/Close'

const Header = () => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActive(!active);
    }


    const handleLogout = () => {
        localStorage.removeItem('usuario');
        window.location.href = "/login";
    }

    if (active) {
        return (
            <div className='fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-primary'>

                <div className='absolute top-8 right-8' onClick={handleClick}>
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
                        <Link to={"/devolucion"}>Devoluciones</Link>
                    </li>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/texto"}>Libros</Link>
                    </li>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/pelicula"}>Película</Link>
                    </li>
                    <li className='p-4 text-lg font-bold text-center' >
                        <Link to={"/usuario"}>Usuarios</Link>
                    </li>
                </ul>

            </div>
        );
    }

    return (
        <>
            <header className='flex flex-row items-center justify-between w-screen px-4 bg-primary'>
                <div onClick={handleClick} className='lg:hidden'>
                    <Menu color={'white'} w={32} />
                </div>

                <nav className='hidden lg:flex text-secondary-a'>
                    <ul className='flex flex-row'>
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
                            <Link to={"/devolucion"}>Devoluciones</Link>
                        </li>
                        <li className='p-4 text-lg font-bold text-center' >
                            <Link to={"/texto"}>Libros</Link>
                        </li>
                        <li className='p-4 text-lg font-bold text-center' >
                            <Link to={"/pelicula"}>Película</Link>
                        </li>
                        <li className='p-4 text-lg font-bold text-center' >
                            <Link to={"/usuario"}>Usuarios</Link>
                        </li>
                    </ul>
                </nav>


                <div className='flex flex-row items-center justify-center gap-5'>
                    <section className='flex flex-row items-center justify-center text-secondary-a'>
                        <img src={Logo} className='w-[100px]' />
                        <h1 className=''>Centro Documental</h1>
                    </section>
                    <CiLogout onClick={handleLogout} size={35} color='white' className='cursor-pointer' />
                </div>

            </header>
        </>
    );
}

export default Header;