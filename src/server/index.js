import axios from "axios";

const request=axios.create({
  baseURL:"https://669495724bd61d8314c7dfc6.mockapi.io/",
  timeout:10000,
});

export default request;