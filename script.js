const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 190,
    sizes: ["8.5", "10", "13"],
    colors: [
      {
        code: "black",
        img: "public/img/air.png",
      },
      {
        code: "blue",
        img: "public/img/airJordan2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Cactus Jack Hoodie",
    price: 209,
    sizes: ["S", "M", "L"],
    colors: [
      {
        code: "aqua",
        img: "public/img/catcusjack.png",
      },
      {
        code: "black",
        img: "public/img/catcusJack2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Stanley",
    sizes: ["S", "M", "L"],
    price: 45,
    colors: [
      {
        code: "orange",
        img: "public/img/stanley1.png",
      },
      {
        code: "black",
        img: "public/img/stanley2.webp",
      },
    ],
  },
  {
    id: 4,
    title: "Nike Tech",
    price: 225,
    sizes: ["S", "M", "L"],
    colors: [
      {
        code: "grey",
        img: "public/img/tech1.png",
      },
      {
        code: "black",
        img: "public/img/tech2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Vipers",
    sizes: ["S", "M", "L"],
    price: 150,
    colors: [
      {
        code: "yellow",
        img: "public/img/oakley1.webp",
      },
      {
        code: "black",
        img: "public/img/oakleys2.png",
      },
    ],
  },
];

let choosenProduct = products[0];
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const sizesContainer = document.querySelector(".sizes");
function initializeFirstProduct() {
  currentProductTitle.textContent = choosenProduct.title;
  currentProductPrice.textContent = "$" + choosenProduct.price;
  currentProductImg.src = choosenProduct.colors[0].img;
  currentProductColors.forEach((color, index) => {
    if (choosenProduct.colors[index]) {
      color.style.backgroundColor = choosenProduct.colors[index].code;
      color.style.display = "block";
    } else {
      color.style.display = "none";
    }
  });
  sizesContainer.innerHTML = "";
  choosenProduct.sizes.forEach((size) => {
    const sizeElement = document.createElement("span");
    sizeElement.classList.add("size");
    sizeElement.textContent = size;
    
    sizeElement.addEventListener("click", () => {
      document.querySelectorAll(".size").forEach((s) => {
        s.style.backgroundColor = ""; //
        s.style.color = ""; 
      });
      sizeElement.style.backgroundColor = "black"; 
      sizeElement.style.color = "white"; 
    });
    sizesContainer.appendChild(sizeElement);
  });
}
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    choosenProduct = products[index];
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;
    currentProductColors.forEach((color, colorIndex) => {
      if (choosenProduct.colors[colorIndex]) {
        color.style.backgroundColor = choosenProduct.colors[colorIndex].code;
        color.style.display = "block";
      } else {
        color.style.display = "none";
      }
    });
    sizesContainer.innerHTML = "";
    choosenProduct.sizes.forEach((size) => {
      const sizeElement = document.createElement("span");
      sizeElement.classList.add("size");
      sizeElement.textContent = size;
      
      sizeElement.addEventListener("click", () => {
        document.querySelectorAll(".size").forEach((s) => {
          s.style.backgroundColor = ""; 
          s.style.color = ""; 
        });
        sizeElement.style.backgroundColor = "black"; 
        sizeElement.style.color = "white"; 
      });
      sizesContainer.appendChild(sizeElement);
    });
  });
});
currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    if (choosenProduct.colors[index]) {
      currentProductImg.src = choosenProduct.colors[index].img;
    }
  });
});
initializeFirstProduct();
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");
productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});
close.addEventListener("click", () => {
  payment.style.display = "none";
});


fetch('http://localhost:3000/users')
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error);
});

// Initialize cart
let cart = [];

// Function to toggle the cart visibility
function toggleCart() {
    const cartDiv = document.querySelector('.cart');
    cartDiv.style.display = cartDiv.style.display === 'flex' ? 'none' : 'flex';
}

// Function to close the cart
function closeCart() {
    document.querySelector('.cart').style.display = 'none';
}

// Function to add product to the cart
function addToCart(productId, productName, productPrice) {
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex >= 0) {
        // Update quantity if product already exists
        cart[existingProductIndex].quantity++;
    } else {
        // Add new product to the cart
        cart.push(product);
    }

    updateCart();
}

// Function to remove product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to update the cart display and total price
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);

        total += item.price * item.quantity;
    });

    // Update total price
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Proceeding to checkout...');
    // Here you can integrate with a payment gateway or continue your checkout process
}

