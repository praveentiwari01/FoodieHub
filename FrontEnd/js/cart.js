function init() {
  renderHeader('cart');
  renderFooter();
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartContent');
  const items = Cart.getItems();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state empty-cart">
        <div class="empty-state-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any items yet</p>
        <a href="index.html" class="btn btn-primary">Browse Restaurants</a>
      </div>
    `;
    return;
  }

  const subtotal = Cart.getTotal();
  const deliveryFee = items[0] ? 40 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + deliveryFee + tax;

  container.innerHTML = `
    <div class="cart-items">
      ${items.map(item => `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-restaurant">${item.restaurantName || 'Restaurant'}</p>
            <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
          </div>
          <div class="cart-item-actions">
            <button class="remove-btn" onclick="removeItem(${item.id})">✕ Remove</button>
            <div class="qty-control">
              <button onclick="updateQty(${item.id}, ${item.quantity - 1})">−</button>
              <span>${item.quantity}</span>
              <button onclick="updateQty(${item.id}, ${item.quantity + 1})">+</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="cart-summary">
      <h3 class="summary-title">Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Delivery Fee</span>
        <span>${formatPrice(deliveryFee)}</span>
      </div>
      <div class="summary-row">
        <span>Tax (8%)</span>
        <span>${formatPrice(tax)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>${formatPrice(total)}</span>
      </div>

      <div class="promo-section">
        <label>Promo Code</label>
        <div class="promo-input">
          <input type="text" placeholder="Enter code" id="promoInput">
          <button class="btn btn-secondary btn-sm" onclick="applyPromo()">Apply</button>
        </div>
      </div>

      <div class="summary-actions">
        <a href="checkout.html" class="btn btn-primary btn-lg">Proceed to Checkout</a>
        <a href="index.html" class="btn btn-secondary">Continue Shopping</a>
      </div>
    </div>
  `;
}

function updateQty(itemId, quantity) {
  Cart.updateQuantity(itemId, quantity);
  renderCart();
}

function removeItem(itemId) {
  Cart.removeItem(itemId);
  renderCart();
}

function applyPromo() {
  const code = document.getElementById('promoInput').value.trim();
  if (code.toLowerCase() === 'foodie20') {
    showToast('Promo code applied! 20% off', 'success');
  } else if (code) {
    showToast('Invalid promo code', 'error');
  }
}

document.addEventListener('DOMContentLoaded', init);
