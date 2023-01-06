import { loadProds } from './sockets.js';

// Load initial Prods
window.addEventListener('DOMContentLoaded', () => {
  loadProds(renderProds);
});

// Render Prods
function renderProds(prods) {
  if (!prods) return;
  productsList.innerHTML = '';
  prods.forEach((prod) => {
    const prodRow = document.createElement('tr');
    prodRow.innerHTML = `
              <th>${prod.code}</th>
              <td>${prod.title}</td>
              <td>
                <div class="img-rounded">
                  <img
                    src=${prod.urlImg}
                    alt="Imagen del producto ${prod.title}}"
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                </div>
              </td>
              <td>$ ${prod.price}</td>
        `;
    productsList.appendChild(prodRow);
  });
}
