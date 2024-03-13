import {React} from 'react'

import Header from '../../component/Header/Header'

const App = () => {    

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const formattedDate = formatDate(new Date());

    return(
        <>
            <Header />
            <section className='py-4'>
                <h2 className='text-right pr-8 font-bold tracking-wider'>{formattedDate}</h2>
                <h2 className='p-4' >Próximas Devoluciones</h2>
            </section>
            
        </>
    )
}

export default App;