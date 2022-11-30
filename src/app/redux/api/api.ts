import axios from "axios";
const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? 'http://localhost:3000/' : REACT_APP_PROD_API}`,
});


export default API