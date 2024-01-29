import React from 'react'
import {
  MapContainer,
  TileLayer,
  Polygon,
  useMap,
  Rectangle,
} from 'react-leaflet'
import {
  createTileLayerComponent,
  createElementObject,
  updateGridLayer,
  useLeafletContext,
  createControlComponent,
} from '@react-leaflet/core'

import 'leaflet/dist/leaflet.css'
import L, { LatLngBoundsExpression, LatLngTuple } from 'leaflet'
import { MapTile, Plot } from './types'
import { CustomTileLayer } from './GDALTile'
import MapInfo, {
  MapInfoComponent,
  createMapInfoControl,
  useMapInfoControl,
} from './MapInfo'
import {
  calculateOffset,
  convertPixelCoordsToLatLng,
  pixelCoordsToLatLon,
} from './tileUtils'
import { useMapInfoControlScale } from './useMapInfoControl'

interface PlotMapProps {
  plots: Plot[]
  mapTiles: MapTile[]

  onPlotClick: (plot: Plot) => void
}

const purpleOptions = { color: 'purple' }

const PlotMap: React.FC<PlotMapProps> = ({ plots, mapTiles }) => {
  //   const position: LatLngTuple = [10 * 1000, 10 * 1000] // [0, 0] // Center of the map
  // const position: LatLngTuple = [0, 0] // [y, x] surprise!
  // const zoom = 1 // Initial zoom level

  // const position: LatLngTuple = [-200.4636, 95.6536] // [y, x] surprise!
  // const zoom = 11 // Initial zoom level

  const position: LatLngTuple = [-159.625, 123.25]
  const zoom = 2 // Initial zoom level

  const bounds: LatLngBoundsExpression = [
    [0, 0],
    [416 * 1000, 344 * 1000], // this is in gridData pass a prop
  ] // Map bounds based on maxX and maxY

  // Converts pixel position to LatLng
  const pixelToLatLng = (x, y) => {
    return [y, x]
  }

  console.log('foo bar', { position, zoom, plots })

  // const MapInfoControl = createControlComponent(createMapInfoControl)

  const rectangle: any = [
    [position[0], position[1]],
    [position[0] + 0.1, position[1] + 0.1],
  ]

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: '100vh', width: '100%' }}
      whenReady={() => console.log('Map is ready')}
      crs={L.CRS.Simple} // Using simple Cartesian coordinate system
      // maxBounds={bounds} // Restricting panning to within the map bounds
    >
      {/* {plotPolygons} */}
      <Plots plots={plots} />
      <Rectangle bounds={rectangle} pathOptions={purpleOptions} />

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
      {/* <MapInfoControl /> */}
      {/* <MapInfo /> */}
    </MapContainer>
  )
}

export default PlotMap

const Plots = ({ plots }) => {
  // let plts = plots.filter((plot) => plot.local_id === 7471)
  let plts = plots
  const onPlotClick = (plot: Plot, positions: any, i: number) => {
    console.log('clicked', plot, positions, i)
  }

  console.log('offset', calculateOffset(344000.0, 11))

  // const { scale, yOffset, xOffset } = useMapInfoControlScale()
  console.log('plots')
  const scale = 199
  const yOffset = 115500
  const xOffset = 3400

  const plotPolygons = plts.map((plot, i) => {
    // console.log({ plot })
    // const positions = pixelCoordsToLatLon(plot, scale, yOffset, xOffset)
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
