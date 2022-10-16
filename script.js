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
  let searchField= document.getElementById("search");
  let searchValue="";
  // let searchValue = document.getElementsByClassName("displaySearch");
  
  //create a function to filter episodes
  searchField.addEventListener("keydown", (ev)=>{
    searchValue = ev.target.value.toLowerCase();
    //The target event property returns the element that triggered the event.
    let searchedEpisodes = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(searchValue) ||
        episode.summary.toLowerCase().includes(searchValue)
    );
    console.log("debugger but" + searchedEpisodes.length)
    // rootElem.innerHtml = "";
    //recall the function to recreate the page for searchValue
    
    let displayNumSearched = document.getElementById("displaySearch");
    console.log(displayNumSearched)
    displayNumSearched.textContent = `Display${searchedEpisodes.length}/ ${allEpisodes.length} episodes`;
    // displayNumSearched.appendChild
    makePageForEpisodes(searchedEpisodes);
  })
  
  //level 300
  //create select and option
  let select = document.getElementById("select");
  allEpisodes.forEach(episode=>{
    let option = document.createElement("option");
    select.appendChild(option)
    //the text property sets the text of an option element
    option.text = `SO${episode.season}E${episode.number}-${episode.name}`
    option.value = episode.id;
    // console.log(option.value)
  })
  select.addEventListener("change", (ev)=>{
    console.log(allEpisodes);
    
    let selectedEpisodes = allEpisodes.filter(episode => episode.id.toString()===ev.target.value);
    // console.log(ev.target.value);
    console.log("selectedEpisodes"+selectedEpisodes);
    rootElem.innerHTML = "";
    makePageForEpisodes(selectedEpisodes);
    let displayNumSearched = document.getElementById("displaySearch")
    displayNumSearched.innerHTML = `Display${selectedEpisodes.length}/ ${allEpisodes.length} episodes`;
  })
  document.getElementById("reset").addEventListener("click", ()=> {
     makePageForEpisodes(allEpisodes);
     select.value = -1;
  })
}

//create footer
let footer = document.createElement("footer");
document.body.appendChild(footer);
let copyRight = document.createElement("p");
footer.appendChild(copyRight);
copyRight.innerHTML =
  'The data originally comes from <a href="https://www.tvmaze.com/">TVMaze.com</a>';



window.onload = setup;
