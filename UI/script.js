const savedTheme = localStorage.getItem("theme");



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

// Base map layer
let lightLayer = L.tileLayer(
    "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    { maxZoom: 20 }
).addTo(map);

let darkLayer = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    { maxZoom: 20 }
);

const toggle_mode = document.getElementById("themeToggle");
const setting_bnt = document.getElementById("settings")
const homing_bnt = document.getElementById("homing")
const weather_bnt = document.getElementById("weather")
const audio_bnt = document.getElementById("audio")
const light_bnt = document.getElementById("lighting")
const air_bnt = document.getElementById("air_flow")


toggle_mode.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Change button text
    if (document.body.classList.contains("dark")) {
        toggle_mode.querySelector('img').src="../Assets/Sun.png";
        setting_bnt.querySelector('img').src="../Assets/Settings-Dark.png";
        homing_bnt.querySelector('img').src="../Assets/Homing-Dark.png";
        weather_bnt.querySelector('img').src="../Assets/Weather-Dark.png";
        localStorage.setItem("theme", "dark");
        map.removeLayer(lightLayer)
        map.addLayer(darkLayer)
    } else {
        toggle_mode.querySelector('img').src="../Assets/Moon.png";
        setting_bnt.querySelector('img').src="../Assets/Settings-Light.png";
        homing_bnt.querySelector('img').src="../Assets/Homing-Light.png";
        weather_bnt.querySelector('img').src="../Assets/Weather-Light.png";
        localStorage.setItem("theme", "light");
        map.removeLayer(darkLayer);
        map.addLayer(lightLayer);
    }
});

audio_bnt.addEventListener("click", () => {
    window.location.href = "Audio/index.html";
});
weather_bnt.addEventListener("click", () => {
    window.location.href = "Weather/index.html";
});
light_bnt.addEventListener("click", () => {
    window.location.href = "Lights/index.html";
});
air_bnt.addEventListener("click", () => {
    window.location.href = "Airflow/index.html";
});

homing_bnt.addEventListener("click", () => {
    map.setView(center,17)
})

if (savedTheme === "dark") {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}

if (document.body.classList.contains("dark")) {
    toggle_mode.querySelector('img').src="../Assets/Sun.png";
    setting_bnt.querySelector('img').src="../Assets/Settings-Dark.png";
    homing_bnt.querySelector('img').src="../Assets/Homing-Dark.png";
    weather_bnt.querySelector('img').src="../Assets/Weather-Dark.png";
    localStorage.setItem("theme", "dark");
    map.removeLayer(lightLayer)
    map.addLayer(darkLayer)
} else {
    toggle_mode.querySelector('img').src="../Assets/Moon.png";
    setting_bnt.querySelector('img').src="../Assets/Settings-Light.png";
    homing_bnt.querySelector('img').src="../Assets/Homing-Light.png";
    weather_bnt.querySelector('img').src="../Assets/Weather-Light.png";
    localStorage.setItem("theme", "light");
    map.removeLayer(darkLayer);
    map.addLayer(lightLayer);
}