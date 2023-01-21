const map = L.map('map').setView([22.9074872, 79.07306671], 5)

const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors, Coded by Deepesh';

const tiles = L.tileLayer(titleUrl, { attribution });

tiles.addTo(map);

