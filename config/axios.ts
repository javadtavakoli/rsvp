import axios from "axios";

const AxiosClient = axios.create();
AxiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export default AxiosClient;
