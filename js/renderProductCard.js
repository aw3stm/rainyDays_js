//Created a reusable function for different pages
//Opportunity to choose add to cart button or not

export function createProductCard(product, { showAddBtn = false } = {}) {
 const card = document.createElement("div");
 card.className = "card";

 const image = document.createElement("img");
 image.src = product.image.url;
 image.alt = product.description;
 image.className = "card-image";

 const content = document.createElement("div");
 content.className = "card-content";

 const titleLink = document.createElement("a");
 titleLink.href = `product/index.html?id=${product.id}`;

 const title = document.createElement("h2");
 title.textContent = product.title;
 title.className = "card-title";

 titleLink.appendChild(title);

 const price = document.createElement("p");
 price.textContent = `$${product.price}`;
 price.className = "card-price";

 const gender = document.createElement("p");
 gender.textContent = product.gender;
 gender.className = "card-gender";

 const anchor = document.createElement("a");
 anchor.href = `product/index.html?id=${product.id}`;
 anchor.appendChild(card);

 if (showAddBtn) {
  const button = document.createElement("button");
  button.textContent = "Add to cart";
  button.className = "cart-btn";
  button.addEventListener("click", (event) => {
   event.preventDefault();
   addToCart(product, size, 1);
//    alert(`Added ${product.title} to cart!`);
  });
  content.appendChild(button);
 }

 content.append(price, titleLink, gender);
 card.append(image, content);

 return card;
}
