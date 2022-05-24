const query = require("../config/database");
const _ = require("lodash");

const getHomeData = async () => {
  const qyery1 =
    "SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating,Runtime FROM `imdb_top_1000` LIMIT 4";
  const qyery2 =
    "SELECT Poster_Link,Series_Title,Overview FROM `imdb_top_1000` LIMIT 6";

  const carousalData = await query(qyery1);
  const likedData = await query(qyery2);

  return [carousalData, likedData];
};

const getMoviesData = async (filterQuery) => {
  let filterQueryString =
    "SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating FROM `imdb_top_1000` LIMIT 18 ";
  if (!_.isEmpty(filterQuery))
    filterQueryString = generateMoviesQyery(filterQuery);
  console.log(filterQueryString);

  return await query(filterQueryString);
};

const generateMoviesQyery = (filterQuery) => {
  let filterQueryString =
    "SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating FROM `imdb_top_1000` WHERE ";
  const year = filterQuery.Released_year
    ? filterQuery.Released_year.split("-")
    : "";
  const filterQueryStrings = {
    Genre: 'Genre LIKE "%' + `${filterQuery.Genre}` + '%"',
    Released_year: year
      ? "Released_Year BETWEEN " + `${year[0]}` + " and " + `${year[1]}`
      : "",
  };

  const filterQueryNames = Object.keys(filterQuery);

  filterQueryNames.forEach((e, i) => {
    if (i === 0) {
      filterQueryString += filterQueryStrings[e];
    } else {
      filterQueryString += "AND" + filterQueryStrings[e];
    }
  });

  return filterQueryString + " LIMIT 18";
};

const getSearchData = async (searchQuery) => {
  const data = await query(
    'SELECT Poster_Link,Series_Title,Released_Year,Genre,IMDB_Rating FROM `imdb_top_1000` WHERE Series_Title LIKE "%' +
      `${searchQuery}` +
      '%" OR Genre LIKE "%' +
      `${searchQuery}` +
      '%" '
  );
  if (_.isEmpty(data)) throw new Error("No Match Found");

  return data;
};
const getMovieByTitle = async (title) => {
  try {
    const data = await query(
      'SELECT * FROM `imdb_top_1000` WHERE Series_Title LIKE "%' +
        `${title}` +
        '%"'
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getHomeData, getMoviesData, getSearchData, getMovieByTitle };
