import { getCep } from "@/services/cep.service";
import { CEPResult } from "@/types/CEP/cep.types";
import { useState } from "react";

const useCEPSearch = () => {
  const [streetName, setStreetName] = useState<string>("");
  const [results, setResults] = useState<CEPResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetStates = () => {
    setResults(null);
    setError(null);
  };

  const handleSearch = async () => {
    resetStates();

    try {
      const data: CEPResult = await getCep(streetName);

      if (data && data.cep) {
        setResults(data);
      } else {
        setError("Não foi possível encontrar um CEP para esta rua.");
      }
    } catch (error) {
      setError("Erro ao buscar CEP");
    }
  };

  return {
    streetName,
    setStreetName,
    results,
    error,
    handleSearch,
  };
};

export default useCEPSearch;
