import { getCart, updateCartCount } from "../js/cart.js";

const confirmationContainer = document.querySelector("#confirmationContainer");
const IS_PRODUCTION = true;

function renderConfirmation() {
 const cart = getCart();
 // When user reloads page -> go back to start
 if (!cart || cart.length === 0) {
  window.location.href = "../index.html";
  return;
 }

 const totalAmount = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
 );

 confirmationContainer.innerHTML = `
    <h2 class="thankYouTitle">Order Confirmation</h2>
    <ul class="order-list">
      ${cart
       .map(
        (item) => `
        <li>
          <img src="${item.image?.url}" alt="${
         item.image?.alt || "Product image"
        }" />
          <div class="confirmationList">
            <p>${item.title}</p>
            <p>Size: ${item.size}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.price}</p>
          </div>
        </li>`
       )
       .join("")}
    </ul>
    <h3 class="totalThankYou">Total: $${totalAmount.toFixed(2)}</h3>
    <p class="thankYouText">Thank you for your purchase!</p> 
    <p class="thankYouText">Order confirmation has been sent to your email.</p>
  `;
 if (IS_PRODUCTION) {
  localStorage.removeItem("shoppingCart");
  updateCartCount();
 }
}

renderConfirmation();
