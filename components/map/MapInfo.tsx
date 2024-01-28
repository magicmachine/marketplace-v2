import React, { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'
import L from 'leaflet'

const MapInfo = () => {
  const map = useMap()
  const [info, setInfo] = useState({
    zoom: map.getZoom(),
    lat: map.getCenter().lat,
    lng: map.getCenter().lng,
  })

  useEffect(() => {
    const updateInfo = () => {
      setInfo({
        zoom: map.getZoom(),
        lat: map.getCenter().lat,
        lng: map.getCenter().lng,
      })
    }

    map.on('moveend', updateInfo)
    map.on('zoomend', updateInfo)

    return () => {
      map.off('moveend', updateInfo)
      map.off('zoomend', updateInfo)
    }
  }, [map])

  // Optional: Convert lat/lng to tile coordinates (x, y) at the current zoom level
  // Note: This conversion is a simple example and might need adjustments for your use case
  const latLngToTileCoords = (lat, lng, zoom) => {
    const x = Math.floor(((lng + 180) / 360) * Math.pow(2, zoom))
    const y = Math.floor(
      ((1 -
        Math.log(
          Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
        ) /
          Math.PI) /
        2) *
        Math.pow(2, zoom)
    )
    return { x, y }
  }

  const { x, y } = latLngToTileCoords(info.lat, info.lng, info.zoom)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: '10px',
        background: 'white',
        color: 'black',
        zIndex: 100,
      }}
    >
      Zoom: {info.zoom} <br />
      Lat: {info.lat.toFixed(4)}, Lng: {info.lng.toFixed(4)} <br />
      Tile X: {x}, Tile Y: {y}
    </div>
  )
}

export default MapInfo

// export const createMapInfoControl = () => {
//   return L.Control.extend({
//     onAdd: (map) => {
//       const container = L.DomUtil.create('div', 'leaflet-bar')
//       container.style.backgroundColor = 'white'
//       container.style.padding = '6px'
//       container.style.margin = '5px'

//       function updateInfo() {
//         container.innerHTML = `Zoom: ${map.getZoom()} <br />
//           Lat: ${map.getCenter().lat.toFixed(4)}, Lng: ${map
//           .getCenter()
//           .lng.toFixed(4)}`
//       }

//       map.on('moveend', updateInfo)
//       map.on('zoomend', updateInfo)
//       updateInfo()

//       return container
//     },
//   })
// }

// export const MapInfoControl = createControlComponent(createMapInfoControl)

export const useMapInfoControl = () => {
  const map = useMap()

  useEffect(() => {
    const controlContainer = L.DomUtil.create('div', 'leaflet-control')
    controlContainer.style.position = 'absolute'
    controlContainer.style.bottom = '10px'
    controlContainer.style.left = '10px'
    controlContainer.style.padding = '6px 10px'
    controlContainer.style.backgroundColor = 'white'
    controlContainer.style.color = 'black'
    controlContainer.style.border = '1px solid #ddd'
    controlContainer.style.borderRadius = '4px'
    controlContainer.style.zIndex = '1000' // Ensure it is above map tiles

    const updateInfo = () => {
      const zoom = map.getZoom()
      const center = map.getCenter()
      controlContainer.innerHTML = `Zoom: ${zoom} <br>Lat: ${center.lat.toFixed(
        4
      )}, Lng: ${center.lng.toFixed(4)}`
    }

    updateInfo() // Initial update

    map.on('move', updateInfo)
    map.on('zoom', updateInfo)

    // Add the control manually since we're not using Leaflet's control mechanism
    map.getContainer().appendChild(controlContainer)

    return () => {
      // Cleanup
      map.off('move', updateInfo)
      map.off('zoom', updateInfo)
      if (controlContainer && controlContainer.parentNode) {
        controlContainer.parentNode.removeChild(controlContainer)
      }
    }
  }, [map]) // Ensure this effect runs only once when the map is initialized
}

export const MapInfoComponent = () => {
  useMapInfoControl()
  return <></>
}
