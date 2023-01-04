import { loadProds, saveProd, onNewProd, getSocketId } from "./sockets.js";
const formAddProduct = document.getElementById("formAddProduct");

// Load initial Prods
window.addEventListener("DOMContentLoaded", () => {
  loadProds(renderProds);
  onNewProd(appendProd);
});

// Render Prods
function renderProds(prods) {
  if (!prods) return;
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
                    src=${prod.urlImg}
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
                <button>
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
                    src=${prod.urlImg}
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
  const { code, title, price, description, urlImg, stock } = e.target.elements;
  saveProd({
    code: code.value,
    title: title.value,
    price: price.value,
    description: description.value,
    urlImg: urlImg.value,
    stock: stock.value,
  });
  e.target.reset();
});
