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
    }
]);

const App = () => {
    return <RouterProvider router={router} />;
}

export default App;
