const products = [
  {
    name: "Milk",
    price: 50,
    expiry: "2025-07-25",
    stock: 20,
    image: "Images/Cow milk-450ml.jpg"
  },
  {
    name: "Bread",
    price: 30,
    expiry: "2025-07-24",
    stock: 50,
    image: "Images/bread.jpg"
  },
  {
    name: "Rice",
    price: 80,
    expiry: "2025-08-15",
    stock: 150,
    image: "Images/Rice.jpg"
  },
  {
    name: "Tomatoes",
    price: 40,
    expiry: "2025-07-22",
    stock: 10,
    image: "Images/tomatoes-1296x728-feature.jpg"
  },
  {
    name: "Cheese",
    price: 120,
    expiry: "2025-07-23",
    stock: 120,
    image: "Images/cheese.jpeg"
  },
  {
    name: "Banana",
    price: 80,
    expiry: "2025-07-25",
    stock: 50,
    image: "Images/banana.jpg"
  },
  {
    name: "Chilli Powder",
    price: 50,
    expiry: "2025-10-20",
    stock: 120,
    image: "Images/stock-chili-powder-and-chilis.webp"
  },
  {
    name: "Dates",
    price: 120,
    expiry: "2025-12-10",
    stock: 120,
    image: "Images/dates.jpeg"
  }
];

const cart = [];
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart");
const totalDisplay = document.getElementById("total");

function isExpiringSoon(dateStr) {
  const expiry = new Date(dateStr);
  const today = new Date();
  const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
  return diffDays <= 3;
}

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const discounted = product.stock >= 100;
    const expiring = isExpiringSoon(product.expiry);
    const finalPrice = discounted ? product.price * 0.9 : product.price;

    const card = document.createElement("div");
    card.className = "product-card";
    if (expiring) card.classList.add("expiring");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="info">
        <h3>${product.name}</h3>
        <p>Price: ₹${finalPrice.toFixed(2)} ${discounted ? "<span class='discount'>(10% Off)</span>" : ""}</p>
        <p>Stock: ${product.stock}</p>
        <p>Expiry: ${product.expiry}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

function addToCart(index) {
  const product = products[index];
  cart.push(product);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const discounted = item.stock >= 100;
    const price = discounted ? item.price * 0.9 : item.price;
    total += price;

    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${price.toFixed(2)}`;
    cartList.appendChild(li);
  });
  totalDisplay.textContent = `Total: ₹${total.toFixed(2)}`;
}

renderProducts();