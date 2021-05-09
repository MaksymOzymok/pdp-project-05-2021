import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    "https://my-json-server.typicode.com/MaksymOzymok/pdp-project-05-2021/db/",
});

export default axiosClient;
