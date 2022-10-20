//You can edit ALL of the code here
const rootElem = document.getElementById("root");
//level 350
let allEpisodes = null;
let allShows = getAllShows();
function setup() {
  // fetch("https://api.tvmaze.com/shows/581/episodes")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     allEpisodes = data;
  //     makePageForEpisodes(data);
  //   });
  createShowList(allShows);
}

//level 400
let selectShow = document.getElementById("select-show");

allShows.forEach((show) => {
  let option = document.createElement("option");
  selectShow.appendChild(option);
  option.text = show.name;
  let sortedShows = allShows.sort((a, b) => a.name.localeCompare(b.name));
});

selectShow.addEventListener("change", (ev) => {
  let selectedShow = allShows.filter((show) => {
    if (ev.target.value === show.name) {
      return show;
      console.log(show.name);
    }
    console.log(ev.target.value);
  });

  let showId = selectedShow[0].id;
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      makePageForEpisodes(data);
    });
});

//level 500

//create a show listing and display name, image, summary, genres, status, rating, and runtime.
//create parent div for show cards
let showsDiv = document.createElement("div");
rootElem.appendChild(showsDiv);

function createShowList(showlist) {
  showlist.forEach((show) => {
    let showCard = document.createElement("div");
    showCard.classList.add("showCard");
    showsDiv.appendChild(showCard);
    let showDetails = document.createElement("div");
    showDetails.classList.add("showDetails");
    showCard.appendChild(showDetails);
    let showImage = document.createElement("img");
    showImage.classList.add("showImage");
    showDetails.appendChild(showImage);
    // showImage.src = show.image.original;
    // if (show.image.original != null) {
    //   showImage.src = show.image.original;
    // }

    let showInfo = document.createElement("div");
    showInfo.classList.add("showInfo");
    showDetails.appendChild(showInfo);
    let showInfoTitle = document.createElement("h1");
    showInfoTitle.classList.add("showInfoTitle");
    showInfoTitle.innerHTML = `${show.name}`;
    showInfo.appendChild(showInfoTitle);
    let showInfoDiv = document.createElement("div");
    showInfoDiv.classList.add("showInfoDiv");
    showInfo.appendChild(showInfoDiv);
    let showRuntime = document.createElement("p");
    showRuntime.innerHTML = `<span>Runtime:</span> ${show.runtime} min`;
    showRuntime.classList.add("showInfoParagraphs");
    showInfoDiv.appendChild(showRuntime);
    let showStatus = document.createElement("p");
    showStatus.innerHTML = `<span>Status:</span> ${show.status}`;
    showStatus.classList.add("showInfoParagraphs");
    showInfoDiv.appendChild(showStatus);
    let showRating = document.createElement("p");
    showRating.innerHTML = `<span>Rating:</span> ${show.rating.average}`;
    showRating.classList.add("showInfoParagraphs");
    showInfoDiv.appendChild(showRating);
    let showGenre = document.createElement("p");
    showGenre.innerHTML = `<span>Genres:</span> ${show.genres}`;
    showGenre.classList.add("showInfoParagraphs");
    showInfoDiv.appendChild(showGenre);
    let showSummary = document.createElement("p");
    showSummary.innerHTML = show.summary;
    showSummary.classList.add("showSummary");
    showCard.appendChild(showSummary);
  });
}
//fetch and present episodes from that show when show is clicked(enabling episode search and selection as before)
// hide the "shows listing" view.
// Add a navigation link to enable the user to return to the "shows listing"
//When this is clicked, the episodes listing should be hidden
//Provide a free-text show search through show names, genres, and summary texts

// ----------------------level 100------------------------------
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.innerHTML = "";

  const select = document.getElementById("select");
  const selectbar = document.getElementById("selectbar");
  select.parentElement.removeChild(select);
  episodeList.forEach((episode) => {
    const divEpisode = document.createElement("div");
    let titleEpisode = document.createElement("h1");
    titleEpisode.classList.add("title");
    divEpisode.appendChild(titleEpisode);
    let episodeName = episode.name;
    let seasonEpisode = document.createElement("h2");
    seasonEpisode.classList.add("season-episode");
    divEpisode.appendChild(seasonEpisode);
    let seasonNumber = episode.season;
    let episodeNumber = episode.number;
    let imageEpisode = document.createElement("img");
    divEpisode.appendChild(imageEpisode);
    imageEpisode.classList.add("img");
    let summary = document.createElement("p");
    divEpisode.appendChild(summary);
    summary.classList.add("summary");
    seasonEpisode.innerHTML = `${episodeName}-S0${seasonNumber}E0${episodeNumber}`;
    if (episode.image) {
      imageEpisode.src = episode.image.medium;
    }
    summary.innerHTML = episode.summary;
    divEpisode.classList.add("container");
    rootElem.appendChild(divEpisode);
  });

  //level 200

  let searchField = document.getElementById("search");
  let searchValue = "";
  //create a function to filter episodes
  searchField.addEventListener("keydown", (ev) => {
    searchValue = ev.target.value.toLowerCase();
    //The target event property returns the element that triggered the event.
    let searchedEpisodes = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(searchValue) ||
        episode.summary.toLowerCase().includes(searchValue)
    );
    console.log("debugger but" + searchedEpisodes.length);
    // rootElem.innerHtml = "";
    //recall the function to recreate the page for searchValue

    let displayNumSearched = document.getElementById("displaySearch");
    console.log(displayNumSearched);
    displayNumSearched.textContent = `Display${searchedEpisodes.length}/ ${allEpisodes.length} episodes`;
    // displayNumSearched.appendChild
    makePageForEpisodes(searchedEpisodes);
  });

  //level 300
  let selectElm = document.createElement("select");
  selectElm.id = "select";
  selectbar.appendChild(selectElm);
  episodeList.forEach((episode) => {
    let option = document.createElement("option");
    selectElm.appendChild(option);
    option.text = `SO${episode.season}E${episode.number}-${episode.name}`;
    option.value = episode.id;
  });
  selectElm.addEventListener("change", (ev) => {
    let selectedEpisodes = episodeList.filter(
      (episode) => episode.id.toString() === ev.target.value
    );

    console.log("selectedEpisodes" + selectedEpisodes);
    rootElem.innerHTML = "";
    makePageForEpisodes(selectedEpisodes);
    let displayNumSearched = document.getElementById("displaySearch");
    displayNumSearched.innerHTML = `Display${selectedEpisodes.length}/ ${episodeList.length} episodes`;
  });
  // document.getElementById("reset").addEventListener("click", () => {
  //   makePageForEpisodes(allEpisodes);
  //   select.value = 1;
  // });
}

//create footer
let footer = document.createElement("footer");
document.body.appendChild(footer);
let copyRight = document.createElement("p");
footer.appendChild(copyRight);
copyRight.innerHTML =
  'The data originally comes from <a href="https://www.tvmaze.com/">TVMaze.com</a>';

window.onload = setup;
