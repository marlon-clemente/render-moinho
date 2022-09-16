import { Form } from "@unform/web";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { data } from "../data";

interface TypeForm {
  i_order: string;
  i_newPosition: string;
}

const Home: NextPage = () => {
  const [dataItens, setDataItens] = useState<Array<TypeData>>([]);

  const orderBy = (array: Array<TypeData>) => {
    const newArray = array.sort((a, b) => a.orden - b.orden);
    setDataItens(newArray);
    console.log(newArray);
  };

  const handleSubmit = ({ i_newPosition, i_order }: TypeForm) => {
    const order = Number(i_order);
    const newPosition = Number(i_newPosition);

    const searchElementCurrent = data.filter(
      (d: TypeData) => d.orden === order
    );
    const searchElementReplace = data.filter(
      (d: TypeData) => d.orden === newPosition
    );

    // item 3 [current] recebe pos 1 [new]

    //pego o index do elemento da origem  para trocar valor de sua ordem
    const indexSearchElementCurrent = searchElementCurrent[0].orden - 1; //2

    const newArray = data;
    newArray[indexSearchElementCurrent].orden = newPosition;

    // atualizar a ordem dos proximos enquanto index deles forem < order do atual

    //pego o index do elemento da origem  para trocar valor de sua ordem
    const indexSearchElementReplace = searchElementReplace[0].orden - 1; //1

    newArray[indexSearchElementReplace].orden =
      newArray[indexSearchElementReplace].orden + 1;

    for (
      let i = newPosition;
      i >= indexSearchElementReplace && i < order;
      i++
    ) {
      if (i !== indexSearchElementCurrent)
        newArray[i].orden = newArray[i].orden + 1;
    }

    orderBy(newArray);
  };

  useEffect(() => {
    orderBy(data);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="my-24">RENDERMOINHO</h1>

      <div className="flex w-full items-center justify-center gap-2">
        {dataItens.map((d: TypeData, indeContentDiv: number) => (
          <div
            key={d.id}
            className="border rounded p-1 flex flex-col items-center bg-gray-600"
          >
            <text className="my-2 text-white">Pos. {indeContentDiv + 1}</text>
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

      <Form onSubmit={handleSubmit} className="flex flex-col gap-1 my-12">
        <text className="text-xl text-gray-100 font-bold">
          Alterar a ordem dos elementos
        </text>

        <p className="text-md text-gray-300 mt-4">Ordem atual do item (Ord)</p>
        <Input name="i_order" />

        <p className="text-md text-gray-300 mt-4">Nova posição (Pos)</p>
        <Input name="i_newPosition" />

        <button
          className="py-2 my-1 p-16 bg-orange-500 rounded text-white hover:bg-orange-300 hover:transition hover:text-gray-800"
          type="submit"
        >
          Salvar
        </button>
      </Form>
    </div>
  );
};

export default Home;
