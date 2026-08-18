let activeCategory = 'all';
let searchQuery = '';

function init() {
  renderHeader('home');
  renderFooter();
  renderCategories();

  if (sessionStorage.getItem('homeVisited')) {
    document.getElementById('restaurantsGrid')?.classList.add('no-animation');
  } else {
    sessionStorage.setItem('homeVisited', 'true');
  }

  renderRestaurants();
  setupSearch();
}

function renderCategories() {
  const container = document.getElementById('categories');
  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-btn ${cat.id === activeCategory ? 'active' : ''}" onclick="filterByCategory('${cat.id}')">
      <span class="icon">${cat.icon}</span>
      <span class="name">${cat.name}</span>
    </button>
  `).join('');
}

function renderRestaurants() {
  const container = document.getElementById('restaurantsGrid');
  const noResults = document.getElementById('noResults');

  let filtered = RESTAURANTS;

  if (activeCategory !== 'all') {
    filtered = filtered.filter(r => r.category === activeCategory);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  container.innerHTML = filtered.map(r => `
    <div class="card restaurant-card" onclick="goToRestaurant(${r.id})">
      <div class="card-image">
        <img src="${r.image}" alt="${r.name}" loading="lazy">
        ${r.featured ? '<span class="card-badge">Featured</span>' : ''}
        <span class="card-delivery">⏱ ${r.deliveryTime}</span>
      </div>
      <div class="card-body">
        <div class="card-header">
          <h3 class="card-title">${r.name}</h3>
          <div class="rating">⭐ ${r.rating} <span>(${r.reviews})</span></div>
        </div>
        <p class="card-cuisine">${r.cuisine} • ${getPriceRange(r.id)}</p>
        <div class="card-footer">
          <span>📍 ${r.address}</span>
          <span>Delivery: ${formatPrice(r.deliveryFee)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function getPriceRange(restaurantId) {
  const items = MENU_ITEMS[restaurantId] || [];
  if (items.length === 0) return null;
  const prices = items.map(i => i.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `₹${min} - ₹${max}`;
}

function filterByCategory(categoryId) {
  activeCategory = categoryId;
  renderCategories();
  renderRestaurants();
}

function setupSearch() {
  const input = document.getElementById('searchInput');
  let debounce;
  input.addEventListener('input', (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      searchQuery = e.target.value;
      renderRestaurants();
    }, 300);
  });
}

function goToRestaurant(id) {
  window.location.href = `restaurant.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', init);
