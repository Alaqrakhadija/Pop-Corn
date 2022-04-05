'use strict';

// variables for navbar menu toggle
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar1-menu-btn');

// variables for navbar search toggle
const navbarForm = document.querySelector('.navbar1-form');
const navbarFormCloseBtn = document.querySelector('.navbar1-form-close');
const navbarSearchBtn = document.querySelector('.navbar1-search-btn');

// navbar menu toggle function
function navIsActive() {
    header.classList.toggle('active');
    nav.classList.toggle('active');
    navbarMenuBtn.classList.toggle('active');
}

navbarMenuBtn.addEventListener('click', navIsActive);



// navbar search toggle function
const searchBarIsActive = () => navbarForm.classList.toggle('active');

navbarSearchBtn.addEventListener('click', searchBarIsActive);
navbarFormCloseBtn.addEventListener('click', searchBarIsActive);


// filters
const genreFilter = document.querySelector('.genre');
const yearFilter = document.querySelector('.year');
const filters = {
    genre: "",
    year: ""
}

async function sendfilter(queryvalue) {
    const data = document.querySelector(".movies-grid");
    const res = await fetch(queryvalue).then(res => res.json());
    data.innerHTML = ``;
    res.msg.forEach(function(e) {
        data.innerHTML += `<div class="movie-card">

 <div class="card-head">
     <img src="./images/movies/ww84.jpg" alt="" class="card-img">

     <div class="card-overlay">

         <div class="bookmark">
             <ion-icon name="bookmark-outline"></ion-icon>
         </div>

         <div class="rating">
             <ion-icon name="star-outline"></ion-icon>
             <span>${e.IMDB_Rating}</span>
         </div>

         <div class="play">
             <ion-icon name="play-circle-outline"></ion-icon>
         </div>

     </div>
 </div>

 <div class="card-body">
     <h3 class="card-title">${e.Series_Title}</h3>

     <div class="card-info">
         <span class="genre">${e.Genre}</span>
         <span class="year">${e.Released_Year}</span>
     </div>
 </div>

</div>`

    })
}

genreFilter.addEventListener('change', async(e) => {
    filters.genre = e.target.value;
    let queryString = "http://localhost:3000/filter?";
    if (filters.genre) queryString += `Genre=${filters.genre}&`
    if (filters.year) queryString += `Released_Year=${filters.year}`

    sendfilter(queryString);


})
yearFilter.addEventListener('change', async(e) => {
    filters.year = e.target.value;
    let queryString = "http://localhost:3000/filter?";
    if (filters.genre) queryString += `Genre=${filters.genre}&`
    if (filters.year) queryString += `Released_Year=${filters.year}`
    sendfilter(queryString);




})


//popup
function toggle() {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
}