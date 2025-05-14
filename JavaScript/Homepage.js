/////////////////////////////VARIABLES///////////////////////////
///////IMAGE SLIDER/////////
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
//////NAVBAR////////////
const openButton = document.getElementById('open-btn');
const closeButton = document.getElementById('close-btn');
const navbarOverlay = document.getElementById('nav-overlay');
const navleft = document.getElementById('navbar-left');
const navright = document.getElementById('navbar-right');



////////////////////////////NAVBAR///////////////////////////////
///////TOGGLE ON////////
if(openButton){
openButton.addEventListener('click', ()=>{
    navleft.style.display = 'flex';
    navright.style.display = 'flex';
    navbarOverlay.style.display = 'block';
})
}
///////TOGGLE OFF////////
if(closeButton){
closeButton.addEventListener('click', ()=>{
  navleft.style.display = 'none';
  navright.style.display = 'none';
  navbarOverlay.style.display = 'none';
})
}
if(navbarOverlay){
navbarOverlay.addEventListener('click', ()=>{
  navleft.style.display = 'none';
  navright.style.display = 'none';
  navbarOverlay.style.display = 'none';
})
}

////////////////////////////SLIDE FUNCTIONS//////////////////////
let currentSlide = 0;

function showSlide(index){
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}


setInterval(() => {
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
}, 4000);
  


dots.forEach(dot => {
  dot.addEventListener('click', () => {
    showSlide(parseInt(dot.getAttribute('data-slide')));
  });
});

