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





//searchsection
search.addEventListener("click", async(e) => {
    e.preventDefault();
    const searchcont = title.value;

    if (searchcont)
        window.location = `/movie/search?search=${searchcont}`;
});