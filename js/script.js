const container = document.querySelector("#container");
const searchInput = document.querySelector("#searchInput");
const pageContainer = document.querySelector("#pageContainer");
const sortSelect = document.querySelector("#sortSelect");
const API_URL = "https://v2.api.noroff.dev/rainy-days";
const LOCAL_PRODUCTS = "/js/localProducts.json";
let products = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 4;


//Fetch API products
export async function fetchProducts() {
 try {
  const response = await fetch(API_URL);
  if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  const apiProducts = result.data;
  products = [...apiProducts];

  productsToRender(products);
 } catch (error) {
  console.error("Failed to fetch products:", error);
  container.innerHTML =
   '<p class="error-msg">Could not load products. Please try refreshing the page.</p>';
 }
}

import { updateCartCount } from "./cart.js";
import { createProductCard } from "./renderProductCard.js";

export function productsToRender(productList) {
 container.innerHTML = "";

 if (productList.length === 0) {
  container.innerHTML =
   '<p class="no-result">No products found. Try a different search!</p>';
  return;
 }

 productList.forEach((product) => {
  const card = createProductCard(product, { showAddBtn: false });
  container.appendChild(card);
 });
}

function paginateData(items, page) {
 const startIndex = (page - 1) * ITEMS_PER_PAGE;
 const endIndex = startIndex + ITEMS_PER_PAGE;
 return items.slice(startIndex, endIndex);
}

function renderPagination(items) {
 pageContainer.innerHTML = "";
 const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
 if (totalPages <= 1) return;

 const prevButton = createPrevButton(currentPage === 1);
 pageContainer.appendChild(prevButton);

 const pageNumberContainer = document.createElement("div");
 pageNumberContainer.classList.add("page-numbers");

 for (let i = 1; i <= totalPages; i++) {
  const pageButton = document.createElement("button");
  pageButton.textContent = i;
  pageButton.dataset.page = i;

  if (i === currentPage) {
   pageButton.classList.add("active");
  }
  pageNumberContainer.appendChild(pageButton);
 }
 pageNumberContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
   const pageNumber = Number(event.target.dataset.page);
   currentPage = pageNumber;
   updatePage();
  }
 });
 pageContainer.appendChild(pageNumberContainer);

 const nextButton = createNextButton(currentPage === totalPages);
 pageContainer.appendChild(nextButton);
}

function createPrevButton(isDisabled) {
 const Button = document.createElement("button");
 Button.innerHTML = `<i class="fa-solid fa-angle-left"></i>`;
 Button.disabled = isDisabled;
 Button.addEventListener("click", () => {
  if (currentPage > 1) {
   currentPage--;
   updatePage();
  }
 });
 return Button;
}

function createNextButton(isDisabled) {
 const Button = document.createElement("button");
 Button.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
 Button.disabled = isDisabled;
 Button.addEventListener("click", () => {
  currentPage++;
  updatePage();
 });
 return Button;
}

function updatePage() {
 const searchTerm = searchInput.value;
 const filteredProducts = filterProducts(searchTerm);

 const sortOption = sortSelect.value;
 const sortedProducts = sortProducts(filteredProducts, sortOption);

 const paginatedProducts = paginateData(sortedProducts, currentPage);

 productsToRender(paginatedProducts);
 renderPagination(sortedProducts);
}

function handleSearch(event) {
 currentPage = 1;
 updatePage();
}

function debounce(func, wait) {
 let timeoutId;

 return function (...args) {
  const context = this;

  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
   func.apply(context, args);
  }, wait);
 };
}

function sortProducts(items, sortOption) {
 const sortedItems = [...items];
 switch (sortOption) {
  case "name-asc":
   sortedItems.sort((a, b) => a.title.localeCompare(b.title));
   break;
  case "name-desc":
   sortedItems.sort((a, b) => b.title.localeCompare(a.title));
   break;
  case "description-desc":
   sortedItems.sort((a, b) => b.description - a.description);
   break;
  case "description-asc":
   sortedItems.sort((a, b) => a.description - b.description);
   break;
  case "gender-asc":
   sortedItems.sort((a, b) => a.gender.localeCompare(b.gender));
   break;
  case "gender-desc":
   sortedItems.sort((a, b) => b.gender.localeCompare(a.gender));
   break;
 }

 return sortedItems;
}

// --- EVENT LISTENERS ---
const debouncedSearch = debounce(handleSearch, 300);
searchInput.addEventListener("input", debouncedSearch);

function filterProducts(searchTerm) {
 const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

 if (!lowerCaseSearchTerm) {
  return products;
 }
 const filtered = products.filter((product) => {
  const nameMatch = product.title?.toLowerCase().includes(lowerCaseSearchTerm);
  const descriptionMatch = product.description
   ?.toLowerCase()
   .includes(lowerCaseSearchTerm);
  const sizeMatch = product.sizes?.some((size) =>
   size.toLowerCase().includes(lowerCaseSearchTerm)
  );

  return nameMatch || descriptionMatch || sizeMatch;
 });

 return filtered;
}

sortSelect.addEventListener("change", () => {
 updatePage();
});

async function startApp() {
 pageContainer.innerHTML = '<div class= "spinner"></div>';
 try {
  await fetchProducts();
  updatePage();
 } catch (error) {
  console.error("Startup failed:", error);
 }
}
startApp();
updateCartCount();


