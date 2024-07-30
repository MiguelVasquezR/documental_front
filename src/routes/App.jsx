import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from '../view/Main/Main.jsx';
import BibliotecaView from '../view/Biblioteca/BibliotecaView.jsx';
import Informacion from '../view/Information/Informacion.jsx';
import PeliculaView from '../view/Pelicula/PeliculaView.jsx';
import AgregarPelicula from '../view/AgregarPelicula/AgregarPelicula.jsx';
import EditarPelicula from '../view/EditarPelicula/EditarPelicula.jsx';

import Texto from '../view/Texto/Texto.jsx';
import AgregarTexto from '../view/Texto/AgregarTexto.jsx';
import EditarTexto from '../view/Texto/EditarTexto.jsx';

import PrestamoView from '../view/Prestamo/PrestamoView.jsx';

import AgregarEstudiante from '../view/Prestamo/AgregarEstudiante.jsx';
import Devolucion from '../view/Prestamo/Devolucion.jsx';
import Videoteca from '../view/Videoteca/Videoteca.jsx';
import Login from '../view/Login.jsx';
import Error from '../view/Error.jsx';
import Usuario from '../view/Usuario/Usuario.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/biblioteca",
        element: <BibliotecaView />,
    },
    {
        path: "/videoteca",
        element: <Videoteca />,
    },
    {
        path: "/ver",
        element: <Informacion />
    },
    {
        path: "/texto",
        element: <Texto />      
    },
    {
        path: "/texto/agregar",
        element: <AgregarTexto />
    },
    {
        path: "/texto/editar",
        element: <EditarTexto />
    },
    {
        path: "/pelicula",
        element: <PeliculaView />,        
    },
    {
        path: "/pelicula/agregar",
        element: <AgregarPelicula />,
    },
    {
        path: "/pelicula/editar",
        element: <EditarPelicula />,
    },
    {
        path: "/prestamo",
        element: <PrestamoView />
    },
    {
        path: "/agregar-estudiante",
        element: <AgregarEstudiante />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "*",
        element: <Error />
    },
    {
        path: "/usuario",
        element: <Usuario />
    }

]);

const App = () => {
    return <RouterProvider router={router} />;
}

export default App;
