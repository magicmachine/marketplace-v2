import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Flex, Text } from 'components/primitives'
import React, { useState } from 'react'

import { CollectionOffer } from 'components/buttons'
import { FormatCrypto } from 'components/primitives'

import { faHand } from '@fortawesome/free-solid-svg-icons'
import Mint from 'components/buttons/Mint'
import Sweep from 'components/buttons/Sweep'
import CollectionDetailsHeader from 'components/collection/CollectionDetailsHeader'
import { useRouter } from 'next/router'

import { useMediaQuery } from 'react-responsive'

import { useChainCurrency, useMounted } from 'hooks'

interface CollectionPageHeaderProps {
  collection: any // replace with the correct type
  contractKind: string | undefined
  chainName: string
  mintData: any // replace with the correct type
  mutate: any
}

const CollectionPageHeader: React.FC<CollectionPageHeaderProps> = ({
  collection,
  contractKind,
  chainName,
  mintData,
  mutate,
}) => {
  const router = useRouter()

  const [path, _] = router.asPath.split('?')
  const routerPath = path.split('/')
  let sweepSymbol = collection?.floorAsk?.price?.currency?.symbol
  let topBidPrice = collection?.topBid?.price?.amount?.native
  const isSweepRoute = routerPath[routerPath.length - 1] === 'sweep'
  const isMintRoute = routerPath[routerPath.length - 1] === 'mint'
  const sweepOpenState = useState(true)
  const mintOpenState = useState(true)
  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 905 }) && isMounted

  const mintPriceDecimal = mintData?.price?.amount?.decimal
  const mintCurrency = mintData?.price?.currency?.symbol?.toUpperCase()

  const mintPrice =
    typeof mintPriceDecimal === 'number' &&
    mintPriceDecimal !== null &&
    mintPriceDecimal !== undefined
      ? mintPriceDecimal === 0
        ? 'Free'
        : `${mintPriceDecimal} ${mintCurrency}`
      : undefined

  return (
    <Flex
      justify="between"
      wrap="wrap"
      css={{ mb: '$4', gap: '$4' }}
      align="start"
    >
      <CollectionDetailsHeader
        collection={collection}
        contractKind={contractKind}
        chainName={chainName}
        mintData={mintData}
      />
      <Flex align="center">
        <Flex css={{ alignItems: 'center', gap: '$3' }}>
          {collection?.floorAsk?.price?.amount?.raw && sweepSymbol ? (
            <Sweep
              collectionId={collection.id}
              openState={isSweepRoute ? sweepOpenState : undefined}
              buttonChildren={
                <Flex css={{ gap: '$2' }} align="center" justify="center">
                  <Text style="h6" as="h6" css={{ color: '$bg' }}>
                    Collect
                  </Text>
                  <Text
                    style="h6"
                    as="h6"
                    css={{ color: '$bg', fontWeight: 900 }}
                  >
                    <Flex
                      css={{
                        gap: '$1',
                      }}
                    >
                      <FormatCrypto
                        amount={collection?.floorAsk?.price?.amount?.raw}
                        decimals={
                          collection?.floorAsk?.price?.currency?.decimals
                        }
                        textStyle="h6"
                        css={{ color: '$bg', fontWeight: 900 }}
                        maximumFractionDigits={4}
                      />
                      {sweepSymbol}
                    </Flex>
                  </Text>
                </Flex>
              }
              buttonCss={{ '@lg': { order: 2 } }}
              mutate={mutate}
            />
          ) : null}
          {/* Collection Mint */}
          {mintData && mintPrice ? (
            <Mint
              collectionId={collection.id}
              openState={isMintRoute ? mintOpenState : undefined}
              buttonChildren={
                <Flex
                  css={{ gap: '$2', px: '$2' }}
                  align="center"
                  justify="center"
                >
                  {isSmallDevice && <FontAwesomeIcon icon={faSeedling} />}
                  {!isSmallDevice && (
                    <Text style="h6" as="h6" css={{ color: '$bg' }}>
                      Mint
                    </Text>
                  )}

                  {!isSmallDevice && (
                    <Text
                      style="h6"
                      as="h6"
                      css={{ color: '$bg', fontWeight: 900 }}
                    >
                      {`${mintPrice}`}
                    </Text>
                  )}
                </Flex>
              }
              buttonCss={{
                minWidth: 'max-content',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                flexGrow: 1,
                justifyContent: 'center',
                px: '$2',
                maxWidth: '220px',
                '@md': {
                  order: 1,
                },
              }}
              mutate={mutate}
            />
          ) : null}
          <CollectionOffer
            collection={collection}
            buttonChildren={<FontAwesomeIcon icon={faHand} />}
            buttonProps={{ color: mintData ? 'gray3' : 'primary' }}
            buttonCss={{ px: '$4' }}
            mutate={mutate}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CollectionPageHeader
