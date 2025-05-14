////////////////////ARRAY FOR PRODUCT DETALS//////////////////
const productDetails = localStorage.getItem('productDetails') ? JSON.parse(localStorage.getItem('productDetails')) : [];



////////////////////SELL BUTTON FUNCTIONS/////////////////////
const form = document.querySelector('.product-form');
const submitButton = document.querySelector('.js-submit-button');
const overlay = document.querySelector('.js-overlay');


////PUSH DETAILS TO ARRAY///
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fullname = document.getElementById('name').value;
    const number = document.getElementById('contact').value;
    const model = document.getElementById('phone').value;
    const condition = document.getElementById('condition').value;

    const newObject = {
        fullname,
        number,
        model,
        condition
    }

    productDetails.push(newObject);
    localStorage.setItem('productDetails', JSON.stringify(productDetails));
    form.reset();
});


/////////////////////////SENDING SALE POST///////////////////////
function sendMail () {
    var params = {
        fullname: document.getElementById('name').value,
        number: document.getElementById('contact').value,
        phone: document.getElementById('phone').value,
        condition: document.getElementById('condition').value
    }

    const serviceID = "service_2755nrt";
    const templateID = "template_e562n2p";

    emailjs.send(serviceID, templateID, params)
    .then(
        res => {
            document.getElementById('name').value = '';
            document.getElementById('contact').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('condition').value = '';
            console.log(res);
            alert("Your details have been sent successfully");
        }
    ).catch(err => console.log(err));
}

submitButton.addEventListener('click', () => {
    sendMail();
})
