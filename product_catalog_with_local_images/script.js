const products = [
    { 
      name: "Wireless Headphones", 
      price: "₹7,999", 
      description: "Noise-cancelling headphones.", 
      image: "images/headphones.jpg" 
    },
    { 
      name: "Smartwatch", 
      price: "₹12,999", 
      description: "Fitness tracking watch.", 
      image: "images/smartwatch.avif" 
    },
    { 
      name: "Gaming Mouse", 
      price: "₹2,499", 
      description: "High precision mouse.", 
      image: "images/gaming mouse.avif" 
    },
    { 
      name: "Laptop Stand", 
      price: "₹1,999", 
      description: "Aluminium stand.", 
      image: "images/laptop stand.avif" 
    },
    { 
      name: "USB-C Hub", 
      price: "₹1,499", 
      description: "7-in-1 Hub.", 
      image: "images/usb.webp" 
    },
    { 
      name: "Mechanical Keyboard", 
      price: "₹5,499", 
      description: "RGB keys.", 
      image: "images/mechanical.avif" 
    },
    { 
      name: "External SSD", 
      price: "₹8,499", 
      description: "1TB SSD.", 
      image: "images/ssd.avif" 
    },
    { 
      name: "Bluetooth Speaker", 
      price: "₹3,999", 
      description: "Portable speaker.", 
      image: "images/speaker.avif" 
    },
    { 
      name: "Webcam", 
      price: "₹2,999", 
      description: "Full HD webcam.", 
      image: "images/webcam.avif" 
    },
    { 
      name: "Ring Light", 
      price: "₹1,299", 
      description: "Content creator light.", 
      image: "images/ringlight.avif" 
    },
    { 
      name: "Drawing Tablet", 
      price: "₹6,499", 
      description: "Graphic tablet.", 
      image: "images/tablet.avif" 
    },
    { 
      name: "Wireless Charger", 
      price: "₹1,599", 
      description: "Fast charging pad.", 
      image: "images/charger.avif" 
    },
    { 
      name: "Action Camera", 
      price: "₹9,999", 
      description: "Waterproof cam.", 
      image: "images/camera.avif" 
    },
    {
      name: "Portable Projector",
      price: "₹15,499",
      description: "Compact 1080p mini projector.",
      image: "images/portable.avif"
    },
    { 
      name: "Noise Cancelling Mic", 
      price: "₹3,199", 
      description: "For meetings.", 
      image: "images/mic.avif" 
    }
  ];
  

let currentPage = 1;
const productsPerPage = 10;

function displayProducts() {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);

  const tbody = document.getElementById("productBody");
  tbody.innerHTML = "";

  paginatedProducts.forEach(product => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${product.image}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
      </tr>
    `;
  });

  const pageCount = Math.ceil(products.length / productsPerPage);
  document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${pageCount}`;
}

function changePage(offset) {
  const pageCount = Math.ceil(products.length / productsPerPage);
  currentPage += offset;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > pageCount) currentPage = pageCount;
  displayProducts();
}

displayProducts();
