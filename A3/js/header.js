// Common header functionality
function initializeHeader() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Initialize dark mode
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  }

  // Initialize currency
  const preferredCurrency = localStorage.getItem('preferredCurrency') || 'USD';
  const currencySelector = document.querySelector('select[onchange="changeCurrency(this.value)"]');
  if (currencySelector) {
    currencySelector.value = preferredCurrency;
  }

  // Initialize cart count
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    const cart = JSON.parse(savedCart);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      cartCount.textContent = cart.length;
      cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
  }

  // Create cart panel
  createCartPanel();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHeader);