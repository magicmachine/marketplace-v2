import { useCollections } from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import { Head } from 'components/Head'
import Layout from 'components/Layout'
import CollectionsTimeDropdown, {
  CollectionsSortingOption,
} from 'components/common/CollectionsTimeDropdown'
import { Box, Flex, Text } from 'components/primitives'
import { CollectionRankingsTable } from 'components/rankings/CollectionRankingsTable'
import { useMounted } from 'hooks'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import supportedChains, { DefaultChain } from 'utils/chains'
import fetcher from 'utils/fetcher'
import { NORMALIZE_ROYALTIES } from '../../../_app'
import LoadingSpinner from 'components/common/LoadingSpinner'
import { set } from 'lodash'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const useBatchCollections = () => {}

const IndexPage: NextPage<Props> = ({ ssr }) => {
  const isSSR = typeof window === 'undefined'
  const isMounted = useMounted()
  const compactToggleNames = useMediaQuery({ query: '(max-width: 800px)' })
  const [sortByTime, setSortByTime] =
    useState<CollectionsSortingOption>('30DayVolume')

  const [collections, setCollections] = useState<
    ReturnType<typeof useCollections>['data']
  >([])

  const [isFetchingPage, setIsFetchingPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setCollections([])
      setIsFetchingPage(true);

      let _collections: ReturnType<typeof useCollections>['data'] = []
      for (let i = 0; i < supportedChains.length; i++) {
        const chain = supportedChains[i]
        const collectionQuery: paths['/collections/v7']['get']['parameters']['query'] =
          {
            sortBy: sortByTime,
            normalizeRoyalties: NORMALIZE_ROYALTIES,
            limit: 20,
          }

        if (chain.collectionSetId) {
          collectionQuery.collectionsSetId = chain.collectionSetId
        } else if (chain.community) {
          collectionQuery.community = chain.community
        }
        const response = await fetcher(
          `${chain.reservoirBaseUrl}/collections/v7`,
          collectionQuery,
          {
            headers: {
              'x-api-key': process.env.RESERVOIR_API_KEY || '',
            },
          }
        )

        _collections.push(...response.data.collections)
      }

      setCollections(_collections)
      setIsFetchingPage(false);
    }

    fetchData()
  }, [sortByTime])

  console.log('Collections:', collections)

  let volumeKey: ComponentPropsWithoutRef<
    typeof CollectionRankingsTable
  >['volumeKey'] = 'allTime'

  switch (sortByTime) {
    case '1DayVolume':
      volumeKey = '1day'
      break
    case '7DayVolume':
      volumeKey = '7day'
      break
    case '30DayVolume':
      volumeKey = '30day'
      break
  }

  return (
    <Layout>
      <Head />
      <Box
        css={{
          p: 24,
          height: '100%',
          '@bp800': {
            p: '$5',
          },

          '@xl': {
            px: '$6',
          },
        }}
      >
        <Flex direction="column">
          <Flex
            justify="between"
            align="start"
            css={{
              flexDirection: 'column',
              gap: 24,
              mb: '$4',
              '@bp800': {
                alignItems: 'center',
                flexDirection: 'row',
              },
            }}
          >
            <Text style="h4" as="h4">
              Collections
            </Text>
            <Flex align="center" css={{ gap: '$4' }}>
              <CollectionsTimeDropdown
                compact={compactToggleNames && isMounted}
                option={sortByTime}
                onOptionSelected={(option) => {
                  setSortByTime(option)
                }}
              />
              {/* <ChainToggle /> */}
            </Flex>
          </Flex>
          {isSSR || !isMounted ? null : (
            <CollectionRankingsTable
              collections={collections}
              volumeKey={volumeKey}
              loading={isFetchingPage}
            />
          )}
          {/* <Box
            ref={loadMoreRef}
            css={{
              display: isFetchingPage ? 'none' : 'block',
            }}
          ></Box> */}
        </Flex>
        {(isFetchingPage ) && (
          <Flex align="center" justify="center" css={{ py: '$4' }}>
            <LoadingSpinner />
          </Flex>
        )}
      </Box>
    </Layout>
  )
}

type CollectionSchema =
  paths['/collections/v7']['get']['responses']['200']['schema']

export const getServerSideProps: GetServerSideProps<{
  ssr: {
    collection: CollectionSchema
  }
}> = async ({ res, params }) => {
  const collectionQuery: paths['/collections/v7']['get']['parameters']['query'] =
    {
      sortBy: '1DayVolume',
      normalizeRoyalties: NORMALIZE_ROYALTIES,
      limit: 20,
    }
  const chainPrefix = params?.chain || ''
  const chain =
    supportedChains.find((chain) => chain.routePrefix === chainPrefix) ||
    DefaultChain
  const query = { ...collectionQuery }
  if (chain.collectionSetId) {
    query.collectionsSetId = chain.collectionSetId
  } else if (chain.community) {
    query.community = chain.community
  }
  const response = await fetcher(
    `${chain.reservoirBaseUrl}/collections/v7`,
    query,
    {
      headers: {
        'x-api-key': process.env.RESERVOIR_API_KEY || '',
      },
    }
  )

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=60'
  )

  return {
    props: { ssr: { collection: response.data } },
  }
}

export default IndexPage
