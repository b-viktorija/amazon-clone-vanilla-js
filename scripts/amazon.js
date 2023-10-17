// //saving the data from our html in our js so we can use it. We have a list of products on our page, that is why we have an array. Then every product has a list of values, hence the object representing each product;

// after we generate the html, we add the products.js file to the html and then our products will load from that file not the array below;

fetchProducts()

// this function gets the products and generates the html. it gets the products from the json file using the fetch function.

function fetchProducts() {
  fetch("backend/products.json")
    .then((res) => res.json())
    // this extracts the data and then we write what we want to do with the data.
    .then((data) => {
      // the variable that combines all the html together;
      let productsHTML = ""

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
      `
      })
      //change the inner html of the element to be the generated html.
      document.querySelector(".js-products-grid").innerHTML = productsHTML
    })
}
// Detect click of add to cart button
// Steps: Wait for dom to load; detect all clicks;
// Only when the click matches the class of the button, create a button constant
// the const is equal to the event.target - bc the button is dynamically generated, make sure we have reference to the button element in the event listener code;
// the data html attribute allows us to access whatever property we assigned to the html element, in this case the product id
//product-name (kebab-case) (in html) gets converted to camelcase productName in js.

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    if (event.target.matches(".js-add-to-cart")) {
      const button = event.target
      const productId = button.dataset.productId

      //update the cart quantity
      // create an empty variable out of the for each loop to later store the matching variable inside it.
      let matchingItem
      // loop through the cart; parameter: item contains  product name and quantity;
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item
        }
      })
      // if we found a matching item, it's an object which is a truthy value that's why we are just writing that. It means, if matching item exists;
      if (matchingItem) {
        matchingItem.quantity += 1
      } else {
        // we are using window.cart.push to add to the cart when a product is not already in it;
        window.cart.push({
          productId: productId,
          quantity: 1,
        })
      }
    }
    // Calculate total cart quantity

    let cartQuantity = 0

    cart.forEach((item) => {
      cartQuantity += item.quantity
    })

    // add cartQuantity to page
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity
  })
})
