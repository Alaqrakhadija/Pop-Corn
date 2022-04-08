const Abstarct = require("./Abstarct");

class Home extends Abstarct {
  constructor() {
    super();
    this.setTitle("Home");
    $(".filter-bar").hide();
  }

  async getHtml(url) {
    const [indicatorHtml, crousalHtml, likedHtml] = await this.fetchData(url);

    const homeHtml = `
<main>

            <!--
        - #BANNER SECTION
      -->
            <div class="container">
                <div class="slider-container">

                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
    ${indicatorHtml}
                </div>
                <div class="carousel-inner">
                 ${crousalHtml}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
              </div>






                            </div>
                </div>
            </div>


            <section class="movie-list-container">
                <h1 class="movie-list-title section-heading" style="margin-bottom: -25px">You Might Like</h1>
                <div class="movie-list-wrapper">
                
                    <div class="movie-list">
                        ${likedHtml}
                    </div>
                    <div  class="arrow ">&#10095;</div>
                </div>
            </section>









            <!--
        - #CATEGORY SECTION
      -->
            <section class="category " id="category ">

                <h2 class="section-heading ">Category</h2>

                <div class="category-grid ">
                    <a href="/category/action">
                        <div class="category-card " id="Action">
                            <img src="/images/action.jpg " alt=" " class="card-img ">
                            <div class="name ">Action</div>
                            <div class="total ">100</div>
                        </div>
                    </a>
                    <div  id="Comedy" class="category-card ">
                        <img src="/images/comedy.jpg " alt=" " class="card-img ">
                        <div class="name ">Comedy</div>
                        <div class="total ">50</div>
                    </div>

                    <div  id="Thriller" class="category-card ">
                        <img src="/images/thriller.webp " alt=" " class="card-img ">
                        <div class="name ">Thriller</div>
                        <div class="total ">20</div>
                    </div>

                    <div class="category-card ">
                        <img src="/images/horror.jpg " alt=" " class="card-img ">
                        <div class="name ">Horror</div>
                        <div class="total ">80</div>
                    </div>

                    <div class="category-card ">
                        <img src="/images/adventure.jpg " alt=" " class="card-img ">
                        <div class="name ">Adventure</div>
                        <div class="total ">100</div>
                    </div>

                    <div class="category-card ">
                        <img src="/images/animated.jpg " alt=" " class="card-img ">
                        <div class="name ">Animated</div>
                        <div class="total ">50</div>
                    </div>

                    <div class="category-card ">
                        <img src="/images/crime.jpg " alt=" " class="card-img ">
                        <div class="name ">Crime</div>
                        <div class="total ">20</div>
                    </div>

                    <div class="category-card ">
                        <img src="/images/sci-fi.jpg " alt=" " class="card-img ">
                        <div class="name ">SCI-FI</div>
                        <div class="total ">80</div>
                    </div>

                </div>

            </section>



<script src="/js/slider.js" ></script

      

        </main>`;

    return homeHtml;
  }

  async fetchData(url) {
    let crousalHtml = "";
    let likedHtml = "";
    let indicatorHtml = "";
    try {
      const data = await fetch("/api").then((res) => res.json());

      data.carousalData.forEach((e, i) => {
        indicatorHtml += `    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${
          i + 1
        }"></button>
        `;

        crousalHtml += `
  <div class="carousel-item ${i === 0 ? "active" : ""}">
        
         
        <section class="banner">
            <div class="banner-card">

                <img src=${
                  e.Poster_Link
                } class="banner-img" style="width=100px" alt="">

                <div class="card-content">
                    <div class="card-info">

                        <div class="genre">
                            <ion-icon name="film"></ion-icon>
                            <span>${e.Genre}</span>
                        </div>

                        <div class="year">
                            <ion-icon name="calendar"></ion-icon>
                            <span>${e.Released_Year} </span>
                        </div>

                        <div class="duration">
                            <ion-icon name="time"></ion-icon>
                            <span>${e.Runtime}</span>
                        </div>

                        <div class="quality">
                            ${e.IMDB_Rating}
                        </div>

                    </div>

                    <h2 class="card-title">
                         ${e.Series_Title}  
                    </h2>
                </div>

            </div>
        </section>
    
</div>


      `;
      });

      data.likedData.forEach((e) => {
        likedHtml += `
            <div class="movie-list-item">
                <img class="movie-list-item-img" src=${e.Poster_Link} alt=" ">

                <span class="movie-list-item-title "> ${e.Series_Title}</span>
                <p class="movie-list-item-desc ">
                    ${e.Overview}
                </p>
                <button class="movie-list-item-button ">Watch</button>
            </div>
            `;
      });

      return [indicatorHtml, crousalHtml, likedHtml];
    } catch (e) {
      return `<h1>${e}<h1>`;
    }
  }
}

module.exports = Home;
