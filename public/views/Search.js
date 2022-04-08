const Abstarct = require("./Abstarct");

class Search extends Abstarct {
  constructor(params) {
    super(params);
    this.setTitle("Movies");
  }

  async getHtml(url) {
    const moviesHtml = await this.fetchData(this.generateQyeryString(url));

    const html = `    <section class="movies">

    <!--
- filter bar
-->

    <!--
- movies grid
-->

    <div class="movies-grid">
      
${moviesHtml}

    </div>

    <!--
- load more button
-->
    <button class="load-more">LOAD MORE</button>

</section>
`;
    return html;
  }

  async fetchData(url) {
    let moviesHtml = "";
    try {
      const data = await fetch(url).then((res) => res.json());

      data.forEach((e) => {
        moviesHtml += `  
        <div title="${e.Series_Title}" class="movie-card">
            <div class="card-head">
                <img src=${e.Poster_Link} alt="" class="card-img">
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
                <h3 class="card-title">
                    ${e.Series_Title}
                </h3>
                <div class="card-info">
                    <span class="genre">${e.Genre}</span>
                    <span class="year">${e.Released_Year}</span>
                </div>
            </div>
        </div>
        
`;
      });

      return moviesHtml;
    } catch (e) {
      return `<h1> No Match Found</h1>`;
    }
  }

  generateQyeryString(url) {
    let qyeryString = "/api/search?";
    const qyery = url.split("?");
    if (qyery.length > 1) qyeryString += qyery[1];

    return qyeryString;
  }
}

module.exports = Search;
