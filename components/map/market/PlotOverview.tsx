import { NextPage } from 'next'
import { styled } from 'stitches.config'
import { Box, Flex, Text, Grid } from 'components/primitives'
import { Card } from 'components/primitives'
import TokenCard from 'components/collections/TokenCard'

const Container = styled(Card, {
  minHeight: '265px',
  position: 'relative',
  padding: 0,
  borderRadius: '4px',
  overflow: 'hidden',
})

const CardBody = styled('div', {
  display: 'grid',
  gridTemplateAreas: `
    "photo"
    "data"
    "flex"
  `,
  gridTemplateRows: '177px 1fr auto',
  height: '100%',
  padding: '0px',
  WebkitTapHighlightColor: 'transparent',
})

const CardPhotoWrapper = styled('div', {
  display: 'grid',
  gridArea: 'photo',
  gridTemplateAreas: `
    "photo-top"
    "photo-center"
    "photo-bottom"
  `,
  gridTemplateRows: 'auto 1fr auto',
  borderRadius: '4px',
})

const CardPhotoBody = styled('div', {
  gridArea: '1 / 1 / -1 / -1',
})
const StyledImg = styled('img', {
  objectFit: 'cover',
  width: '100%',
  height: '0px',
  minHeight: '100%',
})

const DataCard = styled('div', {
  padding: '8px',
  placeContent: 'start space-between',
  display: 'grid',
  gridArea: 'data',
  columnGap: '8px',
  gridTemplateAreas: `
    "title title actions"
    "body1 body1 body1"
    "body2 body2 body2"
    "body3 logo logo"
    "additionalInfo additionalInfo additionalInfo"
  `,
  gridTemplateColumns: '1fr min-content',
  WebkitBoxPack: 'justify',
})

const Title = styled('div', { gridArea: 'title' })
const Body1 = styled('div', { gridArea: 'body1' })
const Body2 = styled('div', { gridArea: 'body2' })

// actually this has to become a `TokenCard` component

// The property listing component
const PropertyListingOld: React.FC<{ property: any }> = ({ property }) => {
  return (
    <Container>
      <CardBody>
        <CardPhotoWrapper>
          <CardPhotoBody>
            <StyledImg
              src={property.imageUrl}
              alt={`Image of ${property.address}`}
            />
          </CardPhotoBody>
        </CardPhotoWrapper>
        <DataCard>
          <Title>
            <Text>{`0.84E`}</Text>
          </Title>
          <Body1>
            <Text style={{ gridArea: 'body1' }}>Biome: Desert</Text>
          </Body1>
          {/* <Body2>
            <Text style={{ gridArea: 'body2' }}>{property.address}</Text>
          </Body2> */}
        </DataCard>
      </CardBody>
    </Container>
  )
}
const PropertyListing: React.FC<{ property: any }> = ({ property }) => {
  return (
    <Container>
      <TokenCard token={property} aspectRatio={'3/2'} />
    </Container>
  )
}

export default PropertyListing
