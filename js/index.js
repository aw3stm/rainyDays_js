"use strict";

const API_URL = "https://v2.api.noroff.dev/rainy-days";
let allProducts = [];
const resultsContainer = document.querySelector("#resultsContainer");

async function fetchProducts() {
 try {
  const response = await fetch(API_URL);
  if (!response.ok) {
   throw new Error(`HTTP error. Status: ${response.status} `);
  }
  const result = await response.json();
  allProducts = result.data;

  allProducts.forEach((product) => {
   const card = document.createElement("div");
   const image = document.createElement("img");
   const content = document.createElement("div");
   const title = document.createElement("h2");
   const price = document.createElement("p");

   card.className = "card";
   image.className = "card-image";
   content.className = "card-content";
   title.className = "card-title";
   price.className = "card-price";

   image.src = product.image.url;
   image.alt = product.alt;
   title.textContent = product.title;
   price.textContent = product.price;

   card.appendChild(image);
   card.appendChild(content);
   content.appendChild(title);
   content.appendChild(price);

   resultsContainer.appendChild(card);
  });
 } catch (error) {
  console.error("Failed to fetch products:", error);
  resultsContainer.innerHTML =
   '<p class="error-message">Could not load products. Please try refreshing the page.</p>';
 }
}

fetchProducts();
