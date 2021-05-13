import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://infinite-bayou-91777.herokuapp.com/",
});

export default axiosClient;
