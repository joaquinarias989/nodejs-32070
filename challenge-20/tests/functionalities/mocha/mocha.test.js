const API_URL = 'http://localhost:8080/api';
const request = require('supertest')(`${API_URL}`);
const expect = require('chai').expect;

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

describe('------------ Products Test ------------', () => {
  before(function () {
    console.log('\n ------ Tests Running ------ \n');
  });

  after(function () {
    console.log('\n ------ Tests End ------ ');
  });

  describe('-- POST --', () => {
    let idNewProd = '';
    it('should save a product in the database', async () => {
      const response = await request.post('/products').send(PROD_FOR_TEST);
      expect(response.status).to.eql(200);
      idNewProd = response.body.data.id;
    });

    it('should check the saved fields', async () => {
      const newProd = await request.get(`productos/${idNewProd}`);
      expect(newProd.body.data.code).to.eql(PROD_FOR_TEST.code);
      expect(newProd.body.data.title).to.eql(PROD_FOR_TEST.title);
      expect(parseInt(newProd.body.data.price)).to.eql(
        parseInt(PROD_FOR_TEST.price)
      );
      expect(newProd.body.data.urlImg).to.eql(PROD_FOR_TEST.urlImg);
    });

    it('should return error 400 duplicate product', async () => {
      const response = await request.post('/products').send(PROD_FOR_TEST);
      expect(response.status).to.eql(400);
      expect(response.body).deep.eql({
        data: null,
        status: 400,
        success: false,
        message: 'Ya existe un producto con el Código de producto ingresado.',
      });
    });
  });

  describe('-- PUT --', () => {
    it('should update a product', async () => {
      const response = await request
        .put(`/products/${ID_PROD_FOR_TEST}}`)
        .send(PROD_FOR_UPDATE);
      expect(response.status).to.eql(200);
    });

    it('should check the updated fields', async () => {
      const updatedProd = await request.get(`productos/${ID_PROD_FOR_TEST}`);
      expect(updatedProd.body.data.title).to.eql(PROD_FOR_UPDATE.title);
      expect(parseInt(updatedProd.body.data.price)).to.eql(
        parseInt(PROD_FOR_UPDATE.price)
      );
      expect(updatedProd.body.data.stock).to.eql(PROD_FOR_UPDATE.stock);
      expect(updatedProd.body.data.sizes).to.eql(PROD_FOR_UPDATE.sizes);
      expect(updatedProd.body.data.urlImg).to.eql(PROD_FOR_UPDATE.urlImg);
    });

    it('should return error 400 invalid ID', async () => {
      const response = await request
        .put(`/products/${ID_PROD_FOR_TEST}sd132sdsa}`)
        .send(PROD_FOR_UPDATE);
      expect(response.status).to.eql(400);
      expect(response.body).deep.eql({
        data: null,
        status: 400,
        success: false,
        message: 'ID Inválido',
      });
    });
  });

  describe('-- GET All --', () => {
    it('should return all the products', async () => {
      let response = await request.get('/products');
      expect(response.status).to.eql(200);
    });
  });

  describe('-- GET One --', () => {
    it('should return one product with the id entered', async () => {
      let response = await request.get(`products/${ID_PROD_FOR_TEST}`);
      expect(response.status).to.eql(200);
    });

    it('should return error 404 product not found', async () => {
      const response = await request.get(`/products/63711e8ccaf17e524ef50fe5}`);
      expect(response.status).to.eql(400);
      expect(response.body).deep.eql({
        data: null,
        status: 400,
        success: false,
        message: 'ID Inválido',
      });
    });
  });

  describe('-- DELETE --', () => {
    it('deberia ELIMINAR el producto cargado anteriormete', async () => {
      let response = await request.delete(`/products/${ID_PROD_FOR_TEST}`);
      expect(response.status).to.eql(200);
      expect(response.body).to.eql({
        data: null,
        status: 200,
        success: false,
        message: 'Producto eliminado existosamente!',
      });
    });
  });
});
