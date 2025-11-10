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
  const data = await response.json();
  const product = data.data;

  const productDiv = document.createElement("div");
  const textContainer = document.createElement("div");
  const buttonsContainer = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("h2");
  const price = document.createElement("p");
  const description = document.createElement("p");
  const sizeOption = document.createElement("p");
  const sizesContainer = document.createElement("div");
  const backButton = document.createElement("a");
  const addToCartBtn = document.createElement("a");

  productDiv.className = "product-details";
  textContainer.className = "product-text";
  buttonsContainer.className = "product-buttons";
  image.className = "product-image";
  title.className = "product-title";
  price.className = "product-price";
  description.className = "product-description";
  sizeOption.className = "size-opt";
  sizesContainer.className = "product-sizes-container";
  backButton.className = "back-button";
  addToCartBtn.className = "cart-btn";

  image.src = product.image.url;
  image.alt = product.image.alt;
  title.textContent = product.title;
  price.textContent = `$${product.price}`;
  description.textContent = product.description;
  sizeOption.textContent = "Select size";
  backButton.textContent = "Back to Products";
  backButton.href = "../index.html";
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

    console.log("Selected size:", selectedSize);
   });
   sizesContainer.appendChild(button);
  });

  textContainer.appendChild(title);
  textContainer.appendChild(price);
  textContainer.appendChild(description);
  textContainer.appendChild(sizeOption);
  textContainer.appendChild(sizesContainer);
  buttonsContainer.appendChild(backButton);
  buttonsContainer.appendChild(addToCartBtn);

  productDiv.appendChild(image);
  productDiv.appendChild(textContainer);
  textContainer.appendChild(buttonsContainer);
  container.appendChild(productDiv);
 } catch (error) {
  console.error("Failed to fetch product", error);
  container.textContent = "Failed to load product, please try again!";
 }
}

fetchProducts();
