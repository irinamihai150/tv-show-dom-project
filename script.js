//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  
}
allEpisodes.forEach((episode) => {
  //container for h1,h2, img, p
  let divEpisode = document.createElement("div");
  divEpisode.classList.add("container")
  rootElem.appendChild(divEpisode);
  //title
  let titleEpisode = document.createElement("h1");
  titleEpisode.classList.add("title");
  divEpisode.appendChild(titleEpisode);
  let episodeName = episode.name;
  //h2 and ep number
  let seasonEpisode = document.createElement("h2");
  seasonEpisode.classList.add("season-episode");
  divEpisode.appendChild(seasonEpisode);
  let seasonNumber = episode.season;
  let episodeNumber = episode.number;
  //img
  let imageEpisode = document.createElement("img");
  divEpisode.appendChild(imageEpisode);
  imageEpisode.classList.add("img")
  //p for summary
  let summary = document.createElement("p");
  divEpisode.appendChild(summary);
  summary.classList.add("summary")
  //adding content
  titleEpisode.innerHTML = episodeName;
  seasonEpisode.innerHTML = `S0${seasonNumber}E0${episodeNumber}`
  imageEpisode.src = episode.image.medium;
  summary.innerHTML = episode.summary
  

});
//create footer
let footer = document.createElement("footer");
document.body.appendChild(footer);
let copyRight = document.createElement("p");
footer.appendChild(copyRight);
copyRight.innerHTML =
  'The data originally comes from <a href="https://www.tvmaze.com/">TVMaze.com</a>';
document.getElementsByClassName("container").style.flexDirection = "column"

window.onload = setup;
