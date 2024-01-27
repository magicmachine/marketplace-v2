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
import { MapTile } from './types'

export class CustomTileLayerClass extends L.TileLayer {
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

export const CustomTileLayer = createTileLayerComponent(
  createCustomTileLayer,
  (layer: any, props: any, prevProps: any) => {
    console.log('updateGridLayer', { layer, props })
    updateGridLayer(layer, props, prevProps)

    if (props.params != null && props.params !== prevProps.params) {
      layer.setParams(props.params)
    }
  }
)
