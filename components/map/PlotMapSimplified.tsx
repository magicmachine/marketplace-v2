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

// Custom TileLayer
class CustomTileLayerClass extends L.TileLayer {
  private mapTiles: MapTile[]

  constructor(mapTiles: MapTile[], options?: L.TileLayerOptions) {
    super('', {
      ...options,
      //   minX: 0,
      //   minY: 0,
    })
    this.mapTiles = mapTiles
  }

  getTileUrl(coords: L.Coords): string {
    const maxNativeZoom = 18
    const tileSize = 8000
    const scale = Math.pow(2, maxNativeZoom - coords.z)
    const adjustedX = coords.x * scale * tileSize
    const adjustedY = coords.y * scale * tileSize

    const tile = this.mapTiles.find(
      (t) =>
        adjustedX >= t.x &&
        adjustedX < t.x + t.width &&
        adjustedY >= t.y &&
        adjustedY < t.y + t.height
    )

    const tileFileName = tile ? tile.fileName.replace('.json', '.png') : ''

    const tileUrl = tile ? `/maps/runiverse-sketch/${tileFileName}` : ''
    console.log('getTileUrl', {
      //   coords,
      x: coords.x,
      y: coords.y,
      z: coords.z,
      adjustedX,
      adjustedY,
      tile,
      tileUrl,
    })
    return tileUrl
  }
}

const createCustomTileLayer = (
  { mapTiles }: { mapTiles: MapTile[] },
  context: any
) => {
  console.log('this is called', { mapTiles, context })
  const tileLayer = new CustomTileLayerClass(mapTiles, {
    maxNativeZoom: 18,
    maxZoom: 20,
  })
  return createElementObject(tileLayer, context)
}

const CustomTileLayer = createTileLayerComponent(
  createCustomTileLayer,
  (layer: any, props: any, prevProps: any) => {
    console.log('updateGridLayer', { layer, props })
    updateGridLayer(layer, props, prevProps)

    if (props.params != null && props.params !== prevProps.params) {
      layer.setParams(props.params)
    }
  }
)

const PlotMap: React.FC<PlotMapProps> = ({ plots, mapTiles, onPlotClick }) => {
  //   const position: LatLngTuple = [10 * 1000, 10 * 1000] // [0, 0] // Center of the map
  const position: LatLngTuple = [0, 32000] // [y, x] surprise!
  const zoom = 18 // Initial zoom level
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
      maxBounds={bounds} // Restricting panning to within the map bounds
    >
      <CustomTileLayer mapTiles={mapTiles} />
      {plotPolygons}
    </MapContainer>
  )
}

export default PlotMap
