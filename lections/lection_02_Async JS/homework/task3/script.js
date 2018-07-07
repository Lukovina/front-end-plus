window.onload = function () {

    
const input = document.querySelector("#urlInput"),
      videos = document.querySelector(".videos"),
      clear = document.querySelector("#clearStorage")
      add = document.querySelector("#AddBtn")
      add.addEventListener("click" , addUrl);
      clear.addEventListener("click", clearStorage) 

let playList = JSON.parse(localStorage.getItem( "playList" )) || [];
    playList.length ? render() : console.log( "playList is empty" )


function addUrl () {
    let id = getVideoId(input.value)
    playList.push(id);
    localStorage.setItem("playList", JSON.stringify(playList))
    render()
}

function getVideoId () {
    let inner = input.value;
    return inner.slice(inner.length - 11)
}

function clearStorage () {
    localStorage.removeItem("playList");
    playList = [];
    render()
}

function render () {
    let idList = JSON.parse(localStorage.getItem("playList"));
    if(idList) {
        videos.innerHTML = idList.map(id => 
            `
            <iframe 
            width="300px" height="200px" 
            src="https://www.youtube.com/embed/${id}" 
            frameborder="0" 
            allow="autoplay; 
            encrypted-media" allowfullscreen>
            </iframe>
            `
        ).join("")
    }else {
        videos.innerHTML = "";
}


    }
}