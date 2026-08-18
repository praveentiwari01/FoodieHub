const Cart = {
  getItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
  },

  saveItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
    this.updateCount();
  },

  addItem(item, restaurantId, restaurantName) {
    const items = this.getItems();
    const existing = items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        restaurantId,
        restaurantName
      });
    }

    this.saveItems(items);
    showToast(`${item.name} added to cart`, 'success');
  },

  removeItem(itemId) {
    const items = this.getItems().filter(i => i.id !== itemId);
    this.saveItems(items);
  },

  updateQuantity(itemId, quantity) {
    const items = this.getItems();
    const item = items.find(i => i.id === itemId);

    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId);
      } else {
        item.quantity = quantity;
        this.saveItems(items);
      }
    }
  },

  getTotal() {
    return this.getItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getItemCount() {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  },

  clear() {
    localStorage.removeItem('cartItems');
    this.updateCount();
  },

  updateCount() {
    const countEl = document.querySelector('.cart-count');
    if (countEl) {
      const count = this.getItemCount();
      countEl.textContent = count;
      countEl.style.display = count > 0 ? 'flex' : 'none';
    }
    updateFloatingCart();
  }
};

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : '✕'}</span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

function renderHeader(activePage = '') {
  const header = document.querySelector('.header');
  if (!header) return;

  const isLoggedIn = typeof Auth !== 'undefined' && Auth.isLoggedIn();
  const user = isLoggedIn ? Auth.getUser() : null;

  header.innerHTML = `
    <div class="header-container">
      <a href="index.html" class="logo">
        <span class="logo-icon">🍔</span>
        <span>FoodieHub</span>
      </a>
      <nav>
        <ul class="nav-menu">
          <li><a href="index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="cart.html" class="${activePage === 'cart' ? 'active' : ''}">Cart</a></li>
          <li><a href="tracking.html" class="${activePage === 'tracking' ? 'active' : ''}">Orders</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <a href="cart.html" class="cart-btn">
          🛒
          <span class="cart-count" style="display: ${Cart.getItemCount() > 0 ? 'flex' : 'none'}">${Cart.getItemCount()}</span>
        </a>
        ${isLoggedIn ? `
          <div class="user-menu">
            <button class="user-btn" onclick="toggleUserMenu()">
              <span class="user-avatar">👤</span>
              <span class="user-name">${user?.name || 'User'}</span>
            </button>
            <div class="user-dropdown" id="userDropdown">
              <a href="#" onclick="showProfile(event)">Profile</a>
              <a href="#" onclick="logoutUser(event)">Logout</a>
            </div>
          </div>
        ` : `
          <a href="login.html" class="btn btn-primary btn-sm">Login</a>
        `}
        <button class="hamburger" onclick="toggleMenu()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;
}

function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.classList.toggle('show');
}

function showProfile(e) {
  e.preventDefault();
  toggleUserMenu();
  alert('Profile page coming soon!');
}

function logoutUser(e) {
  e.preventDefault();
  if (typeof Auth !== 'undefined') {
    Auth.logout();
  }
}

function renderFooter() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-col">
        <h4>🍔 FoodieHub</h4>
        <p>Your favorite restaurants, delivered fast to your door.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="cart.html">Cart</a>
        <a href="tracking.html">Track Order</a>
      </div>
      <div class="footer-col">
        <h4>Cuisines</h4>
        <a href="index.html">Pizza</a>
        <a href="index.html">Chinese</a>
        <a href="index.html">Indian</a>
        <a href="index.html">Burgers</a>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <p>📍 123 Food Street, Flavor City</p>
        <p>📞 (555) 123-4567</p>
        <p>✉️ hello@foodiehub.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 FoodieHub. All rights reserved.</p>
    </div>
  `;
}

function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('active');
}

function getUrlParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function getRestaurant(id) {
  return RESTAURANTS.find(r => r.id === parseInt(id));
}

function getMenuItems(restaurantId) {
  return MENU_ITEMS[restaurantId] || [];
}

function formatPrice(price) {
  return `₹${price}`;
}

function renderFloatingCart() {
  const existing = document.querySelector('.floating-cart-global');
  if (existing) existing.remove();

  const page = window.location.pathname.split('/').pop();
  if (page === 'cart.html' || page === 'checkout.html' || page === 'tracking.html') return;

  const count = Cart.getItemCount();
  if (count === 0) return;

  const total = Cart.getTotal();
  const cart = document.createElement('a');
  cart.href = 'cart.html';
  cart.className = 'floating-cart-global';
  cart.innerHTML = `
    <span class="cart-icon">🛒</span>
    <span class="cart-badge">${count}</span>
    <span>View Cart • ${formatPrice(total)}</span>
  `;
  document.body.appendChild(cart);
}

function updateFloatingCart() {
  const existing = document.querySelector('.floating-cart-global');
  if (existing) existing.remove();

  const page = window.location.pathname.split('/').pop();
  if (page === 'cart.html' || page === 'checkout.html' || page === 'tracking.html') return;

  const count = Cart.getItemCount();
  if (count === 0) return;

  const total = Cart.getTotal();
  const cart = document.createElement('a');
  cart.href = 'cart.html';
  cart.className = 'floating-cart-global';
  cart.innerHTML = `
    <span class="cart-icon">🛒</span>
    <span class="cart-badge">${count}</span>
    <span>View Cart • ${formatPrice(total)}</span>
  `;
  document.body.appendChild(cart);
}

document.addEventListener('DOMContentLoaded', () => {
  Cart.updateCount();
  renderFloatingCart();
});
