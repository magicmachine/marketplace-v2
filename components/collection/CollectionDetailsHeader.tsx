import React from 'react'
import { Flex, Box, Text } from 'components/primitives'
import Img from 'components/primitives/Img'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCube,
  faCog,
  faGlobe,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'
import { truncateAddress } from 'utils/truncate'
import { OpenSeaVerified } from 'components/common/OpenSeaVerified'
import CopyText from 'components/common/CopyText'
import optimizeImage from 'utils/optimizeImage'
import { useMediaQuery } from 'react-responsive'

import { useChainCurrency, useMounted } from 'hooks'

interface CollectionDetailsProps {
  collection: any // replace with the correct type
  contractKind: string | undefined
  chainName: string
  mintData: any // replace with the correct type
}

const CollectionDetailsHeader: React.FC<CollectionDetailsProps> = ({
  collection,
  contractKind,
  chainName,
  mintData,
}) => {
  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 905 }) && isMounted

  return (
    <Flex
      direction="column"
      css={{
        gap: '$4',
        minWidth: 0,
        width: '100%',
        '@lg': { width: 'unset' },
      }}
    >
      <Flex css={{ gap: '$4', flex: 1 }} align="center">
        <Img
          src={optimizeImage(collection.image!, 72 * 2)}
          width={72}
          height={72}
          css={{
            width: 72,
            height: 72,
            borderRadius: 8,
            objectFit: 'cover',
            border: '1px solid $gray5',
          }}
          alt="Collection Page Image"
        />
        <Box css={{ minWidth: 0 }}>
          <Flex align="center" css={{ gap: '$1', mb: 0 }}>
            <Text style="h4" as="h6" ellipsify>
              {collection.name}
            </Text>
            <OpenSeaVerified
              openseaVerificationStatus={collection?.openseaVerificationStatus}
            />
          </Flex>
          <Flex
            css={{
              gap: '$3',
              ...(isSmallDevice && {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }),
            }}
            align="center"
          >
            <CopyText
              text={collection.id as string}
              css={{
                width: 'max-content',
                display: 'flex',
                alignItems: 'center',
                gap: '$1',
              }}
            >
              <Box css={{ color: '$gray9' }}>
                <FontAwesomeIcon icon={faCube} size="xs" />
              </Box>
              <Text as="p" style="body3">
                {truncateAddress(collection?.primaryContract || '')}
              </Text>
            </CopyText>
            <Flex
              align="center"
              css={{
                gap: '$1',
              }}
            >
              <Flex
                css={{
                  color: '$gray9',
                }}
              >
                <FontAwesomeIcon size="xs" icon={faCog} />
              </Flex>
              <Text style="body3">{contractKind}</Text>
            </Flex>
            <Flex
              align="center"
              css={{
                gap: '$1',
              }}
            >
              <Flex
                css={{
                  color: '$gray9',
                }}
              >
                <FontAwesomeIcon size="xs" icon={faGlobe} />
              </Flex>
              <Text style="body3">{chainName}</Text>
            </Flex>
            {mintData && (
              <Flex
                align="center"
                css={{
                  gap: '$1',
                }}
              >
                <Flex
                  css={{
                    color: '$green9',
                  }}
                >
                  <FontAwesomeIcon size="xs" icon={faSeedling} />
                </Flex>
                <Text style="body3">Minting Now</Text>
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export default CollectionDetailsHeader
