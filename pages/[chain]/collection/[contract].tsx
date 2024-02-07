import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import {
  Text,
  Flex,
  Box,
  Input,
  FormatCrypto,
  FormatCryptoCurrency,
} from '../../../components/primitives'
import {
  useCollections,
  useCollectionActivity,
  useDynamicTokens,
  useAttributes,
} from '@reservoir0x/reservoir-kit-ui'
import { paths } from '@reservoir0x/reservoir-sdk'
import Layout from 'components/Layout'
import { useEffect, useMemo, useRef, useState } from 'react'
import { truncateAddress } from 'utils/truncate'
import TokenCard from 'components/collections/TokenCard'
import { AttributeFilters } from 'components/collections/filters/AttributeFilters'
import { FilterButton } from 'components/common/FilterButton'
import SelectedAttributes from 'components/collections/filters/SelectedAttributes'
import { CollectionOffer } from 'components/buttons'
import { Grid } from 'components/primitives/Grid'
import { useIntersectionObserver } from 'usehooks-ts'
import fetcher from 'utils/fetcher'
import { useRouter } from 'next/router'
import { SortTokens } from 'components/collections/SortTokens'
import { useMediaQuery } from 'react-responsive'
import { TabsList, TabsTrigger, TabsContent } from 'components/primitives/Tab'
import * as Tabs from '@radix-ui/react-tabs'
import { useDebounce } from 'usehooks-ts'

import { NAVBAR_HEIGHT } from 'components/navbar'
import { CollectionActivityTable } from 'components/collections/CollectionActivityTable'
import { ActivityFilters } from 'components/common/ActivityFilters'
import { MobileAttributeFilters } from 'components/collections/filters/MobileAttributeFilters'
import { MobileActivityFilters } from 'components/common/MobileActivityFilters'
import LoadingCard from 'components/common/LoadingCard'
import { useChainCurrency, useMounted } from 'hooks'
import { NORMALIZE_ROYALTIES } from 'pages/_app'
import {
  faCog,
  faCube,
  faGlobe,
  faHand,
  faMagnifyingGlass,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import supportedChains, { DefaultChain } from 'utils/chains'
import { Head } from 'components/Head'
import { OpenSeaVerified } from 'components/common/OpenSeaVerified'
import { Address, useAccount } from 'wagmi'
import Img from 'components/primitives/Img'
import Sweep from 'components/buttons/Sweep'
import Mint from 'components/buttons/Mint'
import optimizeImage from 'utils/optimizeImage'
import CopyText from 'components/common/CopyText'
import { CollectionDetails } from 'components/collections/CollectionDetails'
import useTokenUpdateStream from 'hooks/useTokenUpdateStream'
import LiveState from 'components/common/LiveState'
import { formatUnits } from 'viem'
import CollectionDetailsHeader from 'components/collection/CollectionDetailsHeader'
import CollectionPageHeader from '../../../components/collection/CollectionPageHeader'
import CollectionPageComponent from '../../../components/collection/CollectionPageComponent'

type ActivityTypes = Exclude<
  NonNullable<
    NonNullable<
      Exclude<Parameters<typeof useCollectionActivity>['0'], boolean>
    >['types']
  >,
  string
>

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const CollectionPage: NextPage<Props> = ({ id, ssr }) => {
  return (
    <Layout>
      <Head
        ogImage={ssr?.collection?.collections?.[0]?.banner}
        title={ssr?.collection?.collections?.[0]?.name}
        description={ssr?.collection?.collections?.[0]?.description as string}
      />
      <CollectionPageComponent id={id} ssr={ssr} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  ssr: {
    collection?: paths['/collections/v7']['get']['responses']['200']['schema']
    tokens?: paths['/tokens/v6']['get']['responses']['200']['schema']
    hasAttributes: boolean
  }
  id: string | undefined
}> = async ({ params, res }) => {
  const id = params?.contract?.toString()
  const { reservoirBaseUrl } =
    supportedChains.find((chain) => params?.chain === chain.routePrefix) ||
    DefaultChain
  const headers: RequestInit = {
    headers: {
      'x-api-key': process.env.RESERVOIR_API_KEY || '',
    },
  }

  let collectionQuery: paths['/collections/v7']['get']['parameters']['query'] =
    {
      id,
      includeSalesCount: true,
      normalizeRoyalties: NORMALIZE_ROYALTIES,
    }

  const collectionsPromise = fetcher(
    `${reservoirBaseUrl}/collections/v7`,
    collectionQuery,
    headers
  )

  let tokensQuery: paths['/tokens/v6']['get']['parameters']['query'] = {
    collection: id,
    sortBy: 'floorAskPrice',
    sortDirection: 'asc',
    limit: 20,
    normalizeRoyalties: NORMALIZE_ROYALTIES,
    includeDynamicPricing: true,
    includeAttributes: true,
    includeQuantity: true,
    includeLastSale: true,
  }

  const tokensPromise = fetcher(
    `${reservoirBaseUrl}/tokens/v6`,
    tokensQuery,
    headers
  )

  const promises = await Promise.allSettled([
    collectionsPromise,
    tokensPromise,
  ]).catch(() => {})
  const collection: Props['ssr']['collection'] =
    promises?.[0].status === 'fulfilled' && promises[0].value.data
      ? (promises[0].value.data as Props['ssr']['collection'])
      : {}
  const tokens: Props['ssr']['tokens'] =
    promises?.[1].status === 'fulfilled' && promises[1].value.data
      ? (promises[1].value.data as Props['ssr']['tokens'])
      : {}

  const hasAttributes =
    tokens?.tokens?.some(
      (token) => (token?.token?.attributes?.length || 0) > 0
    ) || false

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=60'
  )

  return {
    props: { ssr: { collection, tokens, hasAttributes }, id },
  }
}

export default CollectionPage
