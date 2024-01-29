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

/*

Example plot data that defines the polygons within our map.

{
  "local_id": 7918,
  "buildable_area": 8,
  "position": {
    "left": 230352,
    "top": 152320,
    "right": 230480,
    "bottom": 152448
  },
  "biome": "TheFey",
  "region_display_tag": "TheFey"
},
{
  "local_id": 7919,
  "buildable_area": 8,
  "position": {
    "left": 165536,
    "top": 247536,
    "right": 165664,
    "bottom": 247664
  },
  "biome": "TheGreenGrove",
  "region_display_tag": "TheGreenGrove"
},

*/

export interface Plot {
  local_id: number
  buildable_area: number
  position: PlotPosition
  biome: string
  region_display_tag: string
}
