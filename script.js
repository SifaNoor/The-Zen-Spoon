// Hamburger Menu
const hamburger = document.querySelector('.hamburgermenu');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', function () {
    navbar.classList.toggle('responsive');
});

// Functionality for View Menu Button
const menuButton = document.querySelector('.menubutton');
menuButton.addEventListener('click', function() {
    document.getElementById('menu').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Functionality for NavBar
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('responsive');
    });
});

// Image Gallery
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slideimage");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Contact Form Submission
document.querySelector('.contactform form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (name && email && message) {
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
  } else {
    alert('Please fill in all fields.');
  }
});

// Functionality for Shopping Cart
let cart = [];
let cartItem = 0
let cartTotal = 0;

const cartIcon = document.querySelector('.carticon');
const shoppingSidebar = document.getElementById('shoppingsidebar');
const exitCart = document.getElementById('exitcart');
const cartItems = document.getElementById('itemscart');
const itemCount = document.getElementById('itemcounter');
const totalCart = document.getElementById('totalcart');
const clearButton = document.getElementById('clearbutton');
const checkoutCart = document.getElementById('checkoutbutton');
const overlay = document.getElementById('overlay');


cartIcon.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  shoppingSidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

const cartLink = document.getElementById('cartlink');
cartLink.addEventListener('click', function(e) {
  e.preventDefault();
});

exitCart.addEventListener('click', function() {
  shoppingSidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', function() {
  shoppingSidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
})

clearButton.addEventListener('click', function() {
  if (confirm('Please confirm you want to clear your cart.')) {
    clearCart();
  }
});

checkoutCart.addEventListener('click', function(){
  if(cart.length == 0) {
    alert('Your cart is currently empty.');
    return;
  }

  alert("Thank you for your order! Total: $" + cartTotal.toFixed(2) + 
  "\nYou will be contacted once your order has been prepared.");
  clearCart();
  shoppingSidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Functionality for Add to Cart Buttons
document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.addbutton');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      addToCart(name, price);
    })
  })
})

function addToCart(name, price) {
  const itemInCart = cart.find(item => item.name === name);

  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({name: name, price: price, quantity: 1});
  }
  updateCartDisplay();
  displayItemMessage();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCartDisplay();
}

function updateAmount(name, change) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      updateCartDisplay();
    }
  }
}

function updateCartDisplay() {
  cartItem = cart.reduce((total, item) => total + item.quantity, 0);
  cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  itemCount.textContent = cartItem;
  totalCart.textContent = cartTotal.toFixed(2);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class= "emptycart">Your cart is currently empty.</p>';
  } else {
    cartItems.innerHTML = cart.map(item =>
      `<div class= "itemcart">
        <div class= "itemcartinfo">
          <div class= "itemcartname">
            ${item.name}
          </div>
          <div class= "itemcartprice">
            $${item.price.toFixed(2)} each
          </div>
          <div class= "itembuttons">
            <button class= "changeQuantity" onclick="updateAmount('${item.name}', -1)">-</button>
              <span class= "quantity">${item.quantity}</span>
            <button class= "changeQuantity" onclick="updateAmount('${item.name}', 1)">+</button>
            <button class= "removeItem" onclick="removeFromCart('${item.name}')">Remove</button>
          </div>
        </div>
      </div>`
      ).join('');
  }
}

function displayItemMessage() {
  const notif = document.createElement('div');
  notif.textContent = 'Item has been added to cart!'
  notif.style.cssText =
  `
  position: fixed;
  top: 80px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 2000;
  font-family: "Cormorant Garamond", serif;
  animation: slideIn 0.3s ease;`

  document.body.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 2000);
}

function clearCart() {
  cart = [];
  updateCartDisplay();
}