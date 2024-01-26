interface PlotPosition {
  left: number
  top: number
  right: number
  bottom: number
}

export interface Plot {
  local_id: number
  buildable_area: number
  position: PlotPosition
  biome: string
  region_display_tag: string
}

export type MapTile = {
  fileName: string
  height: number
  width: number
  x: number
  y: number
}

export type GridData = {
  maps: MapTile[]
}

export interface Plot {
  local_id: number
  buildable_area: number
  position: PlotPosition
  biome: string
  region_display_tag: string
}
