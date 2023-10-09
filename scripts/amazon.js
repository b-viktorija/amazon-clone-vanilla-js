// //We are saving the data from our html in our js so we can use it. We have a list of products on our page, that is why we have an array. Then every product has a list of values, hence the object representing each product;

// after we generate the html, we add the products.js file to the html and then our products will load from that file not the array below;

// const products = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     //object inside object because rating has two parts;
//     rating: {
//       stars: 4.5,
//       count: 87,
//     },
//     priceCents: 1090,
//   },
//   {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127,
//     },
//     priceCents: 2095,
//   },
//   {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//   },
//   {
//     image: "images/products/black-2-slot-toaster.jpg",
//     name: "2 Slot Toaster - Black",
//     rating: {
//       stars: 5,
//       count: 2197
//     },
//     priceCents: 1899
//   }
// ];

fetchProducts();

// this function gets the products and generates the html. it gets the products from the json file using the fetch function.

function fetchProducts() {
  fetch("backend/products.json")
    .then((res) => res.json())
    // this extracts the data and then we write what we want to do with the data.
    .then((data) => {
      // the variable that combines all the html together;
      let productsHTML = "";

      // the forEach method takes each object inside the array, saves it into the parameter we assigned ( in this case product ) and then runs the function.
      data.forEach((product) => {
        //every time it loops, it adds the new html to the product html variable; (accumulator pattern- loop through an array and add to the result each time)
        productsHTML += `
      <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src=${product.image}>
              </div>
    
              <div class="product-name limit-text-to-2-lines">
                ${product.name}  
              </div>
    
              <div class="product-rating-container">
                <img class="product-rating-stars"  
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>
    
              <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
              </div>
    
              <div class="product-quantity-container">
                <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
    
              <div class="product-spacer"></div>
    
              <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
              </div>
    
              <button class="add-to-cart-button button-primary js-add-to-cart"
              data-product-id = "${product.id}" >
                Add to Cart
              </button>
            </div>
      `;
      });
      // Get an html element and put it in the js;
      //change the inner html of the element to be the generated html.
      document.querySelector(".js-products-grid").innerHTML = productsHTML;
    });
}

//adding the add to cart button to the js, inside we are selecting ALL ; loop through the buttons;

//adding an event listener to the whole document that ensures the dom content is all loaded before the click;
document.addEventListener("DOMContentLoaded", () => {
  //the event listener click is again added to the whole document, but only runs according to the if statement
  document.addEventListener("click", (event) => {
    if (event.target.matches(".js-add-to-cart")) {
      //add object to cart ;
      //data set property gets us all data attributes attached to it; .
      // If the button is dynamically generated and created using JS, you need to make sure that you have a reference to the button element in your event listener code.
      const button = event.target;
      //product-name (kebab-case) (in html) gets converted to camelcase productName in js.
      const productId = button.dataset.productId;
      //update the cart quantity

      // create an empty variable out of the for each loop to later store the matching variable inside it.
      let matchingItem;
      // loop through the cart; parameter: item contains  product name and quantity;
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      // if we found a matching item, it's an object which is a truthy value that's why we are just writing that. It means, if matching item exists;
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        // we are using window.cart.push to add to the cart when a product is not already in it;
        window.cart.push({
          productId: productId,
          quantity: 1,
        });
      }
    }
    console.log(cart);
  });
});
