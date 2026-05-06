const products = [
  {
    name: "Wireless Headphones",
    price: "7,999",
    desc: "Noise-cancelling over-ear headphones.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "Smartwatch",
    price: "12,999",
    desc: "Fitness tracking smartwatch.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "Gaming Mouse",
    price: "2,499",
    desc: "Ergonomic gaming mouse.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "Laptop Stand",
    price: "1,999",
    desc: "Adjustable aluminium stand.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "Keyboard",
    price: "4,500",
    desc: "Mechanical RGB keyboard.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "USB Hub",
    price: "1,200",
    desc: "4-port high speed hub.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "Monitor",
    price: "15,000",
    desc: "24-inch 144Hz display.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "Webcam",
    price: "3,500",
    desc: "1080p HD camera.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "Power Bank",
    price: "2,000",
    desc: "20000mAh fast charging.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "HDMI Cable",
    price: "500",
    desc: "4K 60Hz supported.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "Desk Mat",
    price: "800",
    desc: "Extra large anti-slip mat.",
    img: "https://via.placeholder.com/60",
  },
  {
    name: "Bluetooth Speaker",
    price: "5,000",
    desc: "Waterproof portable speaker.",
    img: "https://via.placeholder.com/60",
  },
];

let currentPage = 1;
const rowsPerPage = 10;

function displayTable(page) {
  const tableBody = document.getElementById("tableBody");

  let start = (page - 1) * rowsPerPage;
  let end = start + rowsPerPage;
  let paginatedItems = products.slice(start, end);

  let tableHTML = "";

  paginatedItems.forEach((item) => {
    tableHTML += `<tr>
            <td><img src="${item.img}" class="product-img" width="60" height="60"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.desc}</td>
        </tr>`;
  });

  tableBody.innerHTML = tableHTML;

  updateControls();
}

function updateControls() {
  const totalPages = Math.ceil(products.length / rowsPerPage);
  document.getElementById("pageIndicator").innerText =
    `Page ${currentPage} of ${totalPages}`;

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayTable(currentPage);
  }
}

function nextPage() {
  const totalPages = Math.ceil(products.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayTable(currentPage);
  }
}

displayTable(currentPage);