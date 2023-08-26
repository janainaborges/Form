"use client"

import { useState } from 'react';
import getCep from '@/services/cep.service';

interface CEPResult {
  cep: string;
}

const useCEPSearch = () => {
  const [streetName, setStreetName] = useState<string>("");
  const [results, setResults] = useState<CEPResult[]>([]);
  
  const handleSearch = async () => {
    try {
      const data = await getCep(streetName);

      if (Array.isArray(data)) {
        const cepResults: CEPResult[] = data.map(item => ({ cep: item.cep }));
        setResults(cepResults);
      } else if (data.cep) {
        setResults([{ cep: data.cep }]);
      } else {
        setResults([]);
        console.error("Não foi possível encontrar um CEP para esta rua.");
      }

    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return {
    streetName,
    setStreetName,
    results,
    handleSearch
  };
}

export default useCEPSearch;
