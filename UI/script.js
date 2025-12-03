
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
let lightLayer_full = L.tileLayer("https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
    maxZoom: 20
});

let darkLayer_full = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
    maxZoom: 20
});
let fullscreenMap = L.map('mapExpanded', {
    zoomControl: false,
    attributionControl: false
}).setView(center, 17);

// Use same tiles as your main one
fullscreenMap.addLayer(lightLayer_full);


document.getElementById("map").addEventListener("click", () => {
    document.getElementById("mapOverlay").style.display = "flex";

    // Create separate Leaflet instance for fullscreen map
    setTimeout(() => {
        fullscreenMap.invalidateSize();
        fullscreenMap.setView(map.getCenter(), map.getZoom());
    }, 100);
});

// Close overlay when clicking background
document.getElementById("mapOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("mapOverlay")) {
        document.getElementById("mapOverlay").style.display = "none";
    }
    map.setView(fullscreenMap.getCenter(), fullscreenMap.getZoom())
});

map.on("moveend", () => {
    const pos = {
        center: map.getCenter(),
        zoom: map.getZoom()
    };
    sessionStorage.setItem("mapPos", JSON.stringify(pos));
});

const toggle_mode = document.getElementById("themeToggle");
const setting_bnt = document.getElementById("settings")
const homing_bnt = document.getElementById("homing")
const weather_bnt = document.getElementById("weather")
const audio_bnt = document.getElementById("audio")
const light_bnt = document.getElementById("lighting")
const air_bnt = document.getElementById("air_flow")


function applyThemeToIcons() {
    if (document.body.classList.contains("dark")) {
        toggle_mode.querySelector('img').src = "../Assets/Sun.png";
        setting_bnt.querySelector('img').src = "../Assets/Settings-Dark.png";
        homing_bnt.querySelector('img').src = "../Assets/Homing-Dark.png";
        weather_bnt.querySelector('img').src = "../Assets/Weather-Dark.png";

        map.removeLayer(lightLayer);
        map.addLayer(darkLayer);
        fullscreenMap.addLayer(darkLayer_full);
        fullscreenMap.removeLayer(lightLayer_full);
        
    } else {
        toggle_mode.querySelector('img').src = "../Assets/Moon.png";
        setting_bnt.querySelector('img').src = "../Assets/Settings-Light.png";
        homing_bnt.querySelector('img').src = "../Assets/Homing-Light.png";
        weather_bnt.querySelector('img').src = "../Assets/Weather-Light.png";

        map.removeLayer(darkLayer);
        map.addLayer(lightLayer);
        fullscreenMap.addLayer(lightLayer_full);
        fullscreenMap.removeLayer(darkLayer_full);
    }
}

toggle_mode.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Change button text
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
    applyThemeToIcons()
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

document.addEventListener("DOMContentLoaded", () => {
        const saved = sessionStorage.getItem("mapPos");

    if (saved) {
        const pos = JSON.parse(saved);
        map.setView([pos.center.lat, pos.center.lng], pos.zoom);
    } else {
        map.setView(center, 17); // your default
    }
    applyThemeToIcons();
});