interface ListNumbersProps {
  dataItens: Array<TypeData>;
}

const ListNumbers = ({ dataItens }: ListNumbersProps) => {
  return (
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
  );
};

export default ListNumbers;
