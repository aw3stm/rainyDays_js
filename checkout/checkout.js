import { getCart, saveCart, updateCartCount } from "../js/cart.js";

const container = document.querySelector(".cart-details");

function renderCart() {
 const cart = getCart();
 container.innerHTML = "";

 if (cart.length === 0) {
  container.innerHTML = `<p>Your cart is empty.</p>`;
  return;
 }

 let total = 0;

 cart.forEach((item, index) => {
  const productContainer = document.createElement("div");
  productContainer.className = "cart-content";

  const prodImg = document.createElement("img");
  prodImg.src = item.image.url;
  prodImg.alt = item.image.alt;
  prodImg.className = "cart-img";

  const prodInfo = document.createElement("div");
  prodInfo.className = "product-info";

  const prodTitle = document.createElement("h2");
  prodTitle.textContent = item.title;

  const prodSize = document.createElement("p");
  prodSize.textContent = `Size: ${item.size}`;

  const prodPrice = document.createElement("p");
  prodPrice.textContent = `$${item.price}`;

  const prodQuantity = document.createElement("p");
  prodQuantity.textContent = `Quantity: ${item.quantity}`;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  removeBtn.addEventListener("click", () => {
   cart.splice(index, 1);
   saveCart(cart);
   renderCart();
   updateCartCount();
  });

  total += item.price * item.quantity;

  prodInfo.append(prodTitle, prodSize, prodPrice, prodQuantity, removeBtn);
  productContainer.append(prodImg, prodInfo);
  container.append(productContainer);
 });

 const backButton = document.createElement("a");
 backButton.className = "back-button";
 backButton.innerHTML = `<i class="fa-solid fa-angle-left"></i> <span>Back to products</span>`;
 backButton.href = "../index.html";

 const buyButton = document.createElement("a");
 buyButton.className = "buy-button";
 buyButton.innerHTML = `<i class="fa-solid fa-bag-shopping"></i></i> <span>Buy products</span>`;
 buyButton.href = "/confirmation/index.html";

 const prodTotalDiv = document.createElement("div");
 prodTotalDiv.className = "cart-total";
 prodTotalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;

 container.append(buyButton);
 container.append(backButton)
 container.append(prodTotalDiv);
 updateCartCount();
}
updateCartCount();
renderCart();
