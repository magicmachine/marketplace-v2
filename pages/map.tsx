import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import Box from 'components/primitives/Box'
import Flex from 'components/primitives/Flex'
import { styled } from 'stitches.config'
import Layout from 'components/Layout'
import { Head } from 'components/Head'
import { Text } from 'components/primitives'

import { gridData, plotData, Plot } from 'components/map'
import dynamic from 'next/dynamic'
import PlotListingsList from '../components/map/market/PlotsListingsList'
import usePlotsMarket from '../components/map/market/usePlotsMarket'

const PlotMap = dynamic(() => import('components/map/PlotMap'), { ssr: false })

const FilterBar = styled('div', {
  // Add styles for the filter bar here
})

const MainContent = styled('div', {})

const MapSection = styled('div', {
  position: 'relative',
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
})

const DetailsSection = styled('div', {
  // Base styles (mobile-first approach)
  flex: 'auto',
  width: '100%',
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden',

  '@bp1000': {
    flex: '0 0 375px',
    boxShadow: '-2px 2px 5px 0 rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },

  '@bp1300': {
    width: '750px',
    flex: '0 0 750px',
  },
})

interface RealEstatePageProps {}

const MapPage: NextPage<RealEstatePageProps> = (props) => {
  // State and functions can be added here
  const handlePlotClick = (plot: Plot) => {
    console.log('Clicked plot:', plot)
  }

  const { plots } = usePlotsMarket()

  return (
    <Layout>
      <Head />
      <FilterBar>{/* Filters will be added here */}</FilterBar>
      <MainContent>
        <Flex css={{ flexDirection: 'row-reverse' }}>
          <DetailsSection>
            <PlotListingsList properties={plots} />
          </DetailsSection>
          <MapSection>
            <PlotMap
              mapTiles={gridData.grid.maps}
              plots={plotData}
              onPlotClick={handlePlotClick}
            />
          </MapSection>
        </Flex>
      </MainContent>
    </Layout>
  )
}

export default MapPage
