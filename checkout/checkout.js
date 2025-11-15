import { getCart, saveCart, updateCartCount } from "../js/cart.js";

const container = document.querySelector(".cart-details");
const formText = document.querySelector(".checkout-form-bottom");

function renderCart() {
 const cart = getCart();
 container.innerHTML = "";
 formText.innerHTML = "";

 if (cart.length === 0) {
  container.innerHTML = `<p class="cartEmpty">Your cart is empty.</p>`;

  const backHome = document.createElement("a");
  backHome.className = "backHome";
  backHome.innerHTML = `<i class="fa-solid fa-angle-left"></i> <span>Back to Start</span>`;
  backHome.href = "../index.html";
  container.append(backHome);

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

   const formInfo = document.querySelector(".right-column");
   if (orderDone) orderDone.style.display = "none";
   if (formInfo) formInfo.style.display = "none";

   renderCart();
   updateCartCount();
  });
  const backButton = document.createElement("a");
  backButton.className = "back-button";
  backButton.innerHTML = `<i class="fa-solid fa-angle-left"></i> <span>Continue shopping</span>`;
  backButton.href = "../index.html";

  total += item.price * item.quantity;

  prodInfo.append(
   prodTitle,
   prodSize,
   prodPrice,
   prodQuantity,
   removeBtn,
   backButton
  );
  productContainer.append(prodImg, prodInfo);

  container.append(productContainer);
 });

 const checkoutWrapper = document.querySelector(".checkout-wrapper");

 const buyButton = document.createElement("a");
 buyButton.className = "buy-button";
 buyButton.innerHTML = `<i class="fa-solid fa-bag-shopping"></i></i> <span>Place order</span>`;
 buyButton.href = "../confirmation/index.html";

 const prodTotalDiv = document.createElement("div");
 prodTotalDiv.className = "cart-total";
 prodTotalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
 const shipping = document.createElement("h4");
 shipping.className = "shipping-h4";
 shipping.innerHTML = "Shipping: Free";

 prodTotalDiv.append(shipping);

 checkoutWrapper.insertAdjacentElement("afterend", prodTotalDiv);
 checkoutWrapper.insertAdjacentElement("afterend", buyButton);

 const orderDone = document.createElement("div");
 orderDone.className = "order-done";

 orderDone.append(prodTotalDiv, buyButton);

 checkoutWrapper.insertAdjacentElement("afterend", orderDone);

 updateCartCount();
}
updateCartCount();
renderCart();
