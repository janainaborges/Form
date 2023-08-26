import axios from "axios";

const apiUrl = "https://viacep.com.br/ws/"
const ApiFetchCEP = axios.create({
  baseURL: apiUrl,
  headers: {
    AccessControlAllowOrigin: true,
  },
});

export default ApiFetchCEP;