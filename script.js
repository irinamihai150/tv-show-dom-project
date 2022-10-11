//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.innerHTML = "";

  episodeList.forEach((episode) => {
    //container for h1,h2, img, p
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
    imageEpisode.src = episode.image.medium;
    summary.innerHTML = episode.summary;
      divEpisode.classList.add("container");
      rootElem.appendChild(divEpisode);
  });
  //level 200
  //add a search input field
  const inputField= document.getElementById("search");
  const inputValue = document.getElementById("displaySearch");
  
  //create a function to filter episodes
  


}

//create footer
let footer = document.createElement("footer");
document.body.appendChild(footer);
let copyRight = document.createElement("p");
footer.appendChild(copyRight);
copyRight.innerHTML =
  'The data originally comes from <a href="https://www.tvmaze.com/">TVMaze.com</a>';



window.onload = setup;
