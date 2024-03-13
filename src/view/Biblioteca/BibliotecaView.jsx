import { React } from 'react';

import Header from '../../component/Header/Header';
import Barra from '../../component/BarraBusqueda/Barra';
import CardItem from '../../component/CardItem/CardItem';

const BibliotecaView = () => {
  return (
    <>
      <Header />
      <Barra />
      <section>
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </section>
    </>
  );
}

export default BibliotecaView;