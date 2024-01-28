import React from 'react'
import L from 'leaflet'
import { createTileLayerComponent, updateGridLayer } from '@react-leaflet/core'
import 'leaflet/dist/leaflet.css'

class CustomTileLayerClass extends L.TileLayer {
  constructor(url, options = {}) {
    super(url, options)
  }

  getTileUrl(coords) {
    // Here we adjust the URL generation to account for Y-axis inversion.
    const y = this.options.tms ? coords.y : Math.pow(2, coords.z) - coords.y - 1
    return L.Util.template(
      this._url,
      L.extend(
        {
          s: this._getSubdomain(coords),
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
const createCustomTileLayer = (props, context) => {
  const { url, options } = props
  const instance = new CustomTileLayerClass(url, options)
  return { instance, context }
}

// The update function for handling prop changes.
const updateCustomTileLayer = (instance, props, prevProps) => {
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
