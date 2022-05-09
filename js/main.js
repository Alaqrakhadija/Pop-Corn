"use strict";

// variables for navbar menu toggle
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const navbarMenuBtn = document.querySelector(".navbar1-menu-btn");

// variables for navbar search toggle
const navbarForm = document.querySelector(".navbar1-form");
const navbarFormCloseBtn = document.querySelector(".navbar1-form-close");
const navbarSearchBtn = document.querySelector(".navbar1-search-btn");

//variable for you might like:

const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
//variable of category
const genres = document.querySelectorAll(".category-card");
//variable for search
const search = document.getElementById("button");
const title = document.getElementById("search-input");
//variable for slider
var index = 0;
var i = 0;
var slider = document.getElementsByClassName("slider");
var line = document.getElementsByClassName("line");
auto();
// navbar menu toggle function
function navIsActive() {
    header.classList.toggle("active");
    nav.classList.toggle("active");
    navbarMenuBtn.classList.toggle("active");
}

navbarMenuBtn.addEventListener("click", navIsActive);

// navbar search toggle function
const searchBarIsActive = () => navbarForm.classList.toggle("active");

navbarSearchBtn.addEventListener("click", searchBarIsActive);
navbarFormCloseBtn.addEventListener("click", searchBarIsActive);

//slider function
function show(n) {
    for (i = 0; i < slider.length; i++) {
        slider[i].style.display = "none";
    }
    for (i = 0; i < line.length; i++) {
        line[i].className = line[i].className.replace("active");
    }
    slider[n - 1].style.display = "block";
    line[n - 1].className += " active";
}

function auto() {
    index++;
    if (index > slider.length) {
        index = 1;
    }
    show(index);
    setTimeout(auto, 5000);
}

function plusSlide(n) {
    index += n;
    if (index > slider.length) {
        index = 1;
    }
    if (index < 1) {
        index = slider.length;
    }
    show(index);
}

function currentSlide(n) {
    index = n;
    show(index);
}

//slider you might like
arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
        const ratio = Math.floor(window.innerWidth / 270);
        clickCounter++;
        if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
            movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
        } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
    });

    console.log(Math.floor(window.innerWidth / 270));
});



//filtercatego
genres.forEach((el) => {
    el.addEventListener("click", async(e) => {
        e.preventDefault();
        const category = e.target.id;
        window.location = `/movies?genre=${category}`;
    });
});


//searchsection
search.addEventListener("click", async(e) => {
    e.preventDefault();
    const searchcont = title.value;

    if (searchcont)
        window.location = `/movie/search?search=${searchcont}`;
});

//you might like watch button
function gotomovie(e) {

    window.location = `/moviepage?title=${e.id}`;
}


// async function categ(e) {
//     alert(e);

//     try {
//         const response = await fetch(`http://localhost:3000/filter?genre=${e}`).then(res => res.json());
//         // const tiitle = `<h1>${response.msg}</h1>`;
//         // const div = document.querySelector(".your_mood");
//         // div.innerHTML = tiitle;

//     } catch (e) {

//     }

// }







// //TOGGLE
//
// const ball = document.querySelector(".toggle-ball");
// const items = document.querySelectorAll(
//     ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
// );
//
// ball.addEventListener("click", () => {
//   items.forEach((item) => {
//     item.classList.toggle("active");
//   });
//   ball.classList.toggle("active");
// });