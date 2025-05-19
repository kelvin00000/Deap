import { productsGrid1, productsGrid2, productsGrid3 } from "../JavaScript/Products.js";
import { updateCartQuantity, cart, saveToStorage} from "../JavaScript/Cart.js";




////////////////////PRODUCT GRID 1/////////////////////////
const gridOne = document.querySelector('.js-product-grid-1');

productsGrid1.forEach((product) => {
    gridOne.innerHTML += `
         <div class="product">
            <div class="padding">
                <div class="top">
                    <img src="${product.image}" alt="${product.name}" height="120px" width="85px" />
                </div>

                <div class="bottom">

                    <div class="name">
                        <p> ${product.name}</p>
                    </div>

                    <div class="price">
                        <p>GHC ${product.price.toLocaleString()}</p>
                    </div>

                        <div class="option-radio">
                            <label class="radio-container">
                                32gb
                                <input type="radio" name="choice-${product.id}" value="32gb" data-product-price="${product.price}">
                                <span class="checkmark"></span>
                              </label>
                            
                              <label class="radio-container">
                                64gb
                                <input type="radio" name="choice-${product.id}" value="64gb" data-product-price="${product.price2}">
                                <span class="checkmark"></span>
                              </label>
                        </div>

                        <div class="option-select">
                            Quantity
                            <select class="select" id="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>

                    <div class="button">
                        <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}">Add to Cart</button>

                        <button class="toggleWindow"  data-product-id="${product.id}"
                        >Learn More</button>
                    </div>
                </div>
                </div>
            </div>
    `
});



////////////////////PRODUCT GRID 2/////////////////////////
const gridTwo = document.querySelector('.js-product-grid-2');

productsGrid2.forEach((product) => {
    gridTwo.innerHTML += `
    <div class="product">
       <div class="padding">
           <div class="top">
               <img src="${product.image}" alt="${product.name}" height="120px" width="85px" />
           </div>

           <div class="bottom">

               <div class="name">
                   <p> ${product.name}</p>
               </div>

               <div class="price">
                   <p>GHC ${product.price.toLocaleString()}</p>
               </div>

                   <div class="option-radio">
                       <label class="radio-container">
                           64gb
                           <input type="radio" name="choice-${product.id}" value="64gb" data-product-price="${product.price}">
                           <span class="checkmark"></span>
                         </label>
                       
                         <label class="radio-container">
                           128gb
                           <input type="radio" name="choice-${product.id}" value="128gb" data-product-price="${product.price2}">
                           <span class="checkmark"></span>
                         </label>

                          <label class="radio-container">
                           256gb
                           <input type="radio" name="choice-${product.id}" value="256gb" data-product-price="${product.price3}">
                           <span class="checkmark"></span>
                         </label>
                   </div>

                   <div class="option-select">
                       Quantity
                       <select class="select">
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                       </select>
                   </div>

               <div class="button">
                   <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}">Add to Cart</button>

                   <button class="toggleWindow"  data-product-id="${product.id}"
                   >Learn More</button>
               </div>
           </div>
           </div>
       </div>
`
});



////////////////////PRODUCT GRID 3/////////////////////////
const gridThree = document.querySelector('.js-product-grid-3');

productsGrid3.forEach((product) => {
    gridThree.innerHTML += `
    <div class="product">
       <div class="padding">
           <div class="top">
               <img src="${product.image}" alt="${product.name}" height="120px" width="85px" />
           </div>

           <div class="bottom">

               <div class="name">
                   <p> ${product.name}</p>
               </div>

               <div class="price">
                   <p>GHC ${product.price.toLocaleString()}</p>
               </div>

                   <div class="option-radio">
                       <label class="radio-container">
                           128gb
                           <input type="radio" name="choice-${product.id}" value="128gb" data-product-price="${product.price}">
                           <span class="checkmark"></span>
                         </label>
                       
                         <label class="radio-container">
                            256gb
                           <input type="radio" name="choice-${product.id}" value="256gb" data-product-price="${product.price2}">
                           <span class="checkmark"></span>
                         </label>

                          <label class="radio-container">
                           512gb
                           <input type="radio" name="choice-${product.id}" value="512gb" data-product-price="${product.price3}">
                           <span class="checkmark"></span>
                         </label>
                   </div>

                   <div class="option-select">
                       Quantity
                       <select class="select">
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                       </select>
                   </div>

               <div class="button">
                   <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}">Add to Cart</button>

                   <button class="toggleWindow"  data-product-id="${product.id}"
                   >Learn More</button>
               </div>
           </div>
           </div>
       </div>
`
});



