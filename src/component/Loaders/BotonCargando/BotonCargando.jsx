import React from "react";

const BotonCargando = ({ text }) => {
    return (
        <button className="w-[180px] rounded-md bg-green-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] _18px_0_rgba(51,45,45,0.1)] p-2 transition duration-150 ease-in-out"  >
            {
                text === 'Cargado' ?
                    ""
                    :
                    <div role="status" className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                        </span>
                    </div>
            }
            {text}
        </button>
    )
}

export default BotonCargando;