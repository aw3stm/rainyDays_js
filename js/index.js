const container = document.querySelector("#container");
const API_URL = "https://v2.api.noroff.dev/rainy-days";

async function fetchProducts() {
 try {
  const response = await fetch(API_URL);
  const data = await response.json();
  const products = data.data;

  products.forEach((product) => {
   const card = document.createElement("div");
   const image = document.createElement("img");
   const content = document.createElement("div");
   const title = document.createElement("h2");
   const price = document.createElement("p");
   const button = document.createElement("button");
   const anchor = document.createElement("a");

   card.className = "card";
   image.className = "card-image";
   content.className = "card-content";
   title.className = "card-title";
   price.className = "card-price";
   button.className = "cart-btn";

   image.src = product.image.url;
   image.alt = product.description;
   title.textContent = product.title;
   price.textContent = product.price;
   button.textContent = "Add to cart";
   anchor.href = `product/index.html?id=${product.id}`;

   card.appendChild(image);
   card.appendChild(content);
   content.appendChild(title);
   content.appendChild(price);
   content.appendChild(button);
   anchor.appendChild(card);

   container.appendChild(anchor);
  });
 } catch (error) {
  console.error("Failed to fetch products:", error);
 }
}

fetchProducts();
