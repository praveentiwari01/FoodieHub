let currentStep = 0;
let order = null;

const steps = [
  { icon: '✓', title: 'Order Confirmed', desc: 'Your order has been received' },
  { icon: '👨‍🍳', title: 'Preparing', desc: 'Restaurant is preparing your food' },
  { icon: '🚴', title: 'Out for Delivery', desc: 'Driver is on the way to you' },
  { icon: '🏠', title: 'Delivered', desc: 'Enjoy your meal!' }
];

function init() {
  renderHeader('tracking');

  order = JSON.parse(localStorage.getItem('currentOrder'));

  if (!order) {
    renderNoOrder();
    return;
  }

  renderTracking();
  simulateProgress();
}

function renderNoOrder() {
  document.getElementById('trackingContent').innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">📦</div>
      <h3>No active orders</h3>
      <p>Place an order to track it here</p>
      <a href="index.html" class="btn btn-primary">Order Now</a>
    </div>
  `;
}

function renderTracking() {
  const container = document.getElementById('trackingContent');
  const completedSteps = steps.slice(0, currentStep + 1);
  const fillHeight = (currentStep / (steps.length - 1)) * 100;

  const eta = order.delivery === 'express' ? '15-25' : '30-45';

  container.innerHTML = `
    <div class="tracking-header">
      <div class="checkmark">✓</div>
      <h1>Order Placed Successfully!</h1>
      <p class="order-id">Order ID: <span>${order.id}</span></p>
    </div>

    <div class="tracking-body">
      <div class="progress-section">
        <h3 style="margin-bottom: 1.5rem;">Order Status</h3>
        <div class="progress-steps">
          <div class="progress-line">
            <div class="progress-line-fill" style="height: ${fillHeight}%"></div>
          </div>
          ${steps.map((step, i) => `
            <div class="step ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'active' : ''}">
              <div class="step-icon">${step.icon}</div>
              <div class="step-info">
                <h4>${step.title}</h4>
                <p>${step.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <div class="eta-card">
          <div class="eta-label">Estimated Delivery</div>
          <div class="eta-time">${eta} min</div>
          <div class="eta-sub">${steps[currentStep].desc}</div>
        </div>

        <div class="order-details">
          <h3>Order Details</h3>
          <div class="detail-row">
            <span>Order ID</span>
            <span>${order.id}</span>
          </div>
          <div class="detail-row">
            <span>Payment</span>
            <span>${order.payment === 'card' ? '💳 Card' : order.payment === 'cash' ? '💵 Cash' : '📱 Wallet'}</span>
          </div>
          <div class="detail-row">
            <span>Delivery</span>
            <span>${order.delivery === 'express' ? '⚡ Express' : '🚴 Standard'}</span>
          </div>
          <div class="detail-row">
            <span>Address</span>
            <span>${order.address}</span>
          </div>

          <div class="detail-items">
            <h4>Items</h4>
            ${order.items.map(item => `
              <div class="detail-item">
                <span>${item.quantity}x ${item.name}</span>
                <span>${formatPrice(item.price * item.quantity)}</span>
              </div>
            `).join('')}
          </div>

          <div class="detail-row">
            <span>Subtotal</span>
            <span>${formatPrice(order.subtotal)}</span>
          </div>
          <div class="detail-row">
            <span>Delivery</span>
            <span>${formatPrice(order.deliveryFee)}</span>
          </div>
          <div class="detail-row">
            <span>Tax</span>
            <span>${formatPrice(order.tax)}</span>
          </div>
          <div class="detail-row total">
            <span>Total</span>
            <span>${formatPrice(order.total)}</span>
          </div>

          <div class="btn-group">
            <a href="index.html" class="btn btn-primary">Order Again</a>
            <a href="index.html" class="btn btn-secondary">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function simulateProgress() {
  if (currentStep < steps.length - 1) {
    setTimeout(() => {
      currentStep++;
      renderTracking();
      simulateProgress();
    }, 4000);
  }
}

document.addEventListener('DOMContentLoaded', init);
