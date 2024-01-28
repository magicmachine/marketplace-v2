// https://github.com/tehamalab/gdal2tiles/blob/master/gdal2tiles/gdal2tiles.py

// Constants for the Global Mercator (Spherical Mercator)
const tileSize = 256
const initialResolution = (2 * Math.PI * 6378137) / tileSize
const originShift = (2 * Math.PI * 6378137) / 2.0

// Convert pixels to meters at a given zoom level
export function pixelsToMeters(px, py, zoom) {
  const resolution = initialResolution / 2 ** zoom
  const mx = px * resolution // Removed originShift because we're not using it for offset
  const my = py * resolution // Removed originShift because we're not using it for offset
  return [mx, my]
}

// Convert meters to lat/lon
export function metersToLatLon(mx, my) {
  const lon = (mx / originShift) * 180.0
  let lat = (my / originShift) * 180.0
  lat =
    (180 / Math.PI) *
    (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2)
  return [lat, lon]
}

// guild hall
// -196.2512 118.3982

// export function pixelCoordsToLatLon(plot, zoom) {
//   // Assuming these are correctly implemented elsewhere
//   const [leftMx, topMy] = pixelsToMeters(
//     plot.position.left,
//     plot.position.top,
//     zoom
//   )
//   const [rightMx, bottomMy] = pixelsToMeters(
//     plot.position.right,
//     plot.position.bottom,
//     zoom
//   )

//   // Assuming the midpoint of the y extent for EPSG:3857, which is roughly 0 at the equator for this projection
//   // This is a simplification and might need adjustment based on your specific map setup
//   const midPointY = 0

//   // Manually invert the y-coordinate by subtracting from the midpoint
//   const invertedTopY = midPointY - (topMy - midPointY)
//   const invertedBottomY = midPointY - (bottomMy - midPointY)

//   // Convert the manually inverted y-coordinates back to lat/lon
//   const topLeftLatLon = metersToLatLon(leftMx, invertedTopY)
//   const bottomRightLatLon = metersToLatLon(rightMx, invertedBottomY)

//   return [
//     topLeftLatLon,
//     [topLeftLatLon[0], bottomRightLatLon[1]],
//     bottomRightLatLon,
//     [bottomRightLatLon[0], topLeftLatLon[1]],
//   ]
// }

export interface PlotPosition {
  left: number
  top: number
  right: number
  bottom: number
}

// Convert plot pixel coordinates to lat-lng using GlobalMercator logic
// export function pixelCoordsToLatLon(
//   plotPosition: PlotPosition,
//   zoom: number
// ): [number, number][] {
//   const globalMercator = new GlobalMercator()
//   // Convert each corner of the plot from pixel coordinates to meters
//   const metersBL = globalMercator.PixelsToMeters(
//     plotPosition.left,
//     plotPosition.bottom,
//     zoom
//   )
//   const metersTR = globalMercator.PixelsToMeters(
//     plotPosition.right,
//     plotPosition.top,
//     zoom
//   )

//   // Convert from meters to lat-lng coordinates
//   const latLngBL = globalMercator.MetersToLatLon(metersBL[0], metersBL[1])
//   const latLngTR = globalMercator.MetersToLatLon(metersTR[0], metersTR[1])

//   // Assuming a rectangular plot, generate the other two corners based on the bottom-left and top-right
//   const latLngBR = globalMercator.MetersToLatLon(metersTR[0], metersBL[1])
//   const latLngTL = globalMercator.MetersToLatLon(metersBL[0], metersTR[1])

//   // Return an array of lat-lng pairs for each corner of the rectangle
//   return [latLngBL, latLngBR, latLngTR, latLngTL]
// }

// class GlobalMercator {
//   tileSize: number
//   initialResolution: number
//   originShift: number

//   constructor(tileSize: number = 256) {
//     this.tileSize = tileSize
//     this.initialResolution = (2 * Math.PI * 6378137) / this.tileSize
//     this.originShift = (2 * Math.PI * 6378137) / 2.0
//   }

//   LatLonToMeters(lat: number, lon: number): [number, number] {
//     let mx = (lon * this.originShift) / 180.0
//     let my =
//       Math.log(Math.tan(((90 + lat) * Math.PI) / 360.0)) / (Math.PI / 180.0)
//     my = (my * this.originShift) / 180.0
//     return [mx, my]
//   }

//   MetersToLatLon(mx: number, my: number): [number, number] {
//     let lon = (mx / this.originShift) * 180.0
//     let lat = (my / this.originShift) * 180.0
//     lat =
//       (180 / Math.PI) *
//       (2 * Math.atan(Math.exp((lat * Math.PI) / 180.0)) - Math.PI / 2.0)
//     return [lat, lon]
//   }

//   PixelsToMeters(px: number, py: number, zoom: number): [number, number] {
//     const res = this.Resolution(zoom)
//     const mx = px * res - this.originShift
//     const my = py * res - this.originShift
//     return [mx, my]
//   }

//   MetersToPixels(mx: number, my: number, zoom: number): [number, number] {
//     const res = this.Resolution(zoom)
//     const px = (mx + this.originShift) / res
//     const py = (my + this.originShift) / res
//     return [px, py]
//   }

//   Resolution(zoom: number): number {
//     return this.initialResolution / 2 ** zoom
//   }

//   PixelsToTile(px: number, py: number): [number, number] {
//     const tx = Math.ceil(px / this.tileSize) - 1
//     const ty = Math.ceil(py / this.tileSize) - 1
//     return [tx, ty]
//   }

//   TileBounds(
//     tx: number,
//     ty: number,
//     zoom: number
//   ): [number, number, number, number] {
//     const minPoint = this.PixelsToMeters(
//       tx * this.tileSize,
//       ty * this.tileSize,
//       zoom
//     )
//     const maxPoint = this.PixelsToMeters(
//       (tx + 1) * this.tileSize,
//       (ty + 1) * this.tileSize,
//       zoom
//     )
//     return [minPoint[0], minPoint[1], maxPoint[0], maxPoint[1]]
//   }

//   TileLatLonBounds(
//     tx: number,
//     ty: number,
//     zoom: number
//   ): [number, number, number, number] {
//     const bounds = this.TileBounds(tx, ty, zoom)
//     const minLatLon = this.MetersToLatLon(bounds[0], bounds[1])
//     const maxLatLon = this.MetersToLatLon(bounds[2], bounds[3])
//     return [minLatLon[0], minLatLon[1], maxLatLon[0], maxLatLon[1]]
//   }
// }

// Convert plot pixel positions to Leaflet coordinates directly
export function pixelCoordsToLatLon(plot, zoom) {
  const scale = 1 / 200
  const imageWidth = 416000 * scale // Full map width in pixels at zoom level 12
  const imageHeight = 344000 * scale // Full map height in pixels at zoom level 12

  const yOffset = 100000
  const xOffset = 0

  // Apply offsets and then normalize pixel positions to [0, 1] range and invert Y-axis
  const topLeft = [
    1 - (plot.position.top + yOffset) / imageHeight,
    (plot.position.left + xOffset) / imageWidth,
  ]
  const bottomRight = [
    1 - (plot.position.bottom + yOffset) / imageHeight,
    (plot.position.right + xOffset) / imageWidth,
  ]

  // Return coordinates for Leaflet Polygon, ensuring the Y-axis inversion is applied
  return [
    [bottomRight[0], topLeft[1]], // Now Bottom Left
    [bottomRight[0], bottomRight[1]], // Now Bottom Right
    [topLeft[0], bottomRight[1]], // Now Top Right
    [topLeft[0], topLeft[1]], // Now Top Left
  ]
}
