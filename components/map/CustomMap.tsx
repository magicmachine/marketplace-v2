import React from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom CRS
const CustomCRS = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  transformation: new L.Transformation(0.125, 0, -0.125, 0),
  scale: function (zoom) {
    return Math.pow(2, zoom)
  },
  zoom: function (scale) {
    return Math.log(scale) / Math.LN2
  },
  distance: function (latlng1, latlng2) {
    const dx = latlng2.lng - latlng1.lng
    const dy = latlng2.lat - latlng1.lat
    return Math.sqrt(dx * dx + dy * dy)
  },
  infinite: true,
})

const CustomTileLayer = ({ mapName }) => {
  const mapHeight = 2048
  const mapWidth = 2048

  // Convert the points to geographical coordinates
  const sw = L.latLng(0, mapHeight)
  const ne = L.latLng(mapWidth, 0)
  const layerBounds = new L.LatLngBounds(sw, ne)

  return (
    <TileLayer
      url={`http://tournament.realitymod.com/mapviewer/tiles/${mapName}/{z}/{x}/{y}.jpg`}
      minZoom={0}
      maxZoom={5}
      bounds={layerBounds}
      noWrap={true}
      attribution='<a href="http://tournament.realitymod.com/showthread.php?t=34254">Project Reality Tournament</a>'
    />
  )
}

const CustomMap = () => {
  const mapName = 'beirut' // Example map name

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: '100vh', width: '100%' }}
      crs={CustomCRS}
    >
      <CustomTileLayer mapName={mapName} />
    </MapContainer>
  )
}

export default CustomMap
