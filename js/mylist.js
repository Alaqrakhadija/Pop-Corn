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





//variable for search
const search = document.getElementById("button");
const title = document.getElementById("search-input");

var offset = 18;
$(document).ready(function() {

    $(window).scroll(async() => {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 270) {
            console.log(offset);

            let queryString = `http://localhost:3000/loadlist?offset=${offset}`;


            offset += 18;
            // const data = document.querySelector(".movies-grid");
            const res = await fetch(queryString).then(res => res.json());
            let data = ``;

            for (var i = 0; i < res.msg.length; i++) {

                data += `<div class="movie-card" id="${res.msg[i].title}">
        
                <div class="card-head">
                    <img src="${res.msg[i].img_url}" alt="" class="card-img">
               
                    <div class="card-overlay">
               
                    <button class="bookmark" onclick="removelist(this)" value="${res.msg[i].title}">
                  <ion-icon name="bookmark"></ion-icon> 
            
                </button>
               
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

async function removelist(e) {

    let queryString = "http://localhost:3000/addtolist?";

    queryString += `title=${e.value}&isinmylist=yes`;
    console.log(queryString);
    const res = await fetch(queryString).then(res => res.json());
    if (res.msg == "success") {
        console.log("remove");
        var div = document.getElementById(e.value);
        div.parentNode.removeChild(div);
        // e.innerHTML = '<ion-icon name="bookmark-outline"></ion-icon>';

    }
    console.log("heheheheheh");
}
//searchsection
search.addEventListener("click", async(e) => {
    e.preventDefault();
    const searchcont = title.value;

    if (searchcont)
        window.location = `/movie/search?search=${searchcont}`;
});