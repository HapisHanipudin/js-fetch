const searchBtn = document.querySelector(".search-btn");
const resultCount = document.querySelector(".result-count");

searchBtn.addEventListener("click", async function () {
  const search = document.querySelector(".input-keyword").value;
  const result = await getResult(search);
  const musics = result.results;
  console.log(musics);
  updateResult(result.resultCount);
  updateUI(musics);
});

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const trackId = e.target.dataset.trackid;
    const trackDetail = await getTracksDetail(trackId);
    // console.log(trackDetail);
    updateModal(trackDetail);
  }
});

function getResult(keyword) {
  return fetch("https://itunes.apple.com/search?term=" + keyword).then((response) => response.json());
}

function getTracksDetail(trackId) {
  // return fetch("https://itunes.apple.com/lookup?wrapperType=collection&id=" + trackId).then((response) => response.json());
  return fetch("https://itunes.apple.com/lookup?entity=musicTrack&id=" + trackId)
    .then((response) => response.json())
    .then((response) => response.results[0]);
}

function updateResult(count) {
  const countTxt = document.querySelector(".result-count");
  countTxt.innerHTML = count + " results";
}

function updateModal(m) {
  const musicDetail = showMusicDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = musicDetail;
}

function updateUI(music) {
  const resultContainer = document.querySelector(".music-container");
  let cards = "";
  music.forEach((m) => {
    cards += showMusic(m);
  });
  resultContainer.innerHTML = cards;
}

function showMusic(m) {
  return `        <div class="col-md-3 my-3">
          <div class="card">
            <img src="${m.artworkUrl100}" class="card-img-top img-fluid" alt="" />
            <div class="card-body">
              <h5 class="card-title">${m.trackName}</h5>
              <h6 class="card-subtitle mb-2 ">${m.collectionName}</h6>
              <h6 class="card-subtitle mb-2 text-muted">${m.artistName}</h6>
              <button href="#" data-toggle="modal" data-target="#musicDetailModal" class="modal-detail-button btn btn-primary" 
            data-trackid="${m.trackId}" >Music Preview</button>
            </div>
          </div>
        </div>`;
}

function showMusicDetail(m) {
  return `            <div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${m.artworkUrl100}" class="img-fluid" alt="" />
                </div>
                <div class="col-md">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${m.trackName}</h5>
              <h6 class="card-subtitle mb-2 ">${m.collectionName}</h6>
                      <h6 class="card-subtitle mb-2 text-muted">${m.artistName}</h6>
 <audio controls>
  <source src="${m.previewUrl}" type="audio/mpeg">
</audio> 
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
}
