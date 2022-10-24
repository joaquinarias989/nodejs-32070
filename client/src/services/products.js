import axios from "axios";
import { ServiceResponse } from "models/ServiceResponse";

const API_URI = "http://localhost:8080/api";

export async function getAllProducts() {
  let resp = new ServiceResponse();

  axios.get(`${API_URI}/products`).then((data) => {
    console.log(data);
  });
}

export default { getAllProducts };
