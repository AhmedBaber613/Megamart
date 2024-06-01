async function Megamart(){
  try {
    const apiUrl = "https://fakestoreapi.com/products";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${ response.status }`);
    }

    const parentContainer = document.querySelector(".parent-container");
    const select = document.querySelector("#dropdown");

    // Clear existing content in the parent container and select dropdown
    parentContainer.innerHTML = "";
    select.innerHTML = "";

    const data = await response.json();
    const categories = new Set();

    data.forEach(product => {
      const { title, description, image, price, category } = product;

      const html = `
        <div class="pro-max">
          <img src="${ image }" class="img">
          <h2>${ title }</h2>
          <p class="desc">
            ${ description }
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
  } catch (error) {
    console.error('an error occured', error);
  }
}

Megamart();




//-7491535584757671597
//-5276811385873958582 best ever
//8469767121389526573 lb
//Duck.exe
//283256722549692309
//3375320420129844992