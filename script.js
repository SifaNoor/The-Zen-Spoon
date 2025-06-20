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