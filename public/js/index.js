const Home = require("../views/Home");
const Movies = require("../views/Movies");
const Search = require("../views/Search");
const MovieView = require("../views/MoviesView");
const urlPattern = require("url-pattern");

const CreatePattern = (path) => new urlPattern(path);

const router = async () => {
  const routes = [
    {
      path: "/",
      view: Home,
    },
    {
      path: "/movies",
      view: Movies,
    },
    { path: "/search", view: Search },
    { path: "/movies(/:title)", view: MovieView },
  ];

  const potientailRoutes = routes.map((route) => {
    return {
      route: route,
      params: CreatePattern(route.path).match(location.pathname),
    };
  });

  let match = potientailRoutes.find((e) => e.params !== null);
  if (!match) match = { route: routes[0], params: location.pathname };
  console.log(match);

  const view = new match.route.view(match.params);
  const html = await view.getHtml(window.location.href);
  console.log(html);

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

const targetNode = document.getElementById("root");

const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      $(".movie-card").click((e) => {
        console.log("you clicked a card");
        navigateTo(`/movies/${e.currentTarget.title}`);
      });
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
