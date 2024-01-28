import React from 'react'
import L, { TileLayerOptions, Coords, GridLayer, Layer } from 'leaflet'
import {
  createTileLayerComponent,
  updateGridLayer,
  LeafletContext,
  LayerProps,
} from '@react-leaflet/core'
import 'leaflet/dist/leaflet.css'

interface CustomTileLayerProps extends LayerProps {
  url: string
  options?: TileLayerOptions
}

class CustomTileLayerClass extends L.TileLayer {
  constructor(url: string, options: TileLayerOptions = {}) {
    super(url, options)
  }

  getTileUrl(coords: Coords) {
    // Here we adjust the URL generation to account for Y-axis inversion.
    const y = this.options.tms ? coords.y : Math.pow(2, coords.z) - coords.y - 1
    return L.Util.template(
      (this as any)._url,
      L.extend(
        {
          s: (this as any)._getSubdomain(coords),
          x: coords.x,
          y: y,
          z: coords.z,
        },
        this.options
      )
    )
  }
}

// The create function for integrating with React-Leaflet's custom component system.
const createCustomTileLayer = (props: CustomTileLayerProps, context: any) => {
  const { url, options } = props
  const instance = new CustomTileLayerClass(url, options)
  return { instance, context }
}

// The update function for handling prop changes.
const updateCustomTileLayer = (
  instance: GridLayer,
  props: CustomTileLayerProps,
  prevProps: CustomTileLayerProps
) => {
  // Here, you would handle any dynamic updates to your custom tile layer.
  // For example, updating options that might change after initial render.
  // This is where you could extend functionality if needed.
  updateGridLayer(instance, props, prevProps)
}

// Creating the React component for the custom tile layer.
export const CustomTileLayer = createTileLayerComponent(
  createCustomTileLayer,
  updateCustomTileLayer
)
