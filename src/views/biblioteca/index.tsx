"use client";

import CardBook from "@/component/CardBook";
import TextField from "@/component/TextField/TextField";
import React, { useState } from "react";

const Index = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="flex flex-row justify-between items-center p-5">
        <p className="text-2xl font-bold">Biblioteca</p>
        <div className="w-[200px] lg:w-[400px]">
          <TextField
            placeholder="Buscar"
            onChange={(e) => {
              setSearch(e);
            }}
            value={search}
            type="text"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
        <CardBook />
      </div>
    </>
  );
};

export default Index;
