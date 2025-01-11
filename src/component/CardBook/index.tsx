import Image from "next/image";

const CardBook = () => {
  return (
    <div className="w-[350px] h-[200px] rounded-md shadow-md flex flex-row justify-center items-center gap-2">
      <div className="w-[40%] h-[200px]">
        <Image
          src="https://cdn-3.expansion.mx/dims4/default/bb66221/2147483647/resize/1280x/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Ffe%2F86%2F193d1dee42728bc831a0fb6f6754%2Fdonde-leer-libros-gratis-en-linea.jpg"
          alt="libro"
          width={120}
          height={200}
          className="rounded-l-md w-full h-full object-fill"
        />
      </div>
      <div className="w-[60%] h-[200px] p-4">
        <p className="text-sm font-bold">Titulo</p>
        <p className="text-sm">Autor</p>
        <p className="text-sm">Año</p>
        <p className="text-sm">Editorial</p>
      </div>
    </div>
  );
};

export default CardBook;
