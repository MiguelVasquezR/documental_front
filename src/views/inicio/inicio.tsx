"use client";

import { getFecha } from "../../../app/utils/Utils";
import ModalPrestamo from "@/views/prestamo";
import { useState } from "react";
const Index = () => {
  const options = [
    "Manzana",
    "Pera",
    "Plátano",
    "Mango",
    "Naranja",
    "Fresa",
    "Uva",
    "Piña",
  ];

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between p-4 text-lg font-bold">
        <div>
          <h2>Hola, Miguel ✋🏻</h2>
          <p>{getFecha()}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="bg-primary text-white px-5 py-2 rounded-md"
        >
          Nuevo Prestamo
        </button>
      </div>

      {openModal && (
        <ModalPrestamo
          openModal={openModal}
          books={options}
          students={options}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default Index;
