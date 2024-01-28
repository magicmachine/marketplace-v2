import FullMap from 'public/maps/runiverse-sketch/FullMap.world.json'
import plots from 'public/maps/runiverse-sketch/plots_v1.json'
import { GridData, Plot } from './types'

function processGridData(gridData: GridData) {
  let totalWidth = 0
  let totalHeight = 0
  let columnCount = 0
  let rowCount = 0

  gridData.maps.forEach((tile) => {
    totalWidth = Math.max(totalWidth, tile.x + tile.width)
    totalHeight = Math.max(totalHeight, tile.y + tile.height)
  })

  // Assuming all tiles have the same dimensions
  if (gridData.maps.length > 0) {
    const firstTile = gridData.maps[0]
    columnCount = totalWidth / firstTile.width
    rowCount = totalHeight / firstTile.height
  }

  return {
    grid: gridData,
    totalWidth,
    totalHeight,
    columnCount,
    rowCount,
  }
}

export const gridData = processGridData(FullMap as GridData)

export const plotData = (plots as Plot[]).sort(
  (a, b) => a.local_id - b.local_id
)
