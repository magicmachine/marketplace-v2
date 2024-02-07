import React, { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { createControlComponent } from '@react-leaflet/core'
import L from 'leaflet'

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
    // Create separate elements for map center info and cursor info

    const mapCenterInfo = L.DomUtil.create('div', '', controlContainer)
    const cursorInfo = L.DomUtil.create('div', '', controlContainer)

    const updateMapCenterInfo = () => {
      const zoom = map.getZoom()
      const center = map.getCenter()
      mapCenterInfo.innerHTML = `Center - Zoom: ${zoom}, Lat: ${center.lat.toFixed(
        4
      )}, Lng: ${center.lng.toFixed(4)}`
    }

    const updateCursorInfo = (lat: number, lng: number) => {
      cursorInfo.innerHTML = `Cursor - Lat: ${lat.toFixed(
        4
      )}, Lng: ${lng.toFixed(4)}`
    }

    // Initial update for map center
    updateMapCenterInfo()

    // Event listeners for map and cursor updates
    map.on('moveend', updateMapCenterInfo)
    map.on('zoomend', updateMapCenterInfo)
    map.on('mousemove', (e) => {
      const { lat, lng } = e.latlng
      updateCursorInfo(lat, lng)
    })

    // map.on('move', updateInfo)
    // map.on('zoom', updateInfo)

    // Add the control manually since we're not using Leaflet's control mechanism
    map.getContainer().appendChild(controlContainer)

    return () => {
      // Cleanup
      map.off('moveend', updateMapCenterInfo)
      map.off('zoomend', updateMapCenterInfo)
      map.off('mousemove')
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
