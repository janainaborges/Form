"use client";
import useCEPSearch from "@/Hook/cep";
import CustomButton from "@/components/button";

const Content: React.FC = () => {
  const { streetName, setStreetName, results, handleSearch } = useCEPSearch();

  const handleInputChange = (event: any) => {
    let { value } = event.target;

    const cleanValue = value.replace(/\D/g, "");

    if (cleanValue.length <= 5) {
      value = cleanValue;
    } else {
      const part1 = cleanValue.substring(0, 5);
      const part2 = cleanValue.substring(5, 8);
      value = `${part1}-${part2}`;
    }

    setStreetName(value);
  };

  console.log(results);

  return (
    <div className="flex gap-2 justify-center mb-4">
      <div className="flex gap-2">
        <div>
          <input
            value={streetName}
            onChange={handleInputChange}
            maxLength={9}
            placeholder="CEP (xxxxx-xxx)"
            className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors `}
          />
        </div>

        <div>
          <CustomButton onClick={handleSearch} title="Pesquisar" />
        </div>
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="CEP"
          value={results.cep}
          readOnly
          className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
        />
        <input
          type="text"
          placeholder="Rua"
          value={results.logradouro}
          readOnly
          className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
        />
        <input
          type="text"
          placeholder="Bairro"
          value={results.bairro}
          readOnly
          className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
        />
        <input
          type="text"
          placeholder="Localidade"
          value={results.localidade}
          readOnly
          className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
        />
        <input
          type="text"
          placeholder="UF"
          value={results.uf}
          readOnly
          className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
        />
        <input
          type="text"
          placeholder="Complemento"
          defaultValue={results.complemento}
          className={`border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors`}
        />
      </div>
    </div>
  );
};

export default Content;
