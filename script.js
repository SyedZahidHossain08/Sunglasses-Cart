document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const closeCartButton = document.getElementById('close-cart');
  const cart = document.getElementById('cart');
  const cartItemsContainer = document.getElementById('cart-items');
  let cartItems = [];

  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      const title = e.target.getAttribute('data-title');
      const price = parseFloat(e.target.getAttribute('data-price'));
      const category = e.target.getAttribute('data-category');
      addToCart(title, price, category);
      cart.style.display = 'block';
      setTimeout(() => {
        cart.style.left = '0';
      }, 50); // Delay to ensure the cart is displayed before transitioning
    });
  });

  closeCartButton.addEventListener('click', function () {
    cart.style.left = '-100%'; // Slide out to the left
  });

  function addToCart(title, price, category) {
    cartItems.push({ title: title, price: price, category: category });
    displayCart();
  }

  function removeCartItem(index) {
    cartItems.splice(index, 1);
    displayCart();
  }

  function displayCart() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cartItems.forEach(function (item, index) {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <div>
          <p>Title: ${item.title}</p>
          <p>Price: $${item.price}</p>
          <p>Category: ${item.category}</p>
        </div>
        <div>
          <button class="remove-item" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
      subtotal += item.price;
    });

    document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        const index = parseInt(e.target.getAttribute('data-index'));
        removeCartItem(index);
      });
    });
  }
});
