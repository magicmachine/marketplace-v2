import React from 'react'
import { MapContainer, Polygon, Rectangle } from 'react-leaflet'

import L, { LatLngBoundsExpression, LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CustomTileLayer } from './GDALTile'
import { MapInfoComponent } from './MapInfo'
import { convertPixelCoordsToLatLng } from './tileUtils'
import { MapTile, Plot } from './types'

interface PlotMapProps {
  plots: Plot[]
  mapTiles: MapTile[]

  onPlotClick: (plot: Plot) => void
}

const purpleOptions = { color: 'purple' }

const PlotMap: React.FC<PlotMapProps> = ({ plots, mapTiles }) => {
  const position: LatLngTuple = [-159.625, 123.25]
  const zoom = 2 // Initial zoom level

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
      // maxBounds={bounds} // Restricting panning to within the map bounds
    >
      <Plots plots={plots} />

      <Rectangle
        bounds={[
          [0, 0],
          [10, 10],
        ]}
        pathOptions={{ color: 'green' }}
      />

      <Rectangle
        bounds={[
          [-256, 256],
          [-256 - 10, 256 + 10],
        ]}
        pathOptions={{ color: 'green' }}
      />

      <CustomTileLayer url="/maps/mapchunks/{z}/{x}/{y}.png" />
      <MapInfoComponent />
    </MapContainer>
  )
}

export default PlotMap

const Plots = ({ plots }) => {
  let plts = plots
  const onPlotClick = (plot: Plot, positions: any, i: number) => {
    console.log('clicked', plot, positions, i)
  }

  console.log('plots')

  const plotPolygons = plts.map((plot, i) => {
    const positions = convertPixelCoordsToLatLng(plot.position, 11)

    return (
      <Polygon
        key={plot.local_id}
        pathOptions={purpleOptions}
        positions={positions as any}
        eventHandlers={{
          click: () => onPlotClick(plot, positions, i),
        }}
      />
    )
  })

  return <>{plotPolygons}</>
}
