const Home = require("../views/Home");
const Movies = require("../views/Movies");
const Search = require("../views/Search");
const _ = require("lodash");

const router = async () => {
  const routes = [
    {
      path: "/",
      view: Home,
      title: "Home",
    },
    {
      path: "/movies",
      view: Movies,
      title: "Movies",
    },
    { path: "/search", view: Search, title: "" },
    { path: "/series", view: "series", title: "Series" },
  ];

  const potientailRoutes = routes.map((route) => {
    return {
      route: route,
      isMatched: route.path === location.pathname,
    };
  });

  let match = potientailRoutes.find((e) => e.isMatched);
  if (!match) match = { route: routes[0], isMatched: true };

  const view = new match.route.view(match.route.title);
  const html = await view.getHtml(window.location.href);

  document.getElementById("root").innerHTML = html;
};

window.addEventListener("DOMContentLoaded", () => {
  console.log(true);
  router();
});
window.addEventListener("popstate", () => {
  router();
});

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

$(".navbar1-link").click(async (e) => {
  e.preventDefault();
  const url = e.target.href;
  console.log(url);
  history.pushState(null, null, url);
  router();
});

const header = document.querySelector("header");
const nav = document.querySelector("nav");
const navbarMenuBtn = document.querySelector(".navbar1-menu-btn");

// variables for navbar search toggle
const navbarForm = document.querySelector(".navbar1-form");
const navbarFormCloseBtn = document.querySelector(".navbar1-form-close");
const navbarSearchBtn = document.querySelector(".navbar1-search-btn");

//variable for you might like:

/// hanfling filters
const filters = {
  genre: "",
  year: "",
};

$(".genre").change((e) => {
  const value = e.target.value;
  filters.genre = value;
  if (!value) {
    navigateTo("/movies");
  } else {
    navigateTo(generateqyeryString());
  }
});

$(".year").change((e) => {
  const value = e.target.value;
  filters.year = value;
  if (value.isBlank) {
    navigateTo("/movies");
  } else {
    navigateTo(generateqyeryString());
  }
});
function generateqyeryString() {
  let qyeryString = "/movies?";
  if (filters.genre) qyeryString += `Genre=${filters.genre}`;
  if (filters.year) qyeryString += `Released_Year=${filters.year}`;

  return qyeryString;
}

// $("#search-input").change((e) => {
//   const value = e.target.value;
//   if (value.isBlank) {
//     navigateTo("/movies");
//   } else navigateTo(`/search?q=${value}`);
// });
$("#search-input").on("propertychange input", function (e) {
  const value = e.target.value;
  console.log(value);
  if (value.isBlank || !value) {
    navigateTo("/movies");
  } else navigateTo(`/search?q=${value}`);
});

function navIsActive() {
  header.classList.toggle("active");
  nav.classList.toggle("active");
  navbarMenuBtn.classList.toggle("active");
}

navbarMenuBtn.addEventListener("click", navIsActive);

// navbar search toggle function

navbarSearchBtn.addEventListener("click", searchBarIsActive);
navbarFormCloseBtn.addEventListener("click", searchBarIsActive);
