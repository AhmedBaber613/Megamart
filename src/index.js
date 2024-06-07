// The main function where all the magic happens
async function Megamart() {
  // This block of code is trying to run the code 
  // Without errors
  try {
    const apiUrl = "https://fakestoreapi.com/products";
    const response = await fetch(apiUrl);

    // This statement is checking the response 
    // if it is not ok it will throw an error 
    // with the status code
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    // All the dom refrences
    const parentContainer = document.querySelector(".parent-container");
    const select = document.querySelector("#dropdown");
    const search = document.querySelector('input');

    // Clears existing content in the parent container and select dropdown
    parentContainer.innerHTML = "";
    select.innerHTML = '<option value="all">All Categories</option>';

    // It is awaiting the data to be recieved 
    // by the API
    const data = await response.json();
    const categories = new Set();

    // It does a function for each item 
    // in the data it recieves
    data.forEach((product, index) => {
      const { title, description, image, price, category } = product;

      // This is the HTML template where 
      // I display all the data
      const html = `
        <div class="${ index < 3 ? "pro-max1" : "pro-max" }" data-category="${ category }">
          <img src="${ image }" class="img">
          <h2>${ title }</h2>
          <p class=".desc">
            ${ description.substring(0, 100) + '...' }
          </p>
          <p class="price">
            $${ price }
          </p>
        </div>
      `;

      parentContainer.innerHTML += html;
      categories.add(category);
    });

    // for each category it creates
    // a new dropdown element
    categories.forEach(category => {
      const optionHtml = `
        <option value="${ category }">
          ${ category }
        </option>
      `;
      select.innerHTML += optionHtml;
    });

    // this function takes care of
    // the debounce factor in the search bar
    function debounce(func, wait) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }

    // this function resets all the classes
    // so that the first card will always have the
    // pro-max1 class
    const resetProductClasses = () => {
      const visibleProducts = [...document.querySelectorAll(".pro-max, .pro-max1")]
        .filter(product => product.style.display !== "none");

      visibleProducts.forEach((product, index) => {
        if (index < 3) {
          product.classList.remove("pro-max");
          product.classList.add("pro-max1");
        } else {
          product.classList.remove("pro-max1");
          product.classList.add("pro-max");
        }
      });

      parentContainer.style.flexDirection = 'row';
    }

    // this is where it filters the data using the 
    // dropdowns
    select.addEventListener("change", e => {
      const selectedCategory = e.target.value;
      const products = document.querySelectorAll(".pro-max, .pro-max1");

      products.forEach(product => {
        if (selectedCategory === "all" || product.getAttribute("data-category") === selectedCategory) {
          product.style.display = "inline-block";
        } else {
          product.style.display = "none";
        }
      });

      // Reset product classes after filtering
      resetProductClasses();
    });

    // This is where the search magic happens
    search.addEventListener("input", debounce(e => {
      const searchValue = e.target.value.toLowerCase();
      const products = document.querySelectorAll(".pro-max, .pro-max1");

      products.forEach(product => {
        const category = product.getAttribute("data-category").toLowerCase();
        const title = product.querySelector("h2").innerText.toLowerCase();
        if (category.includes(searchValue) || title.includes(searchValue)) {
          product.style.display = "inline-block";
        } else {
          product.style.display = "none";
        }
      });

      // Reset product classes after filtering
      resetProductClasses();
    }, 1000));

    // Initial reset
    resetProductClasses();

    // this is where we catch the errors
  } catch (error) {
    console.error('An error occurred', error);
  }
}

// Now we invoke the function 
// so that the application starts to work
Megamart();
