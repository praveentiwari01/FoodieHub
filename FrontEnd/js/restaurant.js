let restaurant = null;
let menuItems = [];
let activeMenuCategory = 'all';
let modalQuantity = 1;
let currentModalItem = null;

function init() {
  const id = getUrlParam('id');
  if (!id) {
    window.location.href = 'index.html';
    return;
  }

  restaurant = getRestaurant(id);
  if (!restaurant) {
    window.location.href = 'index.html';
    return;
  }

  menuItems = getMenuItems(parseInt(id));
  document.title = `${restaurant.name} - FoodieHub`;

  renderHeader();
  renderFooter();
  renderRestaurantHero();
  renderSidebar();
  renderMenu();
  updateFloatingCart();
}

function renderRestaurantHero() {
  const hero = document.getElementById('restaurantHero');
  hero.innerHTML = `
    <img src="${restaurant.image}" alt="${restaurant.name}">
    <div class="overlay">
      <a href="index.html" class="back-btn">← Back</a>
      <h1>${restaurant.name}</h1>
      <div class="meta">
        <span>⭐ ${restaurant.rating} (${restaurant.reviews} reviews)</span>
        <span> cuisine</span>
        <span>⏱ ${restaurant.deliveryTime}</span>
        <span>Delivery: ₹${restaurant.deliveryFee}</span>
        <span>${restaurant.priceRange}</span>
      </div>
    </div>
  `;
}

function renderSidebar() {
  const sidebar = document.getElementById('menuSidebar');
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  sidebar.innerHTML = `
    <h3 class="sidebar-title">Menu</h3>
    ${categories.map(cat => `
      <button class="sidebar-item ${cat === activeMenuCategory ? 'active' : ''}" onclick="filterMenuCategory('${cat}')">
        ${cat === 'all' ? '🍽️ All' : cat}
      </button>
    `).join('')}
  `;
}

function renderMenu() {
  const grid = document.getElementById('menuGrid');
  let filtered = activeMenuCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeMenuCategory);

  const grouped = {};
  filtered.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  let html = '';
  for (const [category, items] of Object.entries(grouped)) {
    html += `
      <h3 class="menu-category-title">${category}</h3>
      <div class="menu-grid">
        ${items.map(item => `
          <div class="menu-item" onclick="openModal(${item.id})">
            <div class="menu-item-image">
              <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-item-info">
              <div>
                <div class="menu-item-header">
                  <h4 class="menu-item-name">${item.name}</h4>
                  ${item.popular ? '<span class="menu-item-popular">🔥 Popular</span>' : ''}
                </div>
                <p class="menu-item-desc">${item.description}</p>
              </div>
              <div class="menu-item-footer">
                <span class="menu-item-price">${formatPrice(item.price)}</span>
                <button class="add-btn" onclick="event.stopPropagation(); quickAdd(${item.id})">+</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  grid.innerHTML = html || '<p style="text-align:center; color: var(--gray); padding: 2rem;">No items in this category</p>';
}

function filterMenuCategory(category) {
  activeMenuCategory = category;
  renderSidebar();
  renderMenu();
}

function openModal(itemId) {
  currentModalItem = menuItems.find(i => i.id === itemId);
  if (!currentModalItem) return;

  modalQuantity = 1;
  const modal = document.getElementById('itemModal');
  const body = document.getElementById('modalBody');

  body.innerHTML = `
    <img class="modal-image" src="${currentModalItem.image}" alt="${currentModalItem.name}">
    <div class="modal-content">
      <h2>${currentModalItem.name}</h2>
      <p class="description">${currentModalItem.description}</p>
      <div class="quantity-selector">
        <button class="qty-btn" onclick="changeModalQty(-1)">−</button>
        <span id="modalQty">${modalQuantity}</span>
        <button class="qty-btn" onclick="changeModalQty(1)">+</button>
      </div>
      <div class="modal-footer">
        <span class="modal-total" id="modalTotal">${formatPrice(currentModalItem.price)}</span>
        <button class="btn btn-primary" onclick="addFromModal()">Add to Cart • ${formatPrice(currentModalItem.price)}</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('itemModal').classList.remove('active');
  currentModalItem = null;
}

function changeModalQty(delta) {
  modalQuantity = Math.max(1, modalQuantity + delta);
  document.getElementById('modalQty').textContent = modalQuantity;
  document.getElementById('modalTotal').textContent = formatPrice(currentModalItem.price * modalQuantity);
}

function addFromModal() {
  for (let i = 0; i < modalQuantity; i++) {
    Cart.addItem(currentModalItem, restaurant.id, restaurant.name);
  }
  closeModal();
  updateFloatingCart();
}

function quickAdd(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (item) {
    Cart.addItem(item, restaurant.id, restaurant.name);
    updateFloatingCart();
  }
}

function updateFloatingCart() {
  const floatingCart = document.getElementById('floatingCart');
  const count = Cart.getItemCount();
  const total = Cart.getTotal();

  if (count > 0) {
    floatingCart.style.display = 'block';
    document.getElementById('floatingCount').textContent = count;
    document.getElementById('floatingTotal').textContent = formatPrice(total);
  } else {
    floatingCart.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', init);
