const key = 'AIzaSyAaugZrD0vq4UhzSxo3nV7NNuOjMsHcEIw';

let list = new Array;

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
    document.getElementById("main").innerHTML += `<iframe height="450" width="800"src="https://www.youtube.com/embed/${element}?autoplay=1&mute=1" allow='autoplay'></iframe>`
}

getData("");