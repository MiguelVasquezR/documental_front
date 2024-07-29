import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '../hooks/AppFirebase';

const storage = getStorage(app);


export const PORTADAS_LIBROS = "portadasLibros";
export const PORTADAS_PELICULAS = "portadasPeliculas";

export const handleUploadImage = async (e, carpeta) => {
    const file = e.target.files[0];
    const refArchivo = ref(storage, `${carpeta}/${file.name}`)
    await uploadBytes(refArchivo, file)
    const ulrImDesc = await getDownloadURL(refArchivo)
    return ulrImDesc;
}