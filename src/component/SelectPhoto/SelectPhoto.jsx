import { React } from 'react';
import { useState, useRef } from "react";


const SelectPhoto = () => {

    const [imageUrl, setImageUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleUploadImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const file = e.target.files[0];
        const URLfile = URL.createObjectURL(file);
        setImageUrl(URLfile);

        console.log(file);

        //Manejar la foto con el redux para que se guarde en el estado global
    }

    return (
        <div className='w-[90%] mx-auto my-4 flex flex-row justify-center items-center gap-5'>
            {imageUrl ? <img className='w-[100px] h-[150px] rounded-sm' src={imageUrl} /> : <div className='bg-[#f2f2f2] w-[100px] h-[150px] rounded-sm border-solid border-[1px] border-[#000]'></div>}
            <input name="image" type="file" onChange={handleUploadImage} style={{ display: 'none' }} ref={fileInputRef} />
            <button className='bg-primary text-secondary-a p-2 rounded-md' onClick={(e) => { e.preventDefault(); fileInputRef.current.click() }}>Seleccionar Portada</button>
        </div>
    );
}

export default SelectPhoto;