////////////////////ADD TO CART BUTTON FUNCTION///////////////
document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
    button.addEventListener('click',() => {
            location.reload();
            const productId = button.dataset.productId;
            updateCartQuantity();

            ////QUANTITY OPTION////
            const quantityOption = parseInt(document.getElementById('select').value)

            ////STORAGE OPTION////
            const storageOption = document.querySelector(`input[name="choice-${productId}"]:checked`).value;
            
            ////PHONE NAME///////
            const product = button.dataset.productName;

            ////PHONE PRICE//////
            const selectedRadio = document.querySelector(`input[name="choice-${productId}"]:checked`);
            const price = parseInt(selectedRadio.dataset.productPrice);

            ///////////////////CART PUSH////////////////////
                let matchingItem; 
                   
                    
                    cart.forEach((cartItem) => {
                        if(productId === cartItem.productId){
                            matchingItem = cartItem;
                        }
                    });

                
                    
                        if(price === 11111){
                            window.alert('This product is out of stock')
                        }else{
                    
                            if(matchingItem){
                                matchingItem.quantity += 1;
                            }else{
                                cart.push({
                                    productId: productId,
                                    productName: product,
                                    quantity: quantityOption,
                                    storage: storageOption,
                                    price: price,
                                });
                            }
                        }
                    

                 saveToStorage();
            ////////////////////////////////////////////////
        }
    );
})




////////////////////////////////PRODUCT INFO WINDOW TOGGLE///////////////////////////////////////////
const toggleWindow = document.querySelectorAll('.toggleWindow');
const overlay = document.querySelector('.js-overlay');
const closeWindow = document.querySelectorAll('.closeWindow');


toggleWindow.forEach((button) => {
  button.addEventListener('click', () => {

    ///DOM VARIABLES///
    const productwindow = document.querySelector('.js-product-info-window');
    const allGrids = [...productsGrid1, ...productsGrid2, ...productsGrid3];
    const buttonId = button.dataset.productId;

    ///WINDOW TOGGLE
    productwindow.classList.toggle('product-info-window');
    overlay.classList.toggle('overlay');
    productwindow.style.display = 'flex';
    
    let matchingProduct;
        
        ///GENERATING INFO WINDODW HTML
        allGrids.forEach((product) => {
                if(buttonId === product.id){
                    matchingProduct = product;

                if(matchingProduct){

                    productwindow.innerHTML = `
                    <div class="window-padding">
                        <div class="left">
                            <img src="${matchingProduct.image}" alt="${matchingProduct.name}-image" height="445px" width="400px"/>
                        </div>
                        <div class="right">
                            <div class="product-name">
                                <h1>${matchingProduct.name}</h1>
                                <button class="closeWindow"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                            </div>
                            <div class="product-price">
                                <p class="head">base Price :</p>
                                <p class="content">${matchingProduct.price}</p>
                                <P class="disclaimer">*prices may vary based on storage options</P>
                            </div>
                            <div class="product-specs">
                            <p class="head">Storage :</p> 
                                <p class="content">${matchingProduct.storage}</p>
                            </div>
                            <div class="product-description">
                                <p class="head">Description : </p>
                                <p class="content">${matchingProduct.description}</p>
                            </div>
                        </div>
                    </div>
                            `;
                }
                }
        
        
            }
        
        )}
    )
  });

/////CLOSE WINDOW////////
closeWindow.forEach((Button) => {
    Button.addEventListener('click', () => {
        productwindow.classList.toggle('product-info-window');
        overlay.classList.toggle('overlay');
        productwindow.style.display = 'none';
    })
})

///PRODUCT INFO WINDOW OVERLAY
overlay.addEventListener('click', () => {
    const productwindow = document.querySelector('.js-product-info-window');
    productwindow.classList.toggle('product-info-window');

    overlay.classList.toggle('overlay');
    productwindow.style.display = 'none';
});

