import ApiFetchCEP from '@/core/apiCep';

async function getCep(streetName: any) {
    const { data } = await ApiFetchCEP.get(
      `${streetName}/json/`,
    );
    
    return data;
  }

export default getCep