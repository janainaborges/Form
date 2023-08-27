export interface CEPResult {
    [key: string]: string | undefined;
    cep: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    complemento?: string;
  }
  