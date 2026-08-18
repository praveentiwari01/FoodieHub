let selectedDelivery = 'standard';
let selectedPayment = 'card';

function init() {
  renderHeader();
  renderFooter();

  const items = Cart.getItems();
  if (items.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  renderCheckout();
}

function renderCheckout() {
  const container = document.getElementById('checkoutContent');
  const items = Cart.getItems();
  const subtotal = Cart.getTotal();
  const deliveryFee = selectedDelivery === 'express' ? 80 : 40;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + deliveryFee + tax;

  container.innerHTML = `
    <div class="checkout-form">
      <div class="form-section">
        <h3>📍 Delivery Address</h3>
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" id="fullName" placeholder="John Doe" value="John Doe">
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" id="phone" placeholder="(555) 123-4567" value="(555) 123-4567">
        </div>
        <div class="form-group">
          <label>Delivery Address</label>
          <input type="text" id="address" placeholder="123 Main Street, Apt 4B" value="123 Main Street, Apt 4B">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>City</label>
            <input type="text" id="city" placeholder="New York" value="New York">
          </div>
          <div class="form-group">
            <label>ZIP Code</label>
            <input type="text" id="zip" placeholder="10001" value="10001">
          </div>
        </div>
        <div class="form-group">
          <label>Delivery Instructions (Optional)</label>
          <textarea id="instructions" placeholder="Leave at door, ring doorbell, etc."></textarea>
        </div>
      </div>

      <div class="form-section">
        <h3>🕐 Delivery Time</h3>
        <div class="delivery-options">
          <div class="delivery-option ${selectedDelivery === 'standard' ? 'active' : ''}" onclick="selectDelivery('standard')">
            <div class="icon">🚴</div>
            <div class="time">30-45 min</div>
            <div class="fee">₹40</div>
          </div>
          <div class="delivery-option ${selectedDelivery === 'express' ? 'active' : ''}" onclick="selectDelivery('express')">
            <div class="icon">⚡</div>
            <div class="time">15-25 min</div>
            <div class="fee">₹80</div>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3>💳 Payment Method</h3>
        <div class="payment-methods">
          <div class="payment-method ${selectedPayment === 'card' ? 'active' : ''}" onclick="selectPayment('card')">
            <div class="radio"></div>
            <div class="icon">💳</div>
            <div class="info">
              <div class="name">Credit/Debit Card</div>
              <div class="desc">Visa, Mastercard, Amex</div>
            </div>
          </div>
          <div class="payment-method ${selectedPayment === 'cash' ? 'active' : ''}" onclick="selectPayment('cash')">
            <div class="radio"></div>
            <div class="icon">💵</div>
            <div class="info">
              <div class="name">Cash on Delivery</div>
              <div class="desc">Pay when your order arrives</div>
            </div>
          </div>
          <div class="payment-method ${selectedPayment === 'wallet' ? 'active' : ''}" onclick="selectPayment('wallet')">
            <div class="radio"></div>
            <div class="icon">📱</div>
            <div class="info">
              <div class="name">Digital Wallet</div>
              <div class="desc">Apple Pay, Google Pay</div>
            </div>
          </div>
        </div>
      </div>

      ${selectedPayment === 'card' ? `
      <div class="form-section" id="cardSection">
        <h3>💳 Card Details</h3>
        <div class="form-group">
          <label>Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" maxlength="19">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Expiry Date</label>
            <input type="text" placeholder="MM/YY" maxlength="5">
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input type="text" placeholder="123" maxlength="4">
          </div>
        </div>
      </div>
      ` : ''}
    </div>

    <div class="order-summary">
      <h3>Order Summary</h3>
      <div class="order-items">
        ${items.map(item => `
          <div class="order-item">
            <div class="order-item-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-item-info">
              <div class="order-item-name">${item.name}</div>
              <div class="order-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
          </div>
        `).join('')}
      </div>
      <div class="order-totals">
        <div class="order-row">
          <span>Subtotal</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="order-row">
          <span>Delivery</span>
          <span>${formatPrice(deliveryFee)}</span>
        </div>
        <div class="order-row">
          <span>Tax (8%)</span>
          <span>${formatPrice(tax)}</span>
        </div>
        <div class="order-row total">
          <span>Total</span>
          <span>${formatPrice(total)}</span>
        </div>
      </div>
      <button class="btn btn-primary btn-lg place-order-btn" onclick="placeOrder()">
        Place Order • ${formatPrice(total)}
      </button>
    </div>
  `;
}

function selectDelivery(type) {
  selectedDelivery = type;
  renderCheckout();
}

function selectPayment(method) {
  selectedPayment = method;
  renderCheckout();
}

function placeOrder() {
  if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
    showToast('Please login to place an order', 'error');
    setTimeout(() => window.location.href = 'login.html', 1000);
    return;
  }

  const orderId = 'FH' + Math.random().toString(36).substr(2, 8).toUpperCase();
  const items = Cart.getItems();
  const subtotal = Cart.getTotal();
  const deliveryFee = selectedDelivery === 'express' ? 80 : 40;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + deliveryFee + tax;

  const order = {
    id: orderId,
    items,
    subtotal,
    deliveryFee,
    tax,
    total,
    delivery: selectedDelivery,
    payment: selectedPayment,
    address: document.getElementById('address')?.value || '123 Main Street',
    date: new Date().toISOString()
  };

  localStorage.setItem('currentOrder', JSON.stringify(order));
  Cart.clear();
  window.location.href = 'tracking.html';
}

document.addEventListener('DOMContentLoaded', init);
