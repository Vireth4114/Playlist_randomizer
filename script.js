const key = 'AIzaSyAaugZrD0vq4UhzSxo3nV7NNuOjMsHcEIw';
let help = document.getElementsByClassName("iframe")[0];
let list = new Array;
var player;

function getData(pageToken) {
    let playlist = inputting.value;
    let req = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=50&pageToken=${pageToken}`
    fetch(req)
        .then(response => {
            if (!response.ok) {
                console.log("ff");
            }
            return response.json();
        })
        .then(data => {
            data["items"].forEach(element => {
                list.push(element["snippet"]["resourceId"]["videoId"]);
            });
            if (data["nextPageToken"] != null) {
                getData(data["nextPageToken"]);
            } else {
                display();
            }
        })
}

function display() {
    let element = list[Math.floor(Math.random() * list.length)];
    document.getElementById("video").innerHTML = `<iframe id="thevideo" height="450" width="800"src="https://www.youtube.com/embed/${element}?autoplay=1&enablejsapi=1" allow='autoplay'></iframe>`
    player = new YT.Player('thevideo', {
        events: { 'onStateChange': onPlayerStateChange }
    });
}

function doThings() {
    if (list.length == 0) {
        getData("");
    } else {
        display();
    }
}

function onPlayerStateChange(event) {
    if (event.data == 0) {
        doThings();
    }
}