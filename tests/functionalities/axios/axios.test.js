const axios = require('axios');
const client = axios.create();
const API_URL = 'http://localhost:8080/api';

const ID_PROD_FOR_TEST = '63711e8ccaf17e524ef50fe7';
const PROD_FOR_TEST = {
  code: 'JPB',
  title: 'Jacket Panda',
  price: 10700,
  description: '',
  urlImg:
    'https://i.ibb.co/thXqsNN/photo-1532332248682-206cc786359f-ixlib-rb-1-2.jpg',
  color: 'Negro',
  stock: [1, 1],
  sizes: ['L', 'XL'],
};
const PROD_FOR_UPDATE = {
  title: 'Remera Bruno Mars',
  price: 5700,
  description: '',
  urlImg: '',
  color: 'Negro',
  stock: [3, 2],
  sizes: ['S', 'M'],
};

(async function TestProductsWhitAxios() {
  try {
    console.log('------ Test Running ------');

    const GET = await client.get(`${API_URL}/products`);
    console.log(`-- GET All --:`);
    console.log(`Result: ${JSON.stringify(GET.data)}`);

    const GET_BY_ID = await client.get(
      `${API_URL}/products/${ID_PROD_FOR_TEST}`
    );
    console.log(`-- GET By ID --`);
    console.log(`Result: ${JSON.stringify(GET_BY_ID.data)}`);

    const POST = await client.post(`${API_URL}/products`, PROD_FOR_TEST);
    console.log(`-- POST --`);
    console.log(`Result: ${JSON.stringify(POST.data)}`);

    const PUT = await client.put(
      `${API_URL}/products/${ID_PROD_FOR_TEST}`,
      PROD_FOR_UPDATE
    );
    console.log(`-- PUT --`);
    console.log(`Result: ${JSON.stringify(PUT.data)}`);

    const DELETE = await client.delete(
      `${API_URL}/products/${ID_PROD_FOR_TEST}`
    );
    console.log(`-- DELETE --`);
    console.log(`Result: ${JSON.stringify(DELETE.data)}`);
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
})();
