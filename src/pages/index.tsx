import { Form } from "@unform/web";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import ListNumbers from "../components/ListNumbers";
import { data } from "../data";

interface TypeForm {
  i_order: string;
  i_newPosition: string;
}

const Home: NextPage = () => {
  const [render, setRender] = useState(0);
  const [dataItens, setDataItens] = useState<Array<TypeData>>(
    data.sort((a, b) => a.orden - b.orden)
  );

  const orderBy = (array: Array<TypeData>) => {
    const newArray = array.sort((a, b) => a.orden - b.orden);
    console.log(newArray);
    setDataItens(newArray);
  };

  useEffect(() => {
    orderBy(dataItens);
  }, [render]); // eslint-disable-line

  const handleSubmit = ({ i_newPosition, i_order }: TypeForm) => {
    const order = Number(i_order);
    const newPosition = Number(i_newPosition);

    const searchElementCurrent = data.filter(
      (d: TypeData) => d.orden === order
    );
    const searchElementReplace = data.filter(
      (d: TypeData) => d.orden === newPosition
    );

    //pego o index do elemento da origem  para trocar valor de sua ordem
    const indexSearchElementCurrent = searchElementCurrent[0].orden - 1;

    let newArray = data;
    newArray[indexSearchElementCurrent].orden = newPosition;

    // atualizar a ordem dos proximos enquanto index deles forem < order do atual

    //pego o index do elemento da origem  para trocar valor de sua ordem
    const indexSearchElementReplace = searchElementReplace[0].orden - 1;

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

    setDataItens(newArray);
    setRender(render + 1);
  };

  const handleReset = () => {
    setDataItens(data);
    setRender(0);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900">
      <ListNumbers dataItens={dataItens} />

      <Form onSubmit={handleSubmit} className="flex flex-col gap-1 my-12">
        <label className="text-xl text-gray-100 font-bold">
          Alterar a ordem dos elementos
        </label>

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

      <button
        className="py-2 my-1 p-16 border border-transparent rounded text-white hover:border hover:border-orange-500 hover:transition"
        onClick={handleReset}
      >
        Redefinir
      </button>
    </div>
  );
};

export default Home;
