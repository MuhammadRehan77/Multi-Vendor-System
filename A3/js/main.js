// Cart functionality
let cart = [];
let wishlist = [];

// 1. Cart Management
function addToCart(productId, name, price, image) {
    cart.push({ id: productId, name, price, image, quantity: 1 });
    updateCartCount();
    showNotification('Item added to cart!');
    saveCartToLocalStorage();
    renderCart(); // Update cart display if open
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCartToLocalStorage();
    renderCart(); // Re-render cart if it's open
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cart Toggle and Render Functions
function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    if (!cartPanel) {
        // Create cart panel if it doesn't exist
        createCartPanel();
    } else {
        cartPanel.classList.toggle('translate-x-full');
    }
    renderCart();
}

function createCartPanel() {
    const panel = document.createElement('div');
    panel.id = 'cartPanel';
    panel.className = 'fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out z-50';
    panel.innerHTML = `
        <div class="p-4 border-b">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">Shopping Cart</h2>
                <button onclick="toggleCart()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <div id="cartItems" class="p-4 overflow-y-auto" style="height: calc(100% - 180px);"></div>
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <div class="flex justify-between mb-4">
                <span class="font-bold">Total:</span>
                <span id="cartTotal" class="font-bold">$0.00</span>
            </div>
            <button onclick="checkout()" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Checkout
            </button>
        </div>
    `;
    document.body.appendChild(panel);
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (!cartItems) return;

    cartItems.innerHTML = cart.length === 0 
        ? '<p class="text-center text-gray-500">Your cart is empty</p>'
        : cart.map(item => `
            <div class="flex items-center mb-4 p-2 border-b">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="ml-4 flex-1">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-gray-600">$${item.price}</p>
                    <div class="flex items-center mt-2">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-2">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button onclick="removeFromCart(${item.id})" class="ml-4 text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCartToLocalStorage();
        renderCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Checkout functionality coming soon!');
}

// 2. Sale Timer Banner
function initSaleTimer() {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 4); // 4 hours from now

    function updateTimer() {
        const now = new Date();
        const timeDiff = endTime - now;

        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            document.getElementById('saleTimer').innerHTML = 
                `Flash Sale Ends in: ${hours}h ${minutes}m ${seconds}s`;
        } else {
            document.getElementById('saleTimer').innerHTML = 'Sale Ended!';
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

// 3. Popup Newsletter
function showNewsletterPopup() {
    if (!localStorage.getItem('newsletterShown')) {
        setTimeout(() => {
            document.getElementById('newsletterPopup').classList.remove('hidden');
        }, 5000);
    }
}

function closeNewsletterPopup() {
    document.getElementById('newsletterPopup').classList.add('hidden');
    localStorage.setItem('newsletterShown', 'true');
}

// 4. Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            // Simulate search results
            searchResults.innerHTML = `
                <div class="p-2 hover:bg-gray-100 cursor-pointer">
                    <span>Search result for: ${query}</span>
                </div>
            `;
            searchResults.classList.remove('hidden');
        } else {
            searchResults.classList.add('hidden');
        }
    });
}

// 5. Wishlist Management
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        showNotification('Added to wishlist!');
    } else {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist!');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI(productId);
}

function updateWishlistUI(productId) {
    const wishlistBtn = document.querySelector(`[data-wishlist="${productId}"]`);
    if (wishlistBtn) {
        wishlistBtn.classList.toggle('text-red-500');
    }
}

// 6. Notification System
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// 7. Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
            showNotification(`Please fill in ${input.getAttribute('placeholder')}`);
        } else {
            input.classList.remove('border-red-500');
        }
    });

    return isValid;
}

// 8. Currency Converter
const currencies = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73
};

function changeCurrency(currency) {
    const priceElements = document.querySelectorAll('.product-price');
    priceElements.forEach(el => {
        const usdPrice = parseFloat(el.getAttribute('data-price'));
        const convertedPrice = (usdPrice * currencies[currency]).toFixed(2);
        el.textContent = `${currency} ${convertedPrice}`;
    });
    localStorage.setItem('preferredCurrency', currency);
}

// 9. Dark Mode Toggle
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    showNotification(`${isDark ? 'Dark' : 'Light'} mode enabled`);
}

// 10. Product Quick View
function showQuickView(productId, name, price, description, image) {
    const quickView = document.getElementById('quickViewModal');
    quickView.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">${name}</h3>
                    <button onclick="closeQuickView()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                    <img src="${image}" alt="${name}" class="w-full rounded-lg">
                    <div>
                        <p class="text-2xl font-bold mb-4">$${price}</p>
                        <p class="text-gray-600 mb-4">${description}</p>
                        <button onclick="addToCart(${productId}, '${name}', ${price}, '${image}')" 
                                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    quickView.classList.remove('hidden');
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.add('hidden');
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }

    // Create cart panel
    createCartPanel();

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
        wishlist.forEach(productId => updateWishlistUI(productId));
    }

    // Initialize sale timer
    initSaleTimer();

    // Initialize search
    initSearch();

    // Show newsletter popup
    showNewsletterPopup();

    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
    }

    // Initialize currency preference
    const preferredCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    changeCurrency(preferredCurrency);
});