"use client";

import LinkButton from "@/component/LinkButton/LinkButton";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const index = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const fetchLibros = async () => {
      const response = await fetch("/api/libros");
      const data = await response.json();
      if (data.status === 200) {
        toast.success(data.message);
        setLibros(data.data);
      } else {
        toast.error("Por el momento no es posible obtener los libros");
      }
    };
    fetchLibros();
  }, []);
  return (
    <>
      <div className="flex flex-row justify-between items-center p-5">
        <h2 className="text-2xl font-bold">Libros</h2>
        <LinkButton href="/libros/agregar" text="Agregar Libro" />
      </div>
      <div className="grid grid-cols-2 p-5">
        <div className="col-span-1">
          <p className="text-lg font-bold">Todos los libros</p>
          <br />
          <table className="table-auto border-collapse border border-gray-400 max-w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Titulo</th>
                <th className="border border-gray-400 px-4 py-2">Autor</th>
                <th className="border border-gray-400 px-4 py-2">Año</th>
                <th className="border border-gray-400 px-4 py-2">Editorial</th>
                <th className="border border-gray-400 px-4 py-2">Tipo</th>
                <th className="border border-gray-400 px-4 py-2">
                  Número de páginas
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {libros.map((libro: any) => (
                <tr key={libro.id}>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.titulo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.autor}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.anioPublicacion}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.editorial}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.tipo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {libro.numPag}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-1">
          <h2 className="text-2xl font-bold"></h2>
        </div>
      </div>
    </>
  );
};

export default index;
