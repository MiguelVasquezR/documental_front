import React from "react";

import Index from "@/views/libros/agregarLibro/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agregar Libro",
  description: "Sistema de administración de documental de letras españolas",
};

const page = () => {
  return <Index />;
};

export default page;
