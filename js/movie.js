'use strict';
//variable for load more
var offset = 18;

//variable for add to list
const addlist = document.getElementById("bookmark");
// variables for navbar menu toggle
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar1-menu-btn');

// variables for navbar search toggle
const navbarForm = document.querySelector('.navbar1-form');
const navbarFormCloseBtn = document.querySelector('.navbar1-form-close');
const navbarSearchBtn = document.querySelector('.navbar1-search-btn');


//variable for filter
const genreFilter = document.querySelector('.genre');
const yearFilter = document.querySelector('.year');

//variable for hidesearch
const hidefilter = document.getElementsByClassName('.filter-bar');
const hideyourmode = document.getElementsByClassName('.your_mood');

//variable for search
const search = document.getElementById("button");
const title = document.getElementById("search-input");
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

const filters = {
    genre: genreFilter.value != "All genres" ? genreFilter.value : "",
    year: yearFilter.value != "allyears" ? yearFilter.value : ""
}

async function sendfilter(queryvalue) {
    var data = document.querySelector(".movies-grid");
    const res = await fetch(queryvalue).then(res => res.json());

    var setdata = '';
    for (var i = 0; i < res.msg.length; i++) {

        setdata += `<div class="movie-card">

        <div class="card-head">
            <img src="${res.msg[i].img_url}" alt="" class="card-img">
       
            <div class="card-overlay">
       
            <button class="bookmark">`;
        console.log(res.inmylist[i].isinlist);
        if (res.inmylist[i].isinlist === 'yes')
            setdata += `<ion-icon name="bookmark"></ion-icon>`;
        else
            setdata += `<ion-icon name="bookmark-outline"></ion-icon>`;

        setdata += `  </button>
       
                <div class="rating">
                    <ion-icon name="star-outline"></ion-icon>
                    <span>${res.msg[i].users_rating}</span>
                </div>
       
                <div class="play">
                    <ion-icon name="play-circle-outline"></ion-icon>
                </div>
       
            </div>
        </div>
       
        <div class="card-body">
            <h3 class="card-title">${res.msg[i].title}</h3>
       
            <div class="card-info">
                <span class="genre">${res.msg[i].genre}</span>
                <span class="year">${res.msg[i].year}</span>
            </div>
        </div>
       
       </div>`;



        console.log(data);

    };
    data.innerHTML = setdata;
    // if (res.msg.length >= 18) {


    //     document.getElementById('load').style.display = "block";


    // } else {


    //     document.getElementById('load').style.display = "none";


    // }
    // if (!yeah) {

    //     document.getElementById('load').style.display = "none";

    // }

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
    if (filters.year) queryString += `Released_Year=${filters.year}&`

    sendfilter(queryString);




})


// search


search.addEventListener('click', async(e) => {
    e.preventDefault();
    let queryString = "http://localhost:3000/search?";
    if (title.value) {
        queryString += `search=${title.value}`

        sendfilter(queryString);
    }
    document.getElementById('filter').style.display = "none";
    console.log(document.getElementById('filter').style.display);

})


//popup
function toggle() {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
}



$(document).ready(function() {

    $(window).scroll(async() => {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 270) {
            console.log(offset);

            let queryString = "http://localhost:3000/loadmore?lIMIT=18&offset=";

            queryString += `${offset}`;
            offset += 18;
            // const data = document.querySelector(".movies-grid");
            const res = await fetch(queryString).then(res => res.json());
            let data = ``;

            for (var i = 0; i < res.msg.length; i++) {

                data += `<div class="movie-card">
        
                <div class="card-head">
                    <img src="${res.msg[i].img_url}" alt="" class="card-img">
               
                    <div class="card-overlay">
               
                    <button class="bookmark" onclick="addtolist(this,)" value="${res.msg[i].title}">`
                if (res.inmylist[i].isinlist === 'yes')
                    data += `  <ion-icon name="bookmark"></ion-icon> `;
                else
                    data += `  <ion-icon name="bookmark-outline"></ion-icon> `;
                data += `  </button>
               
                        <div class="rating">
                            <ion-icon name="star-outline"></ion-icon>
                            <span>${res.msg[i].users_rating}</span>
                        </div>
               
                        <div class="play">
                            <ion-icon name="play-circle-outline"></ion-icon>
                        </div>
               
                    </div>
                </div>
               
                <div class="card-body">
                    <h3 class="card-title">${res.msg[i].title}</h3>
               
                    <div class="card-info">
                        <span class="genre">${res.msg[i].genre}</span>
                        <span class="year">${res.msg[i].year}</span>
                    </div>
                </div>
               
               </div>`;





            };
            $(".movies-grid").append(data);


        }
    });
});

async function addtolist(e) {
    var arr = e.value.split(',');
    let queryString = "http://localhost:3000/addtolist?";

    queryString += `title=${arr[0]}&isinmylist=${arr[1]}`;
    console.log(queryString);
    const res = await fetch(queryString).then(res => res.json());
    if (res.msg == "success") {
        if (arr[1] === 'NO')
            e.innerHTML = '<ion-icon name="bookmark"></ion-icon>';
        else
            e.innerHTML = '<ion-icon name="bookmark-outline"></ion-icon>';
    }
    console.log("heheheheheh");
}