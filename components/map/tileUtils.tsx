// https://github.com/tehamalab/gdal2tiles/blob/master/gdal2tiles/gdal2tiles.py

import L, { LatLngBoundsExpression, LatLngTuple } from 'leaflet'
import { PlotPosition } from './types'
// Conversion function for pixel coordinates to Leaflet's coordinate system
export const convertPixelCoordsToLatLng = (
  position: PlotPosition,
  maxZoom: number // what you used for gdal2tile (minus 1?)
) => {
  // In L.CRS.Simple, Leaflet's coordinate system matches the pixel coordinates
  // No conversion is necessary, just mapping the positions correctly
  const topLeft = L.point(position.left, position.top)
  const bottomRight = L.point(position.right, position.bottom)

  // Convert points to LatLng
  const latLngTopLeft = L.CRS.Simple.pointToLatLng(topLeft, maxZoom)
  const latLngBottomRight = L.CRS.Simple.pointToLatLng(bottomRight, maxZoom)

  // the issue here is that gdal2tile snaps the tiles to bottom right, but
  // leaflet uses top-right. a smarter person would know how to calculate this
  // value numerically, i just plopped this magic value via trial and error
  const offset = -88.0315

  // Return the corners as an array of LatLng objects
  return [
    [latLngTopLeft.lat + offset, latLngTopLeft.lng],
    [latLngTopLeft.lat + offset, latLngBottomRight.lng],
    [latLngBottomRight.lat + offset, latLngBottomRight.lng],
    [latLngBottomRight.lat + offset, latLngTopLeft.lng],
  ]
}
