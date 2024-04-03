import React, {useState} from "react";

import Header from "../../component/Header/Header";

const Devolucion = () => {

    

    return (
        <>
            <Header />

            <section>
                <h2>Devolución</h2>

                <form action="" className="w-[90%] flex flex-col justify-center items-center gap-5">
                    <input className="border-b-[1px] border-[#000] border-solid p-1 w-[80%] text-center" type="text" placeholder="Ingresa código del libro" />
                    <button className="bg-primary px-4 py-2 rounded-md text-secondary-a" type="submit">Búscar</button>
                </form>


            </section>
        
        
        </>
    )
}

export default Devolucion;