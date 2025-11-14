const newsContainer = document.querySelector("#newsContainer");

import { updateCartCount } from "../js/cart.js";
import { createProductCard } from "../js/renderProductCard.js";
import { getCart } from "../js/cart.js";

async function fetchLocalProducts() {
 try {
  const response = await fetch("../js/localProducts.json");
  if (!response.ok) {
   throw new Error("Failed to load products");
  }

  const products = await response.json();
  console.log(products);

  productsToRender(products.data);
  getCart();
  updateCartCount();
 } catch (error) {
  console.error("Failed to fetch products:", error);
  newsContainer.innerHTML =
   '<p class="error-msg">Could not load products. Please try refreshing the page.</p>';
 }
}

function productsToRender(productList) {
 newsContainer.innerHTML = "";

 productList.forEach((product) => {
  const card = createProductCard(product, { showAddBtn: true });

  const titleLink = card.querySelector(".card-title").parentElement;
  titleLink.href = `../index.html?id=${product.id}`;

  const sizeInfo = document.createElement("p");
  sizeInfo.textContent = `Sizes: ${product.sizes?.join(" ")}`;
  sizeInfo.className = "card-size";

  const content = card.querySelector(".card-content");
  if (content) {
   content.appendChild(sizeInfo);
  }
  const addBtn = card.querySelector(".cart-btn");
  if (addBtn) {
   addBtn.addEventListener("click", () => {
    window.location.href = `../product/index.html?id=${product.id}`;
   });
  }
  newsContainer.appendChild(card);
 });
}
fetchLocalProducts();
