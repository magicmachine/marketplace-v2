import React, { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

export const useMapInfoControlScale = () => {
  const map = useMap()

  // State for scale, yOffset, xOffset
  const [scale, setScale] = useState(1)
  const [yOffset, setYOffset] = useState(0)
  const [xOffset, setXOffset] = useState(0)

  useEffect(() => {
    const controlContainer = L.DomUtil.create(
      'div',
      'leaflet-control custom-control'
    )
    controlContainer.style.position = 'absolute'
    controlContainer.style.top = '10px'
    controlContainer.style.right = '10px'
    controlContainer.style.padding = '6px 10px'
    controlContainer.style.backgroundColor = 'white'
    controlContainer.style.color = 'black'
    controlContainer.style.border = '1px solid #ddd'
    controlContainer.style.borderRadius = '4px'
    controlContainer.style.zIndex = '4000' // Ensure it is above other map controls

    // Sliders for scale, yOffset, xOffset
    const scaleSlider = L.DomUtil.create('input', '', controlContainer)
    scaleSlider.type = 'range'
    scaleSlider.min = '1'
    scaleSlider.max = '300'
    scaleSlider.step = '0.1'
    scaleSlider.value = scale
    scaleSlider.oninput = (e) => setScale(e.target.value)

    const yOffsetSlider = L.DomUtil.create('input', '', controlContainer)
    yOffsetSlider.type = 'range'
    yOffsetSlider.min = '0'
    yOffsetSlider.max = '300000'
    yOffsetSlider.step = '1'
    yOffsetSlider.value = yOffset
    yOffsetSlider.oninput = (e) => {
      const value = Number(e.target.value)
      console.log({ value })
      if (!isNaN(value)) {
        setYOffset(value)
      }
    }

    const xOffsetSlider = L.DomUtil.create('input', '', controlContainer)
    xOffsetSlider.type = 'range'
    xOffsetSlider.min = '-100000'
    xOffsetSlider.max = '100000'
    xOffsetSlider.step = '1'
    xOffsetSlider.value = xOffset
    xOffsetSlider.oninput = (e) => {
      const value = Number(e.target.value)
      console.log({ value })
      if (!isNaN(value)) {
        setXOffset(value)
      }
    }

    // Display for scale, yOffset, xOffset
    const displayInfo = L.DomUtil.create('div', '', controlContainer)
    const updateDisplayInfo = () => {
      displayInfo.innerHTML = `Scale: ${scale}, Y Offset: ${yOffset}, X Offset: ${xOffset}`
    }
    updateDisplayInfo()

    // Update display info when states change
    map.on('move', updateDisplayInfo)
    map.on('zoom', updateDisplayInfo)

    // Add the control manually
    map.getContainer().appendChild(controlContainer)

    // Cleanup
    return () => {
      map.off('move', updateDisplayInfo)
      map.off('zoom', updateDisplayInfo)
      if (controlContainer && controlContainer.parentNode) {
        controlContainer.parentNode.removeChild(controlContainer)
      }
    }
  }, [map, scale, yOffset, xOffset]) // Dependency array includes state variables to update UI on change

  // Expose state values for external use
  return { scale, yOffset, xOffset }
}
