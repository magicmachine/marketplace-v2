import { NextPage } from 'next'
import { styled } from 'stitches.config'
import { Box, Flex, Text, Grid } from 'components/primitives'
import PropertyListing from './PlotOverview'
import CollectionPageComponent from '../../collection/CollectionPageComponent'
import { demoProperties, testCollection } from './testData'

const PlotListingsList: React.FC<{ properties: any[] }> = ({ properties }) => {
  const Header = styled('h2', {})
  const SearchPageListHeader = styled('div', {
    padding: '12px 20px',

    '@media screen and (min-width: 1007px)': {
      padding: '20px',
    },
  })

  const ResultsCount = styled('span', {
    // styles for the results count
  })
  const SortSection = styled('div', {
    // styles for the sort section
  })

  const ListingsGrid = styled(Grid, {
    display: 'grid',
    gap: '$4',
    marginBottom: '$6',
    gridTemplateColumns: 'repeat(auto-fill, minmax(286px, 1fr))',
    padding: '0px 10px',

    '@sm': {
      padding: '0px 20px',
    },
  })

  const ListingsScrollPanel = styled('div', {
    height: '90vh',
    overflowY: 'scroll',
  })

  return (
    <Box>
      {/* <SearchPageListHeader>
        <Header>Plots For Sale</Header>
        <ResultsCount>{`${properties.length} results`}</ResultsCount>
      </SearchPageListHeader>
      <SortSection></SortSection>
      <ListingsScrollPanel>
        <ListingsGrid>
          {properties.map((property) => (
            <PropertyListing key={property.id} property={property} />
          ))}
        </ListingsGrid>
      </ListingsScrollPanel> */}
      <ListingsScrollPanel>
        <CollectionPageComponent
          id={'0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42'}
          ssr={{
            collection: testCollection,
            tokens: demoProperties,
            hasAttributes: false,
          }}
          showHeader={false}
        />
      </ListingsScrollPanel>
    </Box>
  )
}

export default PlotListingsList
