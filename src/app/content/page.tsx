import useCEPSearch from "@/Hook/cep";
import CustomButton from "@/components/button";
import { CEPResult } from "@/types/CEP/cep.types";

const Content: React.FC = () => {
  const { streetName, setStreetName, results, handleSearch } = useCEPSearch();

  const formatCEP = (input: string) => {
    const cleanValue = input.replace(/\D/g, "");

    if (cleanValue.length <= 5) {
      return cleanValue;
    } else {
      const part1 = cleanValue.substring(0, 5);
      const part2 = cleanValue.substring(5, 8);
      return `${part1}-${part2}`;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCEP(event.target.value);
    setStreetName(formattedValue);
  };

  const fields = [
    { name: "cep", placeholder: "CEP" },
    { name: "logradouro", placeholder: "Rua" },
    { name: "bairro", placeholder: "Bairro" },
    { name: "uf", placeholder: "Uf" },
  ];

  return (
    <div className="flex flex-col gap-2 justify-center mb-4">
      <div className="flex gap-2">
        <input
          value={streetName}
          onChange={handleInputChange}
          maxLength={9}
          placeholder="CEP (xxxxx-xxx)"
          className="border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
          aria-label="CEP Input"
        />
        <CustomButton onClick={handleSearch} title="Pesquisar" />
      </div>

      {fields.map((field) => (
        <input
          key={field.name}
          type="text"
          placeholder={field.placeholder}
          value={results?.[field.name as keyof CEPResult] ?? ""}
          readOnly
          className="border p-2 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
          aria-label={field.placeholder}
        />
      ))}
    </div>
  );
};

export default Content;
