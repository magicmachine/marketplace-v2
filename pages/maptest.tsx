import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import Box from 'components/primitives/Box'
import Flex from 'components/primitives/Flex'

import { gridData, plotData, Plot } from 'components/map'
import dynamic from 'next/dynamic'

const CustomMap = dynamic(() => import('components/map/CustomMap'), {
  ssr: false,
})
const MapPage: NextPage = () => {
  const router = useRouter()
  const { address: accountAddress, isConnected } = useAccount()
  //   console.log({ gridData, plotData })

  const handlePlotClick = (plot: Plot) => {
    console.log('Clicked plot:', plot)
  }
  return (
    <Flex>
      <CustomMap
      // mapTiles={gridData.grid.maps}
      // plots={plotData}
      // onPlotClick={handlePlotClick}
      />
    </Flex>
  )
}

export default MapPage
