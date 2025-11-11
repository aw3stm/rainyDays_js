import { addToCart, updateCartCount } from "../js/cart.js";

const container = document.querySelector("#container");
const API_URL = "https://v2.api.noroff.dev/rainy-days";

async function fetchProducts() {
 try {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
   container.textContent = "No product ID provided!";
   return;
  }

  const response = await fetch(`${API_URL}/${id}`);
  const result = await response.json();
  const product = result.data;

  const productDiv = document.createElement("div");
  productDiv.className = "product-details";

  const textContainer = document.createElement("div");
  textContainer.className = "product-text";

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "product-buttons";

  const image = document.createElement("img");
  image.className = "product-image";
  image.src = product.image.url;
  image.alt = product.image.alt;

  const title = document.createElement("h2");
  title.className = "product-title";
  title.textContent = product.title;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = `$${product.price}`;
  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description;

  const sizesContainer = document.createElement("div");
  sizesContainer.className = "product-sizes-container";
  const sizeOption = document.createElement("p");
  sizeOption.textContent = "Select size";

  const backButton = document.createElement("a");
  backButton.className = "back-button";
  backButton.textContent = "Back to Products";
  backButton.href = "../index.html";
  const addToCartBtn = document.createElement("a");
  addToCartBtn.className = "cart-btn";
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.href = "../checkout/index.html";

  let selectedSize = "";
  let selectedButton = "";

  product.sizes.forEach((size) => {
   const button = document.createElement("button");
   button.textContent = size;
   button.className = "size-button";

   button.addEventListener("click", () => {
    if (selectedButton) {
     selectedButton.classList.remove("selected");
    }
    selectedSize = size;
    selectedButton = button;
    button.classList.add("selected");
   });
   sizesContainer.appendChild(button);
  });

  addToCartBtn.addEventListener("click", () => {
   if (!selectedSize) {
    alert("Please select a size!");
    return;
   }
   addToCart(product, selectedSize, 1);
   updateCartCount();
   container.textContent = `${product.title} (size ${selectedSize}) added to cart!`;
  });

  textContainer.append(
   title,
   description,
   sizeOption,
   sizesContainer,
   buttonsContainer
  );
  buttonsContainer.append(backButton, addToCartBtn);

  productDiv.append(image, textContainer);
  container.appendChild(productDiv);
 } catch (error) {
  console.error("Failed to fetch product", error);
  container.textContent = "Failed to load product, please try again!";
 }
}
updateCartCount();
fetchProducts();
