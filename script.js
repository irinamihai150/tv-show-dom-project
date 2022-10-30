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

  // fetch(`http://api.tvmaze.com/shows`)
  //   .then((response) => {
  //     if (response.status == 200) {
  //       return response.json();
  //     }
  //     throw `${response.status} ${response.statusText}`;
  //   })

    createShowList(allShows);
    allShows.forEach((show) => {
        let option = document.createElement("option");
        selectShow.appendChild(option);
        option.text = show.name;
        let sortedShows = allShows.sort((a, b) => a.name.localeCompare(b.name));
      });
      makePageForShow();

}

//level 400
let selectShow = document.getElementById("select-show");

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
      if (response.status == 200) {
        return response.json();
      }
      throw `${response.status} ${response.statusText}`;
    })
    .then((data) => {
      // console.log(data);
      makePageForEpisodes(data);
    })
    //handle errors from fetch
    .catch((error) => {
      console.log(error);
    });
});

//level 500

//create a show listing and display name, image, summary, genres, status, rating, and runtime.

function createShowList(showlist) {
  hideNav();

  let showsDiv = document.getElementById("showsDiv");
  if (showsDiv) {
    showsDiv.textContent = "";
  } else {
    showsDiv = document.createElement("div");
    showsDiv.setAttribute("id", showsDiv);
    rootElem.append(showsDiv);
  }

  showlist.forEach((show) => {
    document.getElementById("select").style.display = "none";
    let showCard = document.createElement("div");
    let showDetails = document.createElement("div");
    let showImage = document.createElement("img");
    // console.log(show.image);
    if (show.image && show.image.medium) {
      showImage.src = show.image.medium;
    }
    let showInfo = document.createElement("div");
    let showInfoTitle = document.createElement("h1");
    let showInfoDiv = document.createElement("div");
    let showRuntime = document.createElement("p");
    let showStatus = document.createElement("p");
    let showRating = document.createElement("p");
    let showGenre = document.createElement("p");
    let containSumary = document.createElement("div");
    let showSummary = document.createElement("p");
    containSumary.append(showSummary);

    console.log(Object.values(show.name));
    showCard.classList.add("showCard");
    showDetails.classList.add("showDetails");
    showImage.classList.add("showImage");
    showInfo.classList.add("showInfo");
    showInfoTitle.classList.add("showInfoTitle");
    showInfoDiv.classList.add("showInfoDiv");
    showRuntime.classList.add("showInfoParagraphs");
    showStatus.classList.add("showInfoParagraphs");
    showRating.classList.add("showInfoParagraphs");
    showGenre.classList.add("showInfoParagraphs");
    showSummary.classList.add("showSummary");
    containSumary.classList.add("containSumary");

    showsDiv.appendChild(showCard);
    showCard.appendChild(showDetails);
    showDetails.append(showImage, showInfo);
    showInfoTitle.innerHTML = `${show.name}`;
    showInfo.appendChild(showInfoTitle);
    showInfo.appendChild(showInfoDiv);

    showRuntime.innerHTML = `<span>Runtime:</span> ${show.runtime} min`;
    showStatus.innerHTML = `<span>Status:</span> ${show.status}`;
    showRating.innerHTML = `<span>Rating:</span> ${show.rating.average}`;
    showGenre.innerHTML = `<span>Genres:</span> ${show.genres}`;
    showInfoDiv.append(showRuntime, showStatus, showRating, showGenre);
    showSummary.innerHTML = show.summary;
    showCard.append(containSumary);

    //fetch and present episodes from that show when show is clicked(enabling episode search and selection as before)
    showInfoTitle.addEventListener("click", (ev) => {
      fetch(`https://api.tvmaze.com/shows/${show.id}/episodes`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          allEpisodes = data;
          makePageForEpisodes(data);
        });
    });
  });

  let summaryArray = document.getElementsByClassName("showSummary");
  for (let i = 0; i < summaryArray.length; i++) {
    if (summaryArray.item(i).textContent.length > 200) {
      let truncated = summaryArray.item(i).textContent.substring(0, 200);

      summaryArray.item(i).innerHTML = `<p style="margin:0;">${truncated}</p>`;
      const readMore = document.createElement("span");
      readMore.classList.add("readMore");
      summaryArray.item(i).append(readMore);
      readMore.innerText = " ...Read More ";
      readMore.addEventListener("click", (event) => {
        summaryArray.item(i).innerHTML = allShows[i].summary;
      });
    }
  }
}

//Provide a free-text show search through show names, genres, and summary text
//level 500
function makePageForShow(event) {
  let search = document.getElementById("searchShow").value;
  let filteredShows = allShows.filter((show) => {
    if (
      show.name.includes(search) ||
      show.genres.includes(search) ||
      show.summary.includes(search)
    ) {
      return show;
    }
  });
  console.log(filteredShows);
  createShowList(filteredShows);
}

let searchShow2 = document.getElementById("searchShow");
searchShow2.addEventListener("click", () => {
  makePageForShow();
});

// hide the "shows listing buttons" view.

function hideNav(selectshow, select, search) {
  document.getElementById("select").style.display = "none";
  document.getElementById("search").style.display = "none";
}

function showNav(selectshow, select, search) {
  document.getElementById("select-show").style.display = "block";
  document.getElementById("select").style.display = "block";
  document.getElementById("search").style.display = "block";
}

// Add a navigation link to enable the user to return to the "shows listing"
//When this is clicked, the episodes listing should be hidden
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  let rootElem = document.getElementById("root");
  rootElem.textContent = "";
  setup();
  hideNav();
});

// })
// ----------------------level 100------------------------------
function makePageForEpisodes(episodeList) {
  showNav();
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.innerHTML = "";
  const select = document.getElementById("select");
  const selectbar = document.getElementById("selectbar");
  select.parentElement.removeChild(select);
  episodeList.forEach((episode) => {
    const divEpisode = document.createElement("div");
    let titleEpisode = document.createElement("h1");
    let episodeName = episode.name;
    let seasonEpisode = document.createElement("h2");
    let seasonNumber = episode.season;
    let episodeNumber = episode.number;
    let imageEpisode = document.createElement("img");
    let summary = document.createElement("p");

    titleEpisode.classList.add("title");
    seasonEpisode.classList.add("season-episode");
    imageEpisode.classList.add("img");
    summary.classList.add("summary");
    divEpisode.classList.add("container");
    divEpisode.appendChild(titleEpisode);
    divEpisode.appendChild(seasonEpisode);
    divEpisode.appendChild(imageEpisode);
    divEpisode.appendChild(summary);
    seasonEpisode.innerHTML = `${episodeName}-S0${seasonNumber}E0${episodeNumber}`;
    if (episode.image) {
      imageEpisode.src = episode.image.medium;
    }
    summary.innerHTML = episode.summary;
    rootElem.appendChild(divEpisode);
  });

  //level 200

  let searchField = document.getElementById("search");
  let searchValue = "";
  //create a function to filter episodes
  searchField.addEventListener("keydown", (ev) => {
    searchValue = ev.target.value.toLowerCase();
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
}

//create footer
let footer = document.createElement("footer");
document.body.appendChild(footer);
let copyRight = document.createElement("p");
footer.appendChild(copyRight);
copyRight.innerHTML =
  'The data originally comes from <a href="https://www.tvmaze.com/">TVMaze.com</a>';

window.onload = setup;
