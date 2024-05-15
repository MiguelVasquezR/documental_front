import React from 'react';

const ImagenGuardada = () => {

    return (
        <button
            className="cursor-none flex items-center fill-lima bg-lima900 active:border active:border-lima900 rounded-md duration-100 p-2"
            title="Save"
        >
            <svg
                xmlns="https://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 -0.5 25 25"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </svg>
            <span className="text-[12px] text-lima font-bold pr-1">Almacenada</span>
        </button>
    )
}

export default ImagenGuardada;