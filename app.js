const map = L.map('map').setView([22.9074872, 79.07306671], 5)

const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors, Coded by Deepesh';

const tiles = L.tileLayer(titleUrl, { attribution });

tiles.addTo(map);


const generateList = () => {
    const ul = document.querySelector('.list')

    storeList.forEach((shop) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');
        div.classList.add('shop-item');
        a.innerText = shop.properties.name
        a.href = '#';
        a.addEventListener('click', () => {
            flyToStore(shop)
        })
        p.innerText = shop.properties.address;
        div.appendChild(a)
        div.appendChild(p)
        li.appendChild(div)
        ul.appendChild(li)
    })
}
generateList()

const popUpContent = (data) => {
    return `
<div>
<h4>${data.properties.name}</h4>
<p>${data.properties.address}</p>
<div class='phoneNumber'><a href='tel:${data.properties.phone}'>${data.properties.phone}</a></div>
</div>
`
}
const onEachFeature = (feature, layer) => {
    layer.bindPopup(popUpContent(feature), {
        closeButton: false,
        offset: L.point(0, -7)
    })
}
const myIcon = L.icon({
    iconUrl: 'food.png',
    iconSize: [30, 30],
})
const shopsLayer = L.geoJSON(storeList, {
    onEachFeature: onEachFeature,
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: myIcon
        })
    }
});

shopsLayer.addTo(map)

const flyToStore = (store) => {
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];

    map.flyTo([lat, lng], 14, {
        duration: 3
    });
    setTimeout(() => {
        L.popup({ closeButton: false, offset: L.point(0, -7) }).setLatLng([lat, lng]).setContent(popUpContent(store)).openOn(map)
    }, 3000)
}
