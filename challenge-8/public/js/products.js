import { loadProds, saveProd, onNewProd, getSocketId } from "./sockets.js";
const formAddProduct = document.getElementById("formAddProduct");

// Load initial Prods
window.addEventListener("DOMContentLoaded", () => {
  loadProds(renderProds);
  onNewProd(appendProd);
});

// Render Prods
function renderProds(prods) {
  productsList.innerHTML = "";
  prods.forEach((prod) => {
    const prodRow = document.createElement("tr");
    prodRow.innerHTML = `
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="img-rounded">
                  <img
                    src=${prod.img}
                    alt="Imagen del producto ${prod.title}}"
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                </div>
              </td>
              <td>${prod.title}</td>
              <td>$ ${prod.price}</td>
              <th>
                <button>
                  <i class="feather icon-edit"></i>
                </button>
                <button type="submit">
                  <i class="feather icon-trash"></i>
                </button>
              </th>
        `;
    productsList.appendChild(prodRow);
  });
}

// Apend Prod on new Prod
function appendProd(prod) {
  const prodRow = document.createElement("tr");
  prodRow.innerHTML = `
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="img-rounded">
                  <img
                    src=${prod.img}
                    alt="Imagen del producto ${prod.title}}"
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                </div>
              </td>
              <td>${prod.title}</td>
              <td>$ ${prod.price}</td>
              <th>
                <button>
                  <i class="feather icon-edit"></i>
                </button>
                <button type="submit">
                  <i class="feather icon-trash"></i>
                </button>
              </th>
        `;
  productsList.appendChild(prodRow);
}

// Save a new Prod
formAddProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const { title, price, img } = e.target.elements;
  saveProd(title.value, price.value, img.value);
  e.target.reset();
});
