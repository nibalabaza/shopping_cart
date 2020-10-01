var products = [] ; 
function loadPosts() {
    let xhr = new XMLHttpRequest();
    let method = "GET";
    let url = `http://127.0.0.1:5500/products.json`;
    xhr.open(method, url);
    xhr.onload = function (event) {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
               products = JSON.parse(this.responseText);
                console.log("response", products);
                let output = ``;
                products.forEach(createCard); //call the function that i created for generating the articles 
                eventAttach(); // call the function that i did to create the elements in html
            } else {
                console.log(this.status);
                alert(`Erreur`)
            }
        }
    }
    xhr.send();
}


function createCard(product){
var productContainer = document.querySelector('#products')
    productContainer.innerHTML += 
   `<div class="image">
         <img src="${product.img}" width="300" height="450"/>
          <h3>${product.name}</h3>
          <h3>$${product.price},00</h3>
          <p class= "inCart">${product.inCart}</p>
           <a class="add-cart cart-btn">Add To My Cart</a>
      </div>`
      
}

function eventAttach(){
    let carts = document.querySelectorAll('.add-cart');
     for (let i = 0; i < carts.length; i++) {
       carts[i].addEventListener('click', () => {
            console.log("It has been added to the cart")
            cartNumbers(products[i]); /** when click, call the function of the cartNumbers - we pass inside the function the index of each product*/
            totalCost(products[i]); /**add the price */
        });   
  
  }
}
  
/**add the number of the items to the cart when loading page */
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) { /**if there are items from localStorage then let it equal to the  the numbers of products */
         document.querySelector('.cart span').textContent = productNumbers;
    }
}

/**To know how many items i'am adding to the cart */

function cartNumbers(product) {                              /**this parameter is to know the product that is clicked */
    console.log("the product clicked is", product);
    let productNumbers = localStorage.getItem('cartNumbers'); /**i keep the item i a varaible to convert it from a string into a number */
     productNumbers = parseInt(productNumbers);                /**change the string into a number */
    if (productNumbers) {
        /**if there is an item then */
        localStorage.setItem('cartNumbers', productNumbers + 1); /**the item + 1 to add another item */
        document.querySelector('.cart span').textContent = productNumbers + 1; /**we save the amount of the items in the localStorage but when we update the page the cart will be 0 and the local storage save the value */
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1; /** we access the text content of the span in the class cart in the tag li in html -if it is the first time we add it, then let this = 1 */
    }

    /**which product that we have in the cart */
    setItems(product);
}

function setItems(product) {
    console.log("My product is", product);
    let cartItems = localStorage.getItem('productInCart'); /**to check if there is a product befor */
    cartItems = JSON.parse(cartItems);                      /**parse from json form into js obj */
    if (cartItems != null) {
        /**if there is sth already exist */

        if (cartItems[product.idProduis] == undefined) {      /**if the product is = undefined (if the product not clicked befor) this is to add a different products*/
            cartItems = {               /**update my localStorage then.. */
                ...cartItems,           /**rest operator from js */
                [product.idProduis]: product  /** ..add the new product*/
            }
        }
        cartItems[product.idProduis].inCart += 1; /**to increase one to a product that is already exist*/
        }else {                /**the first time you click , you reset one to the cart */
        product.inCart = 1; /**if this is the first click on the product then add 1 */
                            /**create an object to send it to localStorage but it should stringify to send it as  json object not as a js object*/
        cartItems = {
            [product.idProduis]: product
        }
    }
     localStorage.setItem("productInCart", JSON.stringify(cartItems));
}


function totalCost(product) {
    // console.log("The price is : ", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost); /** change the cost(stored in cartCost) from string to a number */
        localStorage.setItem('total Cost', cartCost + product.price); /**the cost of what ever i have befor + the new value */
    }else {
        localStorage.setItem("totalCost", product.price);
    }
}
// onready event 
document.addEventListener("DOMContentLoaded", function (event){ 
    loadPosts();
    onLoadCartNumbers();

});


// const numbers = [];

// let sum = 0;
// for(let n of numbers)
// sum += n;



// const sum = numbers.reduce((accumulator, currentValue) => {
//     return accumulator + currentValue;
// }, 0)