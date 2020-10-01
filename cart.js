/**add the number of the items to the cart when loading page */


var cartNumbers;
var products = {};
var totalCost;
var payment; 

//loading the page

function onLoadCartNumbers () {
    if (cartNumbers) {
        document.querySelector('.cart span').textContent = cartNumbers;
    }
}

//local storage
function loadStorage () {
    products = JSON.parse(localStorage.getItem("productInCart"));
    cartNumbers = +localStorage.getItem('cartNumbers');
    totalCost = +localStorage.getItem('totalCost');
    payment = totalCost; 
    if(payment > 200 ){
        payment = payment - ( payment *  20 ) /100; 
    }

}

//apdate and save after each change
function saveStorage () {
    localStorage.setItem("productInCart", JSON.stringify(products));
    localStorage.setItem('cartNumbers', cartNumbers);
    localStorage.setItem('totalCost', totalCost);

}

//delet item
function deletItem (el) {
    let itemId = el.getAttribute("data-id");
    cartNumbers -= products[itemId].inCart;
    totalCost -= products[itemId].inCart * products[itemId].price;
    delete products[itemId];
    saveStorage();
    loadPage();
}

// decrease number of items
function removeItem (el) {
    let itemId = el.getAttribute("data-id");
    if(products[itemId].inCart === 0 ) return ; // do nothing 
    cartNumbers -= 1;
    totalCost -=  products[itemId].price;
    products[itemId].inCart -= 1 ; 
    saveStorage();
    loadPage();
}

//increase number of items
function addItem (el) {
    let itemId = el.getAttribute("data-id");
    cartNumbers += 1;
    totalCost +=  products[itemId].price;
    products[itemId].inCart += 1 ; 
    saveStorage();
    loadPage();
}


//display the cards
function displayCart () {
    let productContainer = document.querySelector('#products'); /**get the elements inside product-container from cart.html and put them in the div class:products*/
    
    // products.map( p => p.inCart * p.price ).reduce( (pre , cur ) => pre + cur , 0 ) ; 
     console.log(products);
    if (products && productContainer) {  /** (we are in the cart page)if the items are exist and if the elements of the cart-html are exist */
        productContainer.innerHTML = '';
        Object.values(products).forEach(item => {
            productContainer.innerHTML += `
            <div class="product">
            <div>
            <ion-icon name="close-circle-outline" data-id="${item.idProduis}" class="delete-circle-outline"></ion-icon>
            <span>${item.name}</span></div>
            <img src="${item.img}" width="100" height="100">
            
            <div class="price">$${item.price},00 </div> 

            <div class="quantity">
            <ion-icon name="remove-circle-outline"  data-id="${item.idProduis}" class="remove-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="add-circle-outline"  data-id="${item.idProduis}" class="add-circle-outline"></ion-icon>
            </div>
            
            <div class="total">
            $${item.inCart * item.price},00
            </div>
            </div>
            `

        });
       
            productContainer.innerHTML += `
            <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
            Basket Total
            </h4>
            <h4 class="basketTotal">
            $${payment},00
            </h4>
            </div>`;

        for (let el of document.getElementsByClassName("delete-circle-outline")) {
            el.addEventListener("click", () => {
                if (confirm("are you sure ?")) {
                    deletItem(el);
                }
            });
        }

        for (let el of document.getElementsByClassName("add-circle-outline")) {
            el.addEventListener("click", () => {                
                addItem(el);
            });
        }

        for (let el of document.getElementsByClassName("remove-circle-outline")) {
            el.addEventListener("click", () => {
                removeItem(el);
            });
        }

    }


}

function loadPage () {
    displayCart();
    onLoadCartNumbers();
}


document.addEventListener("DOMContentLoaded", function (event) {
    loadStorage();

    loadPage();
});
