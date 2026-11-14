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

// Lista de productos con FOTOGRAFÍAS REALES de alta calidad
const products = [
  { id: 1, name: "NVIDIA GTX 1060 6GB", category: "componentes", price: 120.00, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80", desc: "Gráfica clásica 1080p para gaming accesible." },
  { id: 2, name: "NVIDIA RTX 2060 6GB", category: "componentes", price: 210.00, image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80", desc: "Compatible con Ray Tracing de primera generación." },
  { id: 3, name: "NVIDIA RTX 3060 12GB", category: "componentes", price: 295.00, image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80", desc: "Alto rendimiento y gran VRAM para diseño y juegos." },
  { id: 4, name: "NVIDIA RTX 4070 12GB", category: "componentes", price: 599.00, image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80", desc: "Arquitectura Ada Lovelace con DLSS 3 avanzado." },
  { id: 5, name: "NVIDIA RTX 4090 24GB", category: "componentes", price: 1799.00, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80", desc: "La GPU más potente y monstruosa del mercado." },
  { id: 6, name: "Memoria RAM Corsair 16GB DDR4", category: "componentes", price: 45.00, image: "https://images.unsplash.com/photo-1562976540-1e02cff10b3d?auto=format&fit=crop&w=600&q=80", desc: "Módulos de alta velocidad a 3200MHz con disipador." },
  { id: 7, name: "Memoria RAM Kingston 32GB DDR5", category: "componentes", price: 115.00, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80", desc: "Ancho de banda extremo DDR5 a 6000MHz." },
  { id: 8, name: "Laptop Gamer ASUS TUF F15", category: "laptops", price: 899.00, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80", desc: "Procesador Intel i5, 16GB RAM y gráfica RTX 3050." },
  { id: 9, name: "Computadora CPU Escritorio Pro", category: "laptops", price: 1250.00, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80", desc: "Torre Ryzen 7 con 32GB RAM y almacenamiento SSD 1TB." },
  { id: 10, name: "Samsung Galaxy S24 Ultra", category: "celulares", price: 1199.00, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80", desc: "Cámara de 200MP y pantalla AMOLED fluida a 120Hz." },
  { id: 11, name: "PlayStation 5 Slim 1TB", category: "consolas", price: 499.00, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80", desc: "Consola de última generación con diseño compacto." },
  { id: 12, name: "Proyector Portátil Smart 4K", category: "audio", price: 280.00, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80", desc: "Proyección en alta definición con Android TV integrado." },
  { id: 13, name: "Auriculares Sony WH-1000XM5", category: "audio", price: 349.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", desc: "Cancelación de ruido líder en la industria." },
  { id: 14, name: "Impresora 3D Creality K1", category: "industrial", price: 650.00, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", desc: "Impresión 3D de alta velocidad industrial (600mm/s)." }
];

let cart = JSON.parse(localStorage.getItem('tech_cart')) || [];

function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    badge.innerText = totalQty;
  }
}

// Renderizado con FOTOS REALES y diseño limpio
function renderProducts(items) {
  const container = document.getElementById('products-container');
  if (!container) return;
  container.innerHTML = '';
  items.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <div class="product-img-box">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <h3>${p.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">${p.desc}</p>
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
  alert(`¡${prod.name} agregado al carrito con éxito!`);
}

function renderCartPage() {
  const container = document.getElementById('cart-items-page');
  const totalElem = document.getElementById('cart-total-page');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 2rem;">Tu carrito está vacío.</p>';
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
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;" alt="">
          <div>
            <strong>${item.name}</strong><br>
            <small style="color: var(--text-muted);">$${item.price.toFixed(2)} x ${item.qty}</small>
          </div>
        </div>
        <div><strong>$${sub.toFixed(2)}</strong></div>
      </div>
    `;
  });
  if (totalElem) totalElem.innerText = `Total: $${total.toFixed(2)}`;
}

function sendWhatsApp() {
  if (cart.length === 0) { alert("Tu carrito está vacío."); return; }
  const phone = "50380000000"; // Número 8000-0000
  let msg = "¡Hola! Quiero hacer un pedido en TechStore:\n\n";
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