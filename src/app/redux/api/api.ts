import axios from "axios";
const devEnv = process.env.NODE_ENV !== "production";

const API = axios.create({
  baseURL: `${devEnv ? 'http://localhost:8000/' : "https://mockend.com/hadidy/react-redx-toolkit"}`,
});


export default API