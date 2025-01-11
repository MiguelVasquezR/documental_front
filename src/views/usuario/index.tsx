import LinkButton from "@/component/LinkButton/LinkButton";
import React from "react";

const index = async () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center p-5">
        <h2 className="text-2xl font-bold">Usuarios</h2>
        <LinkButton href="/usuario/agregar" text="Agregar Usuario" />
      </div>
      <div className="grid grid-cols-2 p-5">
        <div className="col-span-1">
          <p className="text-lg font-bold">Todos los usuarios</p>
          <table className="table-auto border-collapse border border-gray-400 max-w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Nombre</th>
                <th className="border border-gray-400 px-4 py-2">Apellido</th>
                <th className="border border-gray-400 px-4 py-2">Matricula</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  The Sliding Mr. Bones (Next Stop, Pottersville)
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  Malcolm Lockyer
                </td>
                <td className="border border-gray-400 px-4 py-2">1961</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  Witchy Woman
                </td>
                <td className="border border-gray-400 px-4 py-2">The Eagles</td>
                <td className="border border-gray-400 px-4 py-2">1972</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  Shining Star
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  Earth, Wind, and Fire
                </td>
                <td className="border border-gray-400 px-4 py-2">1975</td>
              </tr>
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
