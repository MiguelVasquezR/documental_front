import React from "react";
import Autocomplete from "@/component/TextList/TextList";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";

interface Props {
  books: string[];
  students: string[];
  closeModal: () => void;
  openModal: boolean;
}

const index = ({ books, students, closeModal, openModal }: Props) => {
  return (
    <div
      className={`w-screen h-screen bg-black/30 absolute top-0 left-0 ${
        openModal
          ? "animate-fade-up"
          : "animate-jump-out animate-once animate-duration-1000"
      }`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <form className="rounded-md p-5 shadow-md w-[50%] h-[50%] bg-white relative flex flex-row gap-5 ">
          <IoCloseCircleOutline
            className="text-primary text-4xl absolute top-1 right-1 cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />

          <div className=" h-full bg-white w-1/2 flex gap-5 flex-col">
            <div className="w-full">
              <div className="w-[200px] lg:w-[400px]">
                <label className="py-5 font-bold">
                  Ingrese el titulo del Libro
                </label>
                <Autocomplete options={books} placeholder="Libro" />
              </div>
            </div>

            <div className="w-full">
              <div className="w-[200px] lg:w-[400px]">
                <label className="py-5 font-bold">Ingresa la matricula</label>
                <div className="flex flex-row gap-2 items-center">
                  <Autocomplete options={students} placeholder="Matricula" />
                  <HiUserAdd className="text-primary text-4xl cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="flex justify-end my-5">
              <button className="bg-primary text-white px-5 py-2 rounded-md">
                Procesar
              </button>
            </div>
          </div>
          <div className="h-full bg-white w-1/2">
            <p className="text-2xl font-bold">Información de Prestamo</p>

            <div>
              <p className="font-bold text-xl">Información del libro</p>
              <p>Titulo: </p>
              <p>Autor: </p>
              <p>Año: </p>
              <p>Editorial: </p>
            </div>

            <div>
              <p className="font-bold text-xl">Información del alumno</p>
              <p>Nombre: </p>
              <p>Matricula: </p>
              <p>Correo: </p>
            </div>

            <div>
              <p className="font-bold text-xl">Información del prestamo</p>
              <p>Fecha de prestamo: </p>
              <p>Fecha de devolución: </p>
              <p>Estado: </p>
            </div>

            <div className="flex justify-end my-5">
              <button className="bg-primary text-white px-5 py-2 rounded-md">
                Guardar Prestamo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
