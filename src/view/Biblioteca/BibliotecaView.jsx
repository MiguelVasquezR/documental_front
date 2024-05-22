import { React, useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../component/Header/Header';
import CardItem from '../../component/CardItem/CardItem';
import Lupa from '../../images/Lupa.jsx'
import CargandoLibro from '../../component/Loaders/CargandoLibro/Cargando';

const BibliotecaView = () => {
  const [libros, setLibros] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoaging] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const librosFiltrados = libros.filter((libro) => {
    return libros ? libro.Titulo.toLowerCase().includes(search.toLowerCase()) : null;
  });

  useEffect(() => {
    setLoaging(true);
    axios.get(`https://${import.meta.env.VITE_IP}/texto/biblioteca`)
      .then((res) => {
        if (res.data) {
          setLibros(res.data);
          setLoaging(false);
        } else {
          setLoaging(false);
        }
      })
      .catch((err) => {
        console.log("Error en la petición: " + err);
        setLoaging(false);
      })
  }, [])


  return (
    <>
      <Header />

      <form className='border-[1px] border-solid rounded-md w-[300px] px-1 max-w-2xl h-[40px] bg-secondary-a mx-auto my-8 flex flex-row justify-between items-center'>

        <input type="text" placeholder="Buscar" onChange={handleSearch} value={search} className='bg-transparent h-[100%] border-none outline-none p-4 ' />

        <div onClick={handleSearch} className='p-1'>
          <Lupa color={'black'} w={28} />
        </div>

      </form>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {

          librosFiltrados &&
          librosFiltrados.map((libros, index) => {
            return (
              <div key={index}>
                <CardItem libro={libros} />
              </div>

            )
          })
        }

        {
          loading &&
          <CargandoLibro />
        }
      </section>

      {
        librosFiltrados.length === 0 &&
        <div className='text-2xl font-bold text-center'>
          <p>No hay resultado</p>
        </div>
      }
    </>
  );
}

export default BibliotecaView;