const searchBtn = document.querySelector(".search-btn");
const resultCount = document.querySelector(".result-count");

searchBtn.addEventListener("click", async function () {
  const search = document.querySelector(".input-keyword").value;
  const result = await getResult(search);
  const animes = result.data;
  // console.log(animes);
  updateResult(result.pagination.items.count);
  updateUI(animes);
});

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const malId = e.target.dataset.malid;
    const malDetail = await getMalsDetail(malId);
    // console.log(malDetail);
    updateModal(malDetail);
  }
});

function getResult(keyword) {
  return fetch("https://api.jikan.moe/v4/anime?sfw&q=" + keyword).then((response) => response.json());
}

function getMalsDetail(malId) {
  // return fetch("https://itunes.apple.com/lookup?wrapperType=collection&id=" + malId).then((response) => response.json());
  return fetch("https://api.jikan.moe/v4/anime/" + malId + "?sfw")
    .then((response) => response.json())
    .then((response) => response.data);
}

function updateResult(count) {
  const countTxt = document.querySelector(".result-count");
  countTxt.innerHTML = count + " results";
}

function updateModal(a) {
  const animeDetail = showAnimeDetail(a);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = animeDetail;
  CloseModal();
}

function CloseModal() {
  const closeBtn = document.querySelector(".close");
  const modalBody = document.querySelector(".modal-body");
  closeBtn.addEventListener("click", function () {
    modalBody.innerHTML = "";
  });
}

function updateUI(anime) {
  const resultContainer = document.querySelector(".anime-container");
  let cards = "";
  anime.forEach((a) => {
    cards += showAnime(a);
  });
  resultContainer.innerHTML = cards;
}

function showAnime(a) {
  return `        <div class="col-md-4 my-3">
          <div class="card">
            <img src="${a.images.jpg.image_url}" class="card-img-top img-fluid" alt="" />
            <div class="card-body">
              <h5 class="card-title">${a.title_english}</h5>
              <h6 class="card-subtitle mb-2 ">${a.title_japanese}</h6>
              <h6 class="card-subtitle mb-2 text-muted">${a.status}</h6>
              <button href="#" data-toggle="modal" data-target="#animeDetailModal" class="modal-detail-button btn btn-primary" 
            data-malid="${a.mal_id}" >Anime Preview</button>
            </div>
          </div>
        </div>`;
}

function showAnimeDetail(a) {
  return `
   <div class="container-fluid justify-center">
              <div class="row my-3">
                <div class="col-md-3">
                  <img src="${a.images.jpg.image_url}" class="img-fluid" alt="" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${a.title_english}</h4></li>
                    <li class="list-group-item">
                      <h5>
                        ${a.title_japanese}
                        </h5>
                        <h6 class="text-muted">${a.title_synonyms}</h6>
                    </li>
                    <li class="list-group-item"><h5>${a.type} ${a.season} ${a.year}</h5></li>
                    <li class="list-group-item"><strong>Status :</strong> ${a.status}</li>
                    <li class="list-group-item"><strong>Aired :</strong> ${a.aired.string}</li>
                    <li class="list-group-item"><strong>Score :</strong> ${a.score}</li>
                    <li class="list-group-item"><strong>Scored By :</strong> ${a.scored_by}</li>
                    <li class="list-group-item"><strong>Rank :</strong> ${a.rank}</li>
                    <li class="list-group-item"><strong>Episodes :</strong> ${a.episodes}</li>
                    <li class="list-group-item">
                      <strong>Synopsis :</strong><br />
                      ${a.synopsis}
                    </li>
                  </ul>
                  </div>
                  </div>
              <div class="row">
                  <iframe width="800" height="450" src="${a.trailer.embed_url}" frameborder="0" allowfullscreen></iframe>
            </div>
            </div>
  `;
}
