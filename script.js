// Task 1: Product Class and Data Structure
class Product {
    constructor(id, name, price, image, category = 'electronics', stock = true) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.category = category;
        this.stock = stock;
    }
}

// Product data - using ES6+ array of Product class instances
const products = [
    new Product(1, "Wireless Headphones", 19.99, "image/headphones.webp"),
    new Product(2, "Smart Watch", 29.99, "image/watch.webp"),
    new Product(3, "Bluetooth Speaker", 39.99, "image/speaker.webp"),
    new Product(4, "Backpack", 49.99, "image/backpack.webp"),
    new Product(5, "umbrella", 59.99, "image/umbrella.webp"),
    new Product(6, "Handbag", 69.99, "image/handbag.webp"),
    new Product(7, "Thumbler", 49.99, "image/thumbler.webp"),
    new Product(8, "Perfume", 19.99, "image/thumbler.webp")
];

// Shopping cart array
let cart = [];

// DOM Elements cache
const domElements = {
    productContainer: document.querySelector('#products-container'),
    cartContainer: document.querySelector('#cart-container'),
    cartItems: document.querySelector('#cart-items'),
    cartTotal: document.querySelector('#cart-total'),
    cartCount: document.querySelector('#cart-count'),
    searchInput: document.querySelector('#search-input'),
    categoryFilter: document.querySelector('#category-filter'),
    checkoutForm: document.querySelector('#checkout-form'),
    addToCartButtons: document.querySelectorAll('.add-to-cart')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupEventListeners();
    updateCartDisplay();
});

// Task 2: Render Products using DOM APIs
function renderProducts(productList) {
    if (!domElements.productContainer) return;
    
    domElements.productContainer.innerHTML = ''; // Clear existing products
    
    productList.forEach(product => {
        const productCard = createProductCard(product);
        domElements.productContainer.appendChild(productCard);
    });
}

// Create individual product card using createElement
function createProductCard(product) {
    // Main container
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    // Image
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.className = 'product-image';
    
    // Product info
    const info = document.createElement('div');
    info.className = 'product-info';
    
    const name = document.createElement('h3');
    name.textContent = product.name;
    
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${product.price.toFixed(2)}`;
    
    const addBtn = document.createElement('button');
    addBtn.className = 'add-to-cart-btn';
    addBtn.textContent = 'Add to Cart';
    addBtn.dataset.productId = product.id;
    
    // Append elements
    info.appendChild(name);
    info.appendChild(price);
    info.appendChild(addBtn);
    card.appendChild(img);
    card.appendChild(info);
    
    return card;
}

// Task 3: Event Listeners and Event Bubbling
function setupEventListeners() {
    // Cart buttons (Event Delegation)
    document.addEventListener('click', handleAddToCart);
    
    // Search functionality
    if (domElements.searchInput) {
        domElements.searchInput.addEventListener('input', handleSearch);
    }
    
    // Category filter
    if (domElements.categoryFilter) {
        domElements.categoryFilter.addEventListener('change', handleFilter);
    }
    
    // Checkout form validation
    if (domElements.checkoutForm) {
        domElements.checkoutForm.addEventListener('submit', handleCheckout);
    }
}

// Add to cart handler using Event Bubbling
function handleAddToCart(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(event.target.dataset.productId);
        const product = products.find(p => p.id === productId);
        
        if (product && product.stock) {
            addToCart(product);
            showNotification(`${product.name} added to cart!`);
        } else {
            showNotification('Product out of stock!');
        }
    }
}

// Task 4: Cart Management with Array Methods
function addToCart(product) {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }
    
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        if (item.quantity === 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    if (!domElements.cartItems || !domElements.cartTotal || !domElements.cartCount) return;
    
    domElements.cartItems.innerHTML = '';
    
    const total = cart.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);
    
    domElements.cartTotal.textContent = `$${total.toFixed(2)}`;
    domElements.cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Render cart items
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        domElements.cartItems.appendChild(cartItem);
    });
}

function createCartItem(cartItem) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    
    item.innerHTML = `
        <img src="${cartItem.product.image}" alt="${cartItem.product.name}" class="cart-item-image">
        <div class="cart-item-details">
            <h4>${cartItem.product.name}</h4>
            <p>$${cartItem.product.price.toFixed(2)}</p>
        </div>
        <div class="quantity-controls">
            <button onclick="updateQuantity(${cartItem.product.id}, -1)">-</button>
            <span>${cartItem.quantity}</span>
            <button onclick="updateQuantity(${cartItem.product.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${cartItem.product.id})">Remove</button>
    `;
    
    return item;
}

// Task 5: Search and Filter using Array Methods
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

function handleFilter(event) {
    const category = event.target.value;
    const filtered = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    renderProducts(filtered);
}

// Task 6: Form Validation
function handleCheckout(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const card = formData.get('card').trim();
    
    if (!name || !email || !card) {
        showNotification('Please fill in all fields!', 'error');
        return;
    }
    
    if (!/^\d{16}$/.test(card.replace(/\s/g, ''))) {
        showNotification('Please enter a valid 16-digit card number!', 'error');
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate successful checkout
    showNotification('Order placed successfully! Thank you for your purchase!', 'success');
    cart = [];
    updateCartDisplay();
}

// Utility Functions
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Expose functions globally for onclick handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;