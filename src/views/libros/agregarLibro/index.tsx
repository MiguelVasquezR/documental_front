"use client";

import { convertToBase64 } from "@/utils/Utils";
import { BookValidator } from "@/validator/BookValidator";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UploadImage from "@/component/UploadImage/UploadImage";
import TextField from "@/component/TextField/TextField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Location from "@/component/Location/Location";
import clsx from "clsx";

const AgregarTexto = () => {
  const [image, setImage] = useState<string>("");
  const [respisaSelected, setRespisaSelected] = useState<string>("2");
  const router = useRouter();

  const [selectedCell, setSelectedCell] = useState<{
    col: number;
    row: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(BookValidator),
  });

  useEffect(() => {
    const ubicacion = {
      col: selectedCell?.col,
      row: selectedCell?.row,
      respisa: respisaSelected,
    };
    setValue("ubicacion", ubicacion);
  }, [selectedCell]);

  const handleUpload = async (file: File) => {
    if (!file) return alert("Selecciona una imagen primero");
    const formData = new FormData();
    formData.append("file", file);
    const base64 = await convertToBase64(file);
    const response = await fetch("/api/cloudinary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: base64 }),
    });
    const data = await response.json();
    if (data.url) {
      setValue("imagen", data.url);
      setImage(data.url);
    } else {
      alert("Error al subir la imagen");
    }
  };

  const onSubmit = async (data: any) => {
    data.imagen =
      image ||
      "https://res.cloudinary.com/dvt4vznxn/image/upload/v1736555915/yivyktkgvcjxprwwnwui.png";
    const response = await fetch("/api/libros/agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataResponse = await response.json();
    if (dataResponse.status === 200) {
      toast.success("Libro agregado correctamente");
      router.push("/libros");
    } else {
      toast.error("Error al agregar el libro");
    }
  };

  return (
    <div className="grid grid-cols-3 p-5">
      <div className="col-span-1 flex justify-center items-start">
        <UploadImage
          image={image}
          handleImageCapture={handleUpload}
          register={register}
        />
      </div>
      <div className="col-span-2">
        <p className="text-2xl font-bold">Información del libro</p>
        <form className="flex flex-col justify-center items-center gap-5 py-5">
          <TextField
            label="Título"
            errors={!!errors.titulo}
            placeholder="Título"
            onChange={(value) => {
              setValue("titulo", value);
            }}
            value={watch("titulo")}
            type={"text"}
            register={register("titulo")}
            isLabel={false}
            message={errors?.titulo?.message}
          />
          <TextField
            label="Autor"
            errors={!!errors.autor}
            placeholder="Autor"
            onChange={(value) => {
              setValue("autor", value);
            }}
            value={watch("autor")}
            type={"text"}
            register={register("autor")}
            isLabel={false}
            message={errors?.autor?.message}
          />

          <TextField
            label="Editorial"
            errors={!!errors.editorial}
            placeholder="Editorial"
            onChange={(value) => {
              setValue("editorial", value);
            }}
            value={watch("editorial")}
            type={"text"}
            register={register("editorial")}
            isLabel={false}
            message={errors?.editorial?.message}
          />

          <div className="flex flex-row justify-center items-center gap-5 w-full">
            <TextField
              label="Número de Página"
              errors={!!errors.numPag}
              placeholder="Número de Página"
              onChange={(value) => {
                setValue("numPag", value);
              }}
              value={watch("numPag")}
              type={"number"}
              register={register("numPag")}
              isLabel={false}
              message={errors?.numPag?.message}
            />

            <TextField
              label="Año de Publicación"
              errors={!!errors.anioPublicacion}
              placeholder="Año de Publicación"
              onChange={(value) => {
                setValue("anioPublicacion", value);
              }}
              value={watch("anioPublicacion")}
              type={"number"}
              register={register("anioPublicacion")}
              isLabel={false}
              message={errors?.anioPublicacion?.message}
            />
          </div>

          <TextField
            label="Tipo"
            errors={!!errors.tipo}
            placeholder="Tipo"
            onChange={(value) => {
              setValue("tipo", value);
            }}
            value={watch("tipo")}
            type={"text"}
            register={register("tipo")}
            isLabel={false}
            message={errors?.tipo?.message}
          />

          <div className="flex flex-row justify-center items-center w-full text-center">
            <button
              type="button"
              onClick={() => setRespisaSelected("1")}
              className={clsx(
                "p-2 border-[1px] w-full border-primary",
                respisaSelected === "1"
                  ? "bg-primary text-white"
                  : "bg-white  text-primary"
              )}
            >
              Repisa 1
            </button>
            <button
              type="button"
              onClick={() => setRespisaSelected("2")}
              className={clsx(
                "p-2 border-[1px] w-full border-primary",
                respisaSelected === "2"
                  ? "bg-primary text-white"
                  : "bg-white  text-primary"
              )}
            >
              Respisa 2
            </button>
          </div>
          <Location
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            row={respisaSelected === "1" ? 3 : 4}
            col={respisaSelected === "1" ? 5 : 6}
          />
          {errors.ubicacion && (
            <p className="text-center text-red-500">
              {errors.ubicacion.message}
            </p>
          )}
        </form>
        <div className="flex flex-row justify-end items-center gap-5 w-full">
          <button
            onClick={() =>
              reset({
                titulo: "",
                autor: "",
                editorial: "",
                numPag: "",
                anioPublicacion: "",
                tipo: "",
              })
            }
            className="bg-white text-primary p-2 rounded-md w-1/4 border-primary border-2"
          >
            Limpiar
          </button>
          <button
            className="bg-primary text-white p-2 rounded-md w-1/4"
            onClick={handleSubmit(onSubmit)}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarTexto;
