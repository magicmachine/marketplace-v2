import { useState, useEffect } from 'react'
import { demoProperties } from './testData'

const usePlotsMarket = () => {
  const [plots, setPlots] = useState([])

  return { plots: demoProperties }
}

export default usePlotsMarket
