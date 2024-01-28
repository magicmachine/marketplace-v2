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
import { CustomTileLayer } from './GDALTile'

interface PlotMapProps {
  plots: Plot[]
  mapTiles: MapTile[]

  onPlotClick: (plot: Plot) => void
}

// // Custom tile layer to handle GDAL generated tiles
// const CustomTileLayer = L.TileLayer.extend({
//   getTileUrl: function (coords: any) {
//     // Inverting the Y coordinate
//     const y = -coords.y - 1
//     return L.Util.template(
//       this._url,
//       L.extend(
//         {
//           s: this._getSubdomain(coords),
//           x: coords.x,
//           y: y,
//           z: coords.z,
//         },
//         this.options
//       )
//     )
//   },
// })

const PlotMap: React.FC<PlotMapProps> = ({ plots, mapTiles, onPlotClick }) => {
  //   const position: LatLngTuple = [10 * 1000, 10 * 1000] // [0, 0] // Center of the map
  const position: LatLngTuple = [0, 0] // [y, x] surprise!
  const zoom = 1 // Initial zoom level
  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [416 * 1000, 344 * 1000], // this is in gridData pass a prop
  ] // Map bounds based on maxX and maxY

  //   const mapRef = useMap()
  const plotPolygons = plots.map((plot) => {
    const positions = [
      [plot.position.top, plot.position.left],
      [plot.position.top, plot.position.right],
      [plot.position.bottom, plot.position.right],
      [plot.position.bottom, plot.position.left],
    ]

    return (
      <Polygon
        key={plot.local_id}
        positions={positions as any}
        eventHandlers={{
          click: () => onPlotClick(plot),
        }}
      />
    )
  })

  console.log('foo bar', { position, zoom })

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: '100vh', width: '100%' }}
      whenReady={() => console.log('Map is ready')}
      crs={L.CRS.Simple} // Using simple Cartesian coordinate system
      // maxBounds={bounds} // Restricting panning to within the map bounds
    >
      {/* <CustomTileLayer mapTiles={mapTiles} /> */}

      {/* {plotPolygons} */}
      {/* <TileLayer url="/maps/mapchunks/{z}/{x}/{y}.png" /> */}
      <CustomTileLayer url="/maps/mapchunks/{z}/{x}/{y}.png" />
    </MapContainer>
  )
}

export default PlotMap
