const buttons = document.querySelectorAll('.System_button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert(button.textContent);
    });
});

const arrow = document.getElementById("wind_arrow")

arrow.style.transform= "rotate(0deg)"

arrow.addEventListener("click", () => {
    let current = arrow.dataset.angle ? parseInt(arrow.dataset.angle) : 0;
    current = (current + 45) % 360;
    arrow.dataset.angle = current;
    arrow.style.transform = `rotate(${current}deg)`;
});


const center=[39.29019878808572, -84.27956108213318]

let map = L.map('map', {
    zoomControl: false,
    attributionControl: false
}).setView(center, 17);

map.dragging.disable();

// map.on('moveend', function () {
//     map.setView(center, 17 ,{animate: true});
// });

// Base map layer
L.tileLayer("https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
    maxZoom: 20,
}).addTo(map);

// RainViewer radar layer
L.tileLayer(
        "https://tilecache-us.rainviewer.com/v3/tiles/{z}/{x}/{y}/radar/0/0_0.png",
    {
        opacity: 0.8,
        tileSize: 256,
        maxZoom: 20,
    }
).addTo(map);