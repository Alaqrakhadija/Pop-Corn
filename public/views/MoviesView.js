const Abstarct = require("./Abstarct");

class MovieView extends Abstarct {
  constructor(params) {
    super(params);
    this.setTitle("Movies");
    $(".filter-bar").hide();
  }

  async getHtml() {
    const movieHtml = await this.fetchData();

    return `
    <div class="movie-container">
              ${movieHtml}  
    </div>
    
    `;
  }

  async fetchData() {
    try {
      const data = await fetch(`/api/movies/${this.params.title}`).then((res) =>
        res.json()
      );
      console.log(data);
      const html = `
<div class="movie-card col">
<div class="card-head">
    <img src=${data[0].Poster_Link} alt="" class="card-img">
    <div class="card-overlay">
        <div class="bookmark">
            <ion-icon name="bookmark-outline"></ion-icon>
        </div>
        <div class="rating">
            <ion-icon name="star-outline"></ion-icon>
            <span>${data[0].IMDB_Rating}</span>
        </div>
        <div class="play">
            <ion-icon name="play-circle-outline"></ion-icon>
        </div>
    </div>
</div>
<div class="card-body">
    <h3 class="card-title">
        ${data[0].Series_Title}
    </h3>
    <div class="card-info">
        <span class="genre">${data[0].Genre}</span>
        <span class="year">${data[0].Released_Year}</span>
    </div>
</div>
</div>
<div>
<div class="movie-container">
<h5>Overiview:</h5> 
<h4>${data[0].Overview}</h4>
        </div>
        <div class="movie-container">
            <h5>Director:</h5> 
            <h6>${data[0].COL10}</h6>
                              </div>
                              <div class="movie-container">
                              <h5>Cast:</h5> 
                              <h6>${data[0].COL11} , ${data[0].COL12} , ${data[0].COL13} , ${data[0].COL14}</h6>
                                                </div>
        </div>


</div>

`;

      return html;
    } catch (err) {
      return `<h1> ${err}<h1>`;
    }
  }
}

module.exports = MovieView;
