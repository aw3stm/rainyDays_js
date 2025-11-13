const CART_CHECKOUT = "shoppingCart";

export function getCart() {
 return JSON.parse(localStorage.getItem(CART_CHECKOUT)) || [];
}

export function saveCart(cart) {
 localStorage.setItem(CART_CHECKOUT, JSON.stringify(cart));
}

export function addToCart(product, selectedSize, quantity = 1) {
 const cart = getCart();
 const existingItem = cart.find(
  (item) => item.id === product.id && item.size === selectedSize
 );

 if (existingItem) {
  existingItem.quantity += quantity;
 } else {
  cart.push({
   id: product.id,
   title: product.title,
   price: product.price,
   image: {
    url: product.image?.url,
    alt: product.image?.alt,
   },
   size: selectedSize,
   quantity,
  });
 }
 saveCart(cart);
}

export function updateCartCount() {
 const prodCart = getCart();
 const count = prodCart.reduce((total, item) => total + item.quantity, 0);
 const countContent = document.querySelector(".cart-count");
 if (countContent) {
  if (count > 0) {
   countContent.textContent = count;
   countContent.style.opacity = "1";
  } else {
   countContent.style.opacity = "0";
  }
 }
}
