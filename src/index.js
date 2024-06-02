async function Megamart() {
  try {
    const apiUrl = "https://fakestoreapi.com/products";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const parentContainer = document.querySelector(".parent-container");
    const select = document.querySelector("#dropdown");

    // Clear existing content in the parent container and select dropdown
    parentContainer.innerHTML = "";
    select.innerHTML = '<option value="all">All Categories</option>';

    const data = await response.json();
    const categories = new Set();

    data.forEach((product, index) => {
      const { title, description, image, price, category } = product;

      const html = `
        <div class="${ index < 3 ? "pro-max1" : "pro-max" }" data-category="${ category }">
          <img src="${ image }" class="img">
          <h2>${ title }</h2>
          <p class=".desc">
            ${ description.substring(0, 100) }
          </p>
          <p class="price">
            $${ price }
          </p>
        </div>
      `;

      parentContainer.innerHTML += html;
      categories.add(category);
    });

    categories.forEach(category => {
      const optionHtml = `
        <option value="${ category }">
          ${ category }
        </option>
      `;
      select.innerHTML += optionHtml;
    });

    const resetProductClasses = () => {
      const visibleProducts = [...document.querySelectorAll(".pro-max, .pro-max1")]
        .filter(product => product.style.display !== "none");
        
      visibleProducts.forEach((product, index) => {
        if (index < 1) {
          product.classList.remove("pro-max");
          product.classList.add("pro-max1");
        } else {
          product.classList.remove("pro-max1");
          product.classList.add("pro-max");
        }
      });
    }

    select.addEventListener("change", e => {
      const selectedCategory = e.target.value;
      const products = document.querySelectorAll(".pro-max, .pro-max1");

      products.forEach(product => {
        if (selectedCategory === "all" || product.getAttribute("data-category") === selectedCategory) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });

      // Reset product classes after filtering
      resetProductClasses();
    });

    // Initial class reset
    resetProductClasses();

  } catch (error) {
    console.error('An error occurred', error);
  }
}

Megamart();
