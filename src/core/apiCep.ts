import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_CEP_API
const ApiFetchCEP = axios.create({
  baseURL: apiUrl,
  timeout: 100 
});

export default ApiFetchCEP;