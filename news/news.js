const newsContainer = document.querySelector("#newsContainer");
let products = [];

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

 if (productList.length === 0) {
  newsContainer.innerHTML =
   '<p class="no-result">No products found. Try a different search!</p>';
  return;
 }

 productList.forEach((product) => {
  const card = createProductCard(product, { showAddBtn: false });
  newsContainer.appendChild(card);
 });
}
fetchLocalProducts();
