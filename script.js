//You can edit ALL of the code here
const rootElem = document.getElementById("root");
//level 350
let allEpisodes = null;

function setup() {
  fetch("https://api.tvmaze.com/shows/581/episodes")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(data);
    });
}

//level 400
let selectShow = document.getElementById("select-show");
let allShows = getAllShows();
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

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.innerHTML = "";

  const select = document.getElementById("select");
  const selectbar = document.getElementById("selectbar");
  select.parentElement.removeChild(select);
  episodeList.forEach((episode) => {
    const divEpisode = document.createElement("div");
    //title
    const titleEpisode = document.createElement("h1");
    titleEpisode.classList.add("title");
    divEpisode.appendChild(titleEpisode);
    const episodeName = episode.name;
    //h2 and ep number
    const seasonEpisode = document.createElement("h2");
    seasonEpisode.classList.add("season-episode");
    divEpisode.appendChild(seasonEpisode);
    const seasonNumber = episode.season;
    const episodeNumber = episode.number;
    //img
    const imageEpisode = document.createElement("img");
    divEpisode.appendChild(imageEpisode);
    imageEpisode.classList.add("img");
    //p for summary
    const summary = document.createElement("p");
    divEpisode.appendChild(summary);
    summary.classList.add("summary");
    //adding content
    // titleEpisode.innerHTML = episodeName;
    seasonEpisode.innerHTML = `${episodeName}-S0${seasonNumber}E0${episodeNumber}`;
    if (episode.image) {
      imageEpisode.src = episode.image.medium;
    }
    // imageEpisode.src = episode.image.medium;
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
  document.getElementById("reset").addEventListener("click", () => {
    makePageForEpisodes(allEpisodes);
    select.value = -1;
  });
}

//create footer
let footer = document.createElement("footer");
document.body.appendChild(footer);
let copyRight = document.createElement("p");
footer.appendChild(copyRight);
copyRight.innerHTML =
  'The data originally comes from <a href="https://www.tvmaze.com/">TVMaze.com</a>';

window.onload = setup;
