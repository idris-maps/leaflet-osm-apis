import L from 'leaflet'
import buffer from '@turf/buffer'
import bbox from '@turf/bbox'
import getBars from './getBars'
import search from './search'

const map = L.map('map').setView([46.7785, 6.6412], 15)

const tiles = L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  bounds: [[45, 5], [48, 11]]
})

tiles.addTo(map)


map.on('click', e => {
  const { lat, lng } = e.latlng
  const geojson = { type: 'Point', coordinates: [lng, lat] }
  console.log(geojson)
})

document.getElementById('search')
  .addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      search(e.target.value)
        .then(({ lat, lon }) => {
          map.flyTo([lat, lon], 15)
          e.target.value = ''
        })
    }
  })
