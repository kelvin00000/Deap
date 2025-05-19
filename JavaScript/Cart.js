import { productsGrid1, productsGrid2, productsGrid3 } from "../JavaScript/Products.js";


///////////////////////////////////////////////////////CART FUNCTIONS/////////////////////////////////////////////
export let cart = JSON.parse(localStorage.getItem('cart'))
if(!cart){
    cart = []}



///////SAVE TO STORAGE/////////
export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}




/////UPDATING CART COUNTER//////
export function updateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelectorAll('.js-cart-counter').forEach((counter) => {
        counter.innerHTML = cartQuantity;
    })
}
updateCartQuantity();


//////GENERATING CART HTML//////
let cartSummaryHTML = '';

function generateCartHtml(){
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct;

        const allGrids = [...productsGrid1, ...productsGrid2, ...productsGrid3]
        allGrids.forEach((product) => {

        if(productId === product.id){
            matchingProduct = product;
            
                cartSummaryHTML += `
                    <div class="cart-item js-cart-item-${matchingProduct.id}">
                        <div class="image">
                            <img src="${matchingProduct.image}" alt="iphone-image">
                        </div>
                        <div class="info">
                            <div class="name">
                                <h4>${matchingProduct.name}</h4>
                            </div>
                            
                            <div class="specs">
                                <div class="price">
                                    <h5>Price :</h5>
                                    <h4>${cartItem.price.toLocaleString()}</h4>
                                </div>
                                <div class="storage">
                                    <h5>Storage :</h5>
                                    <h4>${cartItem.storage}</h4>
                                </div>
                                <div class="quantity">
                                    <h5>Quantity :</h5>
                                    <h4>${cartItem.quantity}</h4>
                                </div>
                            </div>
                            <div class="button"><button class="remove-from-cart js-remove-from-cart" data-product-id="${matchingProduct.id}">Remove</button></div>
                        </div>
                    </div>
                `;
        }
        }); 
    });
}
generateCartHtml()
const cartContainer = document.querySelector('.js-cart');
if(cartContainer){
    cartContainer.innerHTML = cartSummaryHTML;
}



////REMOVE FROM CART FUNCTION////
document.querySelectorAll('.js-remove-from-cart').forEach((button) => {
    button.addEventListener('click', () => {
        location.reload();
        const productId = button.dataset.productId;
        const cartItemContainer = document.querySelector(`.js-cart-item-${productId}`);
        
        const newCart = [];

        cart.forEach((cartItem) => {
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }

            cartItemContainer.remove();
        });

        cart = newCart;

        generateCartHtml();
        saveToStorage();

        console.log(cart);
        console.log(newCart);
    })
})



////UPDATING CART ITEM TOTAL/////
let cartTotal = 0;

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    const allGrids = [...productsGrid1, ...productsGrid2, ...productsGrid3]
    allGrids.forEach((product) => {

        if(productId === product.id){
            matchingProduct = product;

            cartTotal += cartItem.price;
        }
    });
});
const cartTotalFormatted = cartTotal.toLocaleString();
const cartTotalContainer =  document.getElementById('js-cart-total');
if(cartTotalContainer){
    cartTotalContainer.innerHTML = cartTotalFormatted;
}



//////////////////////////////////////////////////////////CUSTOMER FORM///////////////////////////////////////////////////////

////TOGGLE ON/////
const buyButton = document.querySelector('.js-buy-button');
const customerBackgroundFormOverlay = document.querySelector('.js-customer-background-form-overlay');
const customerForm = document.querySelector('.js-customer-form');

if(buyButton){
    buyButton.addEventListener('click', () => {
            customerBackgroundFormOverlay.style.display = 'block';
            customerForm.style.display = 'flex';
    })
}


////TOGGLE OFF////
const submitButton = document.querySelector('.js-submit-button');

if(submitButton){
    submitButton.addEventListener('click', () => {
        customerForm.style.display = 'none';
        customerBackgroundFormOverlay.style.display = 'none';
    });
}


///PUSH DETAILS TO ARRAY///
const customerDetails = localStorage.getItem('customerDetails') ? JSON.parse(localStorage.getItem('customerDetails')) : [];

if(customerForm){
    customerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    ///////VARIABLES////////
    const fullname = document.querySelector('.full-name').value;
    const number = document.querySelector('.customer-contact').value;
    const secondNumber = document.querySelector('.customer-contact-2').value;
    const region = document.querySelector('.customer-region').value;
    const town = document.querySelector('.customer-town').value;

    const newObject = {
        fullname,
        number,
        secondNumber,
        region,
        town
    }

    customerDetails.push(newObject);
    localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
})
}


///////////////////////SEND ORDER VIA EMAIL////////////////////
///////MAKING THE CART A STRING////
let formattedCart = '';
let totalPrice = 0;

cart.forEach(item => {
const product = [...productsGrid1, ...productsGrid2, ...productsGrid3].find(p => p.id === item.productId);
if (product) {
    const lineTotal = product.price * item.quantity;
    totalPrice += lineTotal;
    formattedCart += `
    ${product.name} (${item.storage}) x${item.quantity} - ₵${lineTotal.toLocaleString()}
    \n`;
}
});

function sendMail () {
    var params = {
        fullname: document.querySelector('.full-name').value,
        phonenumber: document.querySelector('.customer-contact').value,
        phonenumber2: document.querySelector('.customer-contact-2').value,
        region: document.querySelector('.customer-region').value,
        town: document.querySelector('.customer-town').value,
        cart: formattedCart
    }

    const serviceID = "service_2755nrt";
    const templateID = "template_azl4bec";

    emailjs.send(serviceID, templateID, params)
    .then(
        res => {
            document.querySelector('.full-name').value = '';
            document.querySelector('.customer-contact').value = '';
            document.querySelector('.customer-contact-2').value = '';
            document.querySelector('.customer-region').value = '';
            document.querySelector('.customer-town').value = '';
            console.log(res);
            alert("Your order has been placed successfully");
        }
    ).catch(err => console.log(err));
}

if(submitButton){
    submitButton.addEventListener('click', () => {
    sendMail();
})
}