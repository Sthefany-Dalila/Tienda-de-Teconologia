const grid = document.getElementById('grid');
if (grid) {
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    grid.appendChild(tile);
  }
}

function startApp() {
  const welcomeBox = document.getElementById('welcome-box');
  const welcomeScreen = document.getElementById('welcome-screen');
  if (welcomeBox && welcomeScreen) {
    welcomeBox.style.opacity = '0';
    welcomeScreen.classList.add('shatter');
    setTimeout(() => { welcomeScreen.style.display = 'none'; }, 800);
  }
}

const products = [
  { id: 1, name: "NVIDIA GTX 1060 6GB", category: "componentes", price: 120.00, icon: "fa-solid fa-microchip", desc: "Gráfica clásica 1080p." },
  { id: 2, name: "NVIDIA RTX 2060 6GB", category: "componentes", price: 210.00, icon: "fa-solid fa-microchip", desc: "Ray Tracing gen 1." },
  { id: 3, name: "NVIDIA RTX 3060 12GB", category: "componentes", price: 295.00, icon: "fa-solid fa-microchip", desc: "Rendimiento y VRAM 1080p/1440p." },
  { id: 4, name: "NVIDIA RTX 4070 12GB", category: "componentes", price: 599.00, icon: "fa-solid fa-microchip", desc: "Arquitectura Ada Lovelace DLSS 3." },
  { id: 5, name: "NVIDIA RTX 4090 24GB", category: "componentes", price: 1799.00, icon: "fa-solid fa-microchip", desc: "La GPU más potente del mercado." },
  { id: 6, name: "Memoria RAM Corsair 16GB DDR4", category: "componentes", price: 45.00, icon: "fa-solid fa-memory", desc: "3200MHz de alta fidelidad." },
  { id: 7, name: "Memoria RAM Kingston 32GB DDR5", category: "componentes", price: 115.00, icon: "fa-solid fa-memory", desc: "Velocidad extrema DDR5 6000MHz." },
  { id: 8, name: "Laptop Gamer ASUS TUF F15", category: "laptops", price: 899.00, icon: "fa-solid fa-laptop", desc: "i5, 16GB RAM, RTX 3050." },
  { id: 9, name: "Computadora CPU Escritorio", category: "laptops", price: 1250.00, icon: "fa-solid fa-desktop", desc: "Ryzen 7, 32GB RAM, SSD 1TB." },
  { id: 10, name: "Samsung Galaxy S24 Ultra", category: "celulares", price: 1199.00, icon: "fa-solid fa-mobile-screen-button", desc: "200MP, AMOLED 120Hz." },
  { id: 11, name: "PlayStation 5 Slim 1TB", category: "consolas", price: 499.00, icon: "fa-solid fa-gamepad", desc: "Consola de última generación." },
  { id: 12, name: "Proyector Portátil Smart 4K", category: "audio", price: 280.00, icon: "fa-solid fa-video", desc: "Android TV integrado." },
  { id: 13, name: "Auriculares Sony WH-1000XM5", category: "audio", price: 349.00, icon: "fa-solid fa-headphones", desc: "Cancelación de ruido activa." },
  { id: 14, name: "Impresora 3D Creality K1", category: "industrial", price: 650.00, icon: "fa-solid fa-cubes", desc: "Alta velocidad industrial 600mm/s." }
];

let cart = JSON.parse(localStorage.getItem('tech_cart')) || [];

function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    badge.innerText = totalQty;
  }
}

function renderProducts(items) {
  const container = document.getElementById('products-container');
  if (!container) return;
  container.innerHTML = '';
  items.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <div class="product-icon"><i class="${p.icon}"></i></div>
        <h3>${p.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem;">${p.desc}</p>
        <div class="product-price">$${p.price.toFixed(2)}</div>
        <button class="add-btn" onclick="addToCart(${p.id})">Añadir al Carrito</button>
      </div>
    `;
  });
}

function filterCategory(cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (window.event) window.event.target.classList.add('active');
  if (cat === 'all') { renderProducts(products); }
  else { renderProducts(products.filter(p => p.category === cat)); }
}

function addToCart(id) {
  const prod = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) { existing.qty += 1; }
  else { cart.push({ ...prod, qty: 1 }); }
  localStorage.setItem('tech_cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${prod.name} agregado al carrito.`);
}

function renderCartPage() {
  const container = document.getElementById('cart-items-page');
  const totalElem = document.getElementById('cart-total-page');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center; color: var(--text-muted);">El carrito está vacío.</p>';
    if (totalElem) totalElem.innerText = 'Total: $0.00';
    return;
  }

  container.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const sub = item.price * item.qty;
    total += sub;
    container.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>$${item.price.toFixed(2)} x ${item.qty}</small>
        </div>
        <div><strong>$${sub.toFixed(2)}</strong></div>
      </div>
    `;
  });
  if (totalElem) totalElem.innerText = `Total: $${total.toFixed(2)}`;
}

function sendWhatsApp() {
  if (cart.length === 0) { alert("Tu carrito está vacío."); return; }
  const phone = "50380000000"; // Número 8000-0000 con código El Salvador
  let msg = "¡Hola! Quiero comprar en TechStore:\n\n";
  let total = 0;
  cart.forEach(i => {
    const sub = i.price * i.qty;
    total += sub;
    msg += `• ${i.name} (x${i.qty}) - $${sub.toFixed(2)}\n`;
  });
  msg += `\n*TOTAL A PAGAR: $${total.toFixed(2)}*`;
  window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderProducts(products);
  renderCartPage();
});