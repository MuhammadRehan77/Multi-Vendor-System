// Common elements for all pages
const commonHeader = `
  <!-- Sale Timer Banner -->
  <div class="bg-blue-600 text-white py-2 px-4">
    <div class="max-w-7xl mx-auto text-center">
      <p id="saleTimer" class="text-sm font-medium animate-pulse"></p>
    </div>
  </div>

  <!-- Newsletter Popup -->
  <div id="newsletterPopup" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
      <h3 class="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
      <p class="text-gray-600 mb-4">Get 10% off your first order!</p>
      <input type="email" placeholder="Enter your email" class="w-full px-3 py-2 border rounded-md mb-4">
      <div class="flex justify-end space-x-4">
        <button onclick="closeNewsletterPopup()" class="text-gray-500 hover:text-gray-700">No, thanks</button>
        <button onclick="closeNewsletterPopup()" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Subscribe</button>
      </div>
    </div>
  </div>

  <!-- Notification Toast -->
  <div id="notification" class="hidden fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg"></div>

  <!-- Quick View Modal -->
  <div id="quickViewModal" class="hidden"></div>

  <nav class="bg-white shadow-md sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <a href="index.html" class="flex items-center text-2xl font-bold text-blue-600">Rehan Store</a>
        
        <!-- Search Bar -->
        <div class="hidden md:flex items-center flex-1 max-w-lg mx-8 relative">
          <input 
            id="searchInput"
            type="text" 
            placeholder="Search products..." 
            class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <div id="searchResults" class="hidden absolute top-full left-0 right-0 bg-white mt-2 rounded-lg shadow-lg border"></div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Currency Selector -->
          <select onchange="changeCurrency(this.value)" class="border rounded-md px-2 py-1">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>

          <!-- Dark Mode Toggle -->
          <button onclick="toggleDarkMode()" class="text-gray-600 hover:text-gray-800">
            <i class="fas fa-moon"></i>
          </button>

          <!-- Cart -->
          <button onclick="toggleCart()" class="text-gray-600 hover:text-gray-800 relative">
            <i class="fas fa-shopping-cart"></i>
            <span id="cartCount" class="hidden absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button class="md:hidden" id="menuToggle">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="hidden md:hidden" id="mobileMenu">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="index.html" class="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</a>
          <a href="products.html" class="block px-3 py-2 text-gray-700 hover:text-blue-600">Products</a>
          <a href="categories.html" class="block px-3 py-2 text-gray-700 hover:text-blue-600">Categories</a>
          <a href="contact.html" class="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</a>
        </div>
      </div>
    </div>
  </nav>
`;

// Function to inject common header
function injectCommonElements() {
  // Insert header at the beginning of the body
  document.body.insertAdjacentHTML('afterbegin', commonHeader);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  injectCommonElements();
  initializeHeader();
});