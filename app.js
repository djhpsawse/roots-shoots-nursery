let isAdmin = false;

let products = [
  { name: "Indoor Plant", price: 10, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6" },
  { name: "Garden Shrub", price: 15, image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551" },
  { name: "Fruit Tree", price: 25, image: "https://images.unsplash.com/photo-1472396961693-142e6e269027" }
];

let cart = [];

const el = (id) => document.getElementById(id);

function renderProducts() {
  const list = el("productList");
  list.innerHTML = "";
  products.forEach((p, i) => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>£${p.price}</p>
        <button data-add="${i}">Add to Cart</button>
      </div>
    `;
  });

  list.querySelectorAll("button[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addItem(Number(btn.dataset.add)));
  });
}

function addItem(i) {
  cart.push(products[i]);
  updateCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

function updateCart() {
  const div = el("cartItems");
  let total = 0;
  div.innerHTML = "";

  cart.forEach((c, i) => {
    total += c.price;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${c.name} £${c.price}</span>
      <button class="remove" data-remove="${i}">X</button>
    `;
    div.appendChild(row);
  });

  div.querySelectorAll("button[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => removeItem(Number(btn.dataset.remove)));
  });

  el("count").innerText = cart.length;
  el("total").innerText = total;
}

function toggleCart() {
  el("cartPanel").classList.toggle("open");
}

function payNow() {
  alert("Payment Successful (Mock Stripe)");
  cart = [];
  updateCart();
  toggleCart();
}

function login() {
  const u = el("user").value;
  const p = el("pass").value;

  if (u === "admin" && p === "1234") {
    isAdmin = true;
    el("adminPanel").style.display = "block";
    el("loginPanel").style.display = "none";
    alert("Logged in as admin");
  } else {
    alert("Wrong login");
  }
}

function logout() {
  isAdmin = false;
  el("adminPanel").style.display = "none";
  el("loginPanel").style.display = "block";
}

function addProduct() {
  if (!isAdmin) return;

  products.push({
    name: el("name").value,
    price: parseFloat(el("price").value),
    image: el("image").value
  });

  renderProducts();
}

function scrollToShop() {
  el("productList").scrollIntoView({ behavior: "smooth" });
}

function toggleAdmin() {
  el("loginPanel").scrollIntoView({ behavior: "smooth" });
}

// Wire up UI events
el("cartBtn").addEventListener("click", toggleCart);
el("payBtn").addEventListener("click", payNow);
el("loginBtn").addEventListener("click", login);
el("logoutBtn").addEventListener("click", logout);
el("addProductBtn").addEventListener("click", addProduct);
el("shopLink").addEventListener("click", scrollToShop);
el("adminLink").addEventListener("click", toggleAdmin);

renderProducts();
