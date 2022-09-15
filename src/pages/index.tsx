import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { data } from "../data";

const Home: NextPage = () => {
  const [dataItens, setDataItens] = useState<Array<TypeData>>(data);

  useEffect(() => {}, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="flex w-full items-center justify-center gap-2">
        {data.map((d: TypeData, indeContentDiv: number) => (
          <div
            key={d.id}
            className="border rounded p-1 flex flex-col items-center bg-gray-600"
          >
            <text className="my-2 text-white">Pos. {indeContentDiv}</text>
            <div className="w-16 h-16 rounded flex flex-col bg-gray-400 items-center justify-center">
              <strong>ID #{d.id}</strong>
              <div>Od. {d.orden}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-4 text-gray-500">
        <strong>Legenda - </strong>
        <strong>ID</strong>: Identificador <strong>Od</strong>: Ordem do
        elemento{" "}
      </div>
    </div>
  );
};

export default Home;
