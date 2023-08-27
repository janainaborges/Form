"use client"

import { useState } from 'react';
import getCep from '@/services/cep.service';

interface CEPResult {
  cep: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  complemento?: string;
}


const useCEPSearch = () => {
  const [streetName, setStreetName] = useState<string>("");
  const [results, setResults] = useState<any>([]);
  
  const handleSearch = async () => {
    try {
      const data = await getCep(streetName);
    
      if (data !== "") {
        setResults(data);
      } else {
        setResults([]);
        alert("Não foi possível encontrar um CEP para esta rua.");
      }

    } catch (error) {
      alert("Erro ao buscar CEP");
    }
  };
console.log(streetName)
  return {
    streetName,
    setStreetName,
    results,
    handleSearch
  };
}

export default useCEPSearch;
