import { React } from 'react';
import { useState, useRef } from "react";
import appFirebase from '../../hooks/AppFirebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const storage = getStorage(appFirebase);

import BotonCargando from '../Loaders/BotonCargando/BotonCargando.jsx';


const SelectPhoto = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("Cargando...");
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadImage = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);

    const file = e.target.files[0];
    const refArchivo = ref(storage, `portadasTextos/${file.name}`)
    await uploadBytes(refArchivo, file)
    const ulrImDesc = await getDownloadURL(refArchivo)

    setImageUrl(ulrImDesc)
    setText("Cargado");
    
    window.localStorage.setItem('portada', ulrImDesc);

  }

  return (
    <>
      <div className='w-[90%] mx-auto my-4 flex flex-row justify-center items-center gap-5'>
        {imageUrl ? <img className='w-[100px] h-[150px] rounded-sm' src={imageUrl} /> : <div className='bg-[#f2f2f2] w-[100px] h-[150px] rounded-sm border-solid border-[1px] border-[#000]'></div>}
        <input name="image" type="file" onChange={handleUploadImage} style={{ display: 'none' }} ref={fileInputRef} />
        <div className='flex flex-col justify-center items-center gap-3'>
          {
            loading ? <BotonCargando text={text} /> : <button className='bg-primary text-secondary-a p-2 rounded-md w-[180px]' onClick={(e) => { e.preventDefault(); fileInputRef.current.click() }}>Seleccionar Portada</button>
          }
        </div>
      </div>
    </>
  )

}

export default SelectPhoto;
