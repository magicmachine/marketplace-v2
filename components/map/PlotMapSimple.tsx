import React from 'react'
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet'
import {
  createTileLayerComponent,
  createElementObject,
  updateGridLayer,
  useLeafletContext,
} from '@react-leaflet/core'

import 'leaflet/dist/leaflet.css'
import L, { LatLngBoundsExpression, LatLngTuple } from 'leaflet'
import { MapTile, Plot } from './types'

interface PlotMapProps {
  plots: Plot[]
  mapTiles: MapTile[]

  onPlotClick: (plot: Plot) => void
}

const PlotMap: React.FC<PlotMapProps> = ({ plots, mapTiles, onPlotClick }) => {
  //   const position: LatLngTuple = [10 * 1000, 10 * 1000] // [0, 0] // Center of the map
  const position: LatLngTuple = [0, 32000] // [y, x] surprise!
  const zoom = 1 // Initial zoom level
  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [416 * 1000, 344 * 1000], // this is in gridData pass a prop
  ] // Map bounds based on maxX and maxY

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: '100vh', width: '100%' }}
      whenReady={() => console.log('Map is ready')}
      crs={L.CRS.Simple} // Using simple Cartesian coordinate system
      maxBounds={bounds} // Restricting panning to within the map bounds
    >
      <TileLayer
        url="/maps/runiverse-sketch/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default PlotMap
