// $(".search-btn").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=48e53f52&s=" + $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       $(".movie-container").html(cards);

//       // Tombol Detail
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=48e53f52&i=" + $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetails = showMovieDetails(m);
//             $(".modal-body").html(movieDetails);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// Fetch
// const searchBtn = document.querySelector(".search-btn");
// const movieContainer = document.querySelector(".movie-container");
// const modalBody = document.querySelector(".modal-body");

// searchBtn.addEventListener("click", function () {
//   const search = document.querySelector(".input-keyword").value;
//   fetch("http://www.omdbapi.com/?apikey=48e53f52&s=" + search)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((m) => (cards += showCards(m)));
//       movieContainer.innerHTML = cards;

//       // Detail Modal
//       const modalButton = document.querySelectorAll(".modal-detail-button");
//       modalButton.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=48e53f52&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetails(m);
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

// Fetch (Async Await)
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", async function () {
  const search = document.querySelector(".input-keyword");
  const movies = await getMovies(search.value);
  updateUI(movies);
  // console.log(movies);
});

// Event Binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    console.log(imdbid);
    const movieDetail = await getMoveDetails(imdbid);
    console.log(movieDetail);
    updateModal(movieDetail);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=48e53f52&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function getMoveDetails(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=48e53f52&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateModal(m) {
  const modalDetail = showMovieDetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = modalDetail;
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function showMovieDetails(m) {
  const posterURL = m.Poster === "N/A" ? "img/notfound.png" : m.Poster;
  return ` <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${posterURL}" class="img-fluid" alt="" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title}</h4></li>
          <li class="list-group-item"><h5>${m.Released}</h5></li>
          <li class="list-group-item"><strong>Genre :</strong> ${m.Genre}</li>
          <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
          <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
          <li class="list-group-item"><strong>Writer :</strong> ${m.Writer}</li>
          <li class="list-group-item">
            <strong>Plot :</strong><br />
            ${m.Plot}
          </li>
        </ul>
      </div>
              </div>
    </div>`;
}

function showCards(m) {
  const posterURL = m.Poster === "N/A" ? "img/notfound.png" : m.Poster;
  return `<div class="col-md-4 my-3">
          <div class="card">
            <img src="${posterURL}" class="card-img-top" alt="" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
              <button href="#" data-toggle="modal" data-target="#movieDetailModal" class="modal-detail-button btn btn-primary" data-imdbid="${m.imdbID}">Show Details</button>
            </div>
          </div>
        </div>`;
}
