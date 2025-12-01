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
    current = (current + 30) % 360;
    arrow.dataset.angle = current;
    arrow.style.transform = `rotate(${current}deg)`;
});


const center=[39.29019878808572, -84.27956108213318]

let map = L.map('map', {
    zoomControl: false,
    attributionControl: false
}).setView(center, 17);



// map.on('moveend', function () {
//     map.setView(center, 17 ,{animate: true});
// });

// Base map layer
let lightLayer = L.tileLayer(
    "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    { maxZoom: 20 }
).addTo(map);

let darkLayer = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    { maxZoom: 20 }
);

// RainViewer radar layer
L.tileLayer(
        "https://tilecache-us.rainviewer.com/v3/tiles/{z}/{x}/{y}/radar/0/0_0.png",
    {
        opacity: 0.8,
        tileSize: 256,
        maxZoom: 20,
    }
).addTo(map);

const toggle_mode = document.getElementById("themeToggle");

toggle_mode.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Change button text
    if (document.body.classList.contains("dark")) {
        toggle.querySelector('img').src="Images/Sun.png";
        map.removeLayer(lightLayer)
        map.addLayer(darkLayer)
    } else {
        toggle.querySelector('img').src="Images/Moon.png";
        map.removeLayer(darkLayer);
        map.addLayer(lightLayer);
    }
});

const homing = document.getElementById("homing")

homing.addEventListener("click", () => {
    map.setView(center,17,{animate: true})
})