// https://github.com/tehamalab/gdal2tiles/blob/master/gdal2tiles/gdal2tiles.py

// Constants for the Global Mercator (Spherical Mercator)
const tileSize = 256
const initialResolution = (2 * Math.PI * 6378137) / tileSize
const originShift = (2 * Math.PI * 6378137) / 2.0

// Adjust these based on the observed offset in meters
const offsetX = originShift * 1 // Example adjustment
const offsetY = originShift * 0 // Example adjustment

// Convert pixels to meters at a given zoom level
export function pixelsToMeters(px, py, zoom) {
  const resolution = initialResolution / 2 ** zoom
  const mx = px * resolution - originShift + offsetX
  const my = py * resolution - originShift + offsetY
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

// Convert pixel coordinates of a plot to lat/lon
// export function pixelCoordsToLatLon(plot, zoom) {
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

//   const topLeftLatLon = metersToLatLon(leftMx, topMy)
//   const bottomRightLatLon = metersToLatLon(rightMx, bottomMy)

//   return [
//     topLeftLatLon,
//     [topLeftLatLon[0], bottomRightLatLon[1]],
//     bottomRightLatLon,
//     [bottomRightLatLon[0], topLeftLatLon[1]],
//   ]
// }

// export function pixelCoordsToLatLon(plot, zoom) {
//   // Swap the top and bottom y-coordinates to "flip" vertically
//   const [leftMx, bottomMy] = pixelsToMeters(
//     plot.position.left,
//     plot.position.bottom, // Use bottom here
//     zoom
//   )
//   const [rightMx, topMy] = pixelsToMeters(
//     plot.position.right,
//     plot.position.top, // Use top here
//     zoom
//   )

//   const topLeftLatLon = metersToLatLon(leftMx, topMy) // Now represents the top left
//   const bottomRightLatLon = metersToLatLon(rightMx, bottomMy) // Now represents the bottom right

//   // The order of coordinates here assumes a clockwise definition starting from the top-left
//   return [
//     topLeftLatLon, // Now actually top left due to the flip
//     [bottomRightLatLon[0], topLeftLatLon[1]], // Top right
//     bottomRightLatLon, // Now actually bottom right due to the flip
//     [topLeftLatLon[0], bottomRightLatLon[1]], // Bottom left
//   ]
// }

// guild hall
// -196.2512 118.3982

export function pixelCoordsToLatLon(plot, zoom) {
  // Assuming these are correctly implemented elsewhere
  const [leftMx, topMy] = pixelsToMeters(
    plot.position.left,
    plot.position.top,
    zoom
  )
  const [rightMx, bottomMy] = pixelsToMeters(
    plot.position.right,
    plot.position.bottom,
    zoom
  )

  // Assuming the midpoint of the y extent for EPSG:3857, which is roughly 0 at the equator for this projection
  // This is a simplification and might need adjustment based on your specific map setup
  const midPointY = 0

  // Manually invert the y-coordinate by subtracting from the midpoint
  const invertedTopY = midPointY - (topMy - midPointY)
  const invertedBottomY = midPointY - (bottomMy - midPointY)

  // Convert the manually inverted y-coordinates back to lat/lon
  const topLeftLatLon = metersToLatLon(leftMx, invertedTopY)
  const bottomRightLatLon = metersToLatLon(rightMx, invertedBottomY)

  return [
    topLeftLatLon,
    [topLeftLatLon[0], bottomRightLatLon[1]],
    bottomRightLatLon,
    [bottomRightLatLon[0], topLeftLatLon[1]],
  ]
}
