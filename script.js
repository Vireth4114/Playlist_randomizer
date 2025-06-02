let help = document.getElementsByClassName("iframe")[0];
let list = new Array;
var player;

function getData(pageToken) {
    document.getElementById("video").innerHTML = "Loading...";
    let playlist = inputting.value.split("=").pop();
    fetch(`${API_URL}?playlist=${playlist}&pageToken=${pageToken}`)
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
                document.getElementById("header").innerHTML = "<button onclick=doThings('')>Next</button>"
                display();
            }
        })
}

function display() {
    let n = Math.floor(Math.random() * list.length);
    let element = list[n];
    list.splice(n, 1);
    document.getElementById("video").innerHTML = `<iframe id="thevideo" src="https://www.youtube.com/embed/${element}?autoplay=1&enablejsapi=1&rel=0" allow='autoplay' allowfullscreen></iframe>`
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