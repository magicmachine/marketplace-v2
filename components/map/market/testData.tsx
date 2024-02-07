import { merge } from 'lodash'

const makeTestToken = (props: any) => {
  let defaults: any = {
    token: {
      chainId: 1,
      contract: '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42',
      tokenId: '4456',
      name: 'Archmagus Argus of the Wood',
      description: null,
      image:
        'https://img.reservoir.tools/images/v2/mainnet/i9YO%2F4yHXUdJsWcTqhqvf6HEpxZbt6Yczt2fhCM1yseoMEmOYzKXXGa6m95N064uU1qi943ALDcPFsvhg8nnQmH5P8HAlLFu6z33KRifDXa53VDS7xUzuuCvm07roj%2B%2F?width=512',
      imageSmall:
        'https://img.reservoir.tools/images/v2/mainnet/i9YO%2F4yHXUdJsWcTqhqvf6HEpxZbt6Yczt2fhCM1yseoMEmOYzKXXGa6m95N064uU1qi943ALDcPFsvhg8nnQmH5P8HAlLFu6z33KRifDXa53VDS7xUzuuCvm07roj%2B%2F?width=250',
      imageLarge:
        'https://img.reservoir.tools/images/v2/mainnet/i9YO%2F4yHXUdJsWcTqhqvf6HEpxZbt6Yczt2fhCM1yseoMEmOYzKXXGa6m95N064uU1qi943ALDcPFsvhg8nnQmH5P8HAlLFu6z33KRifDXa53VDS7xUzuuCvm07roj%2B%2F?width=1000',
      metadata: {
        imageOriginal:
          'ipfs://QmbtiPZfgUzHd79T1aPcL9yZnhGFmzwar7h4vmfV6rV8Kq/4456.png',
        mediaOriginal: 'https://www.forgottenrunes.com/viewer/wizards/4456',
        tokenURI: 'https://portal.forgottenrunes.com/api/wizards/data/4456',
      },
      media:
        'https://img.reservoir.tools/images/v2/mainnet/P4iccqF9wDPa6LUm%2FfDQU435IqMTjZ%2BRwwRFIF4TiebzBT1yqz%2FO%2F%2BMxvrP6txNjOAyXedrFuq6U0ojAyaVizg%3D%3D.html; charset=utf-8',
      kind: 'erc721',
      isFlagged: false,
      isSpam: false,
      isNsfw: false,
      metadataDisabled: false,
      lastFlagUpdate: '2024-02-01T21:21:07.258Z',
      lastFlagChange: '2024-01-03T10:15:55.997Z',
      supply: '1',
      remainingSupply: '1',
      rarity: 103.008,
      rarityRank: 8856,
      collection: {
        id: '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42',
        name: 'Forgotten Runes Wizards Cult',
        image:
          'https://img.reservoir.tools/images/v2/mainnet/hc%2BnPcLmWxs%2FDW99DlBQ42k40ZoyYV5jCIms5qHjwvt%2FEUjWZhGTPmq447sUrefhFYuYbX8oxBArIlE3TeNYkULyJ%2Fqup4y15Y1ENIjLn%2FV%2Bal6G4LvNLejtgmdWUIhNyOKrJPygnXzAQ0DldkqzIKVdXe8ygY0FMKRhcaTbWZzZvf%2FmOpj0g%2BQCpwUuJ5lo?width=250',
        slug: 'forgottenruneswizardscult',
        symbol: 'WIZARDS',
        creator: '0xd584fe736e5aad97c437c579e884d15b17a54a51',
        tokenCount: 9312,
        metadataDisabled: false,
        floorAskPrice: {
          currency: {
            contract: '0x0000000000000000000000000000000000000000',
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          amount: {
            raw: '620000000000000000',
            decimal: 0.62,
            usd: 1427.07713,
            native: 0.62,
          },
        },
      },
      lastSale: {
        orderSource: 'blur.io',
        fillSource: 'blur.io',
        timestamp: 1682031503,
        price: {
          currency: {
            contract: '0x0000000000000000000000000000000000000000',
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          amount: {
            raw: '770000000000000000',
            decimal: 0.77,
            usd: 1491.04796,
            native: 0.77,
          },
          netAmount: {
            raw: '766150000000000000',
            decimal: 0.76615,
            usd: 1483.59272,
            native: 0.76615,
          },
        },
        royaltyFeeBps: 50,
        feeBreakdown: [
          {
            kind: 'royalty',
            bps: 50,
            recipient: '0xc4fd73a45738291853a0937a31554f9a1dc42903',
            rawAmount: '3850000000000000',
            source: 'explorer.reservoir.tools',
          },
        ],
      },
      owner: '0xa211f47a0cc694b1ab3d84c1a50454bc0e43d41f',
      mintStages: [],
    },
    market: {
      floorAsk: {
        id: '0xc8fe1f8385bea363a3d109649996fef4908b81692db40a4cd15f812e7d584312',
        price: {
          currency: {
            contract: '0x0000000000000000000000000000000000000000',
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          amount: {
            raw: '620000000000000000',
            decimal: 0.62,
            usd: 1427.07713,
            native: 0.62,
          },
        },
        maker: '0xa211f47a0cc694b1ab3d84c1a50454bc0e43d41f',
        validFrom: 1706822450,
        validUntil: 0,
        quantityFilled: '0',
        quantityRemaining: '1',
        source: {
          id: '0xe073a3b3497e2ed4c6110eebbb664a839b168bcb',
          domain: 'blur.io',
          name: 'Blur',
          icon: 'https://blur.io/favicons/180.png',
          url: 'https://blur.io/asset/0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42/4456',
        },
      },
    },
    updatedAt: '2024-02-01T21:21:07.258Z',
  }

  return merge(defaults, props)
}

export let demoProperties: any[] = []

for (let i = 0; i < 10; i++) {
  const img = `/maps/plots/photos/${i}.png`
  demoProperties.push(
    makeTestToken({
      id: `property${i + 1}`,
      imageUrl: `/maps/plots/photos/${i}.png`,
      position: '',
      price: 545000,
      biome: 'TheGoldenSteppe',
      //
      token: {
        tokenId: i.toString(),
        name: `Plot ${i} in The Golden Steppe`,
        image: img,
        imageSmall: img,
        imageLarge: img,
        aspectRatio: '3/2',
        attributes: {
          biome: 'The Golden Steppe',
          size: 'City',
        },
      },
    })
  )
}

export const testCollection = {
  chainId: 1,
  id: '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42',
  slug: 'forgottenruneswizardscult',
  createdAt: '2022-02-09T17:13:35.991Z',
  updatedAt: '2024-02-02T23:32:33.669Z',
  name: 'Forgotten Runes Wizards Cult',
  symbol: 'WIZARDS',
  contractDeployedAt: null,
  image:
    'https://img.reservoir.tools/images/v2/mainnet/hc%2BnPcLmWxs%2FDW99DlBQ42k40ZoyYV5jCIms5qHjwvt%2FEUjWZhGTPmq447sUrefhFYuYbX8oxBArIlE3TeNYkULyJ%2Fqup4y15Y1ENIjLn%2FV%2Bal6G4LvNLejtgmdWUIhNyOKrJPygnXzAQ0DldkqzIKVdXe8ygY0FMKRhcaTbWZzZvf%2FmOpj0g%2BQCpwUuJ5lo?width=250',
  banner:
    'https://img.reservoir.tools/images/v2/mainnet/28SsxFrHoAzyiyUIVmrVwlczOlntRxQAii%2B%2F%2BYY7Diju68bRvdbpY1jonKselJDbxycB3hNoi5VFuKIyWyKlf4obtPJQP5IJXAin3Fzhw4o%3D',
  twitterUrl: null,
  discordUrl: 'https://discord.gg/forgottenrunes',
  externalUrl: 'http://forgottenrunes.com',
  twitterUsername: 'forgottenrunes',
  openseaVerificationStatus: 'verified',
  description:
    "The Forgotten Runes Wizard's Cult is a collaborative legendarium. 10,000 unique Wizard NFTs, fully encoded on-chain. \r\n\r\n[Website](http://forgottenrunes.com) | [Discord](https://discord.gg/forgottenrunes) | [Twitter](https://twitter.com/forgottenrunes) | [Book of Lore](https://www.forgottenrunes.com/lore) | [Principles](https://www.forgottenrunes.com/posts/principles) | [Goodies](https://www.forgottenrunes.com/posts/goodies)\r\n\r\n[All Sister Collections](https://opensea.io/collection/forgottenrunes):\r\n\r\n[Sacred Flame](https://opensea.io/assets/0x31158181b4b91a423bfdc758fc3bf8735711f9c5/0) | [Forgotten Souls](https://opensea.io/collection/forgottensouls) | [Forgotten Ponies](https://opensea.io/collection/forgottenrunesponies)\r\n\r\nWizard NFT holders have not only the _image_, but the _character_ of that Wizard. Day by day, the Wizards in our collection come alive as our community builds lore, maps, stories, poems, art, and animation.\r\n\r\nJoin the Cult",
  metadataDisabled: false,
  isSpam: false,
  isNsfw: false,
  isMinting: false,
  sampleImages: [
    'https://img.reservoir.tools/images/v2/mainnet/i9YO%2F4yHXUdJsWcTqhqvf6HEpxZbt6Yczt2fhCM1yseoMEmOYzKXXGa6m95N064uU1qi943ALDcPFsvhg8nnQm3wWGlWnj9K7B9akyvkXKE%3D',
    'https://img.reservoir.tools/images/v2/mainnet/i9YO%2F4yHXUdJsWcTqhqvf6HEpxZbt6Yczt2fhCM1yseoMEmOYzKXXGa6m95N064uU1qi943ALDcPFsvhg8nnQvD5sCXscYtZgTHoEnkqR2o%3D',
    'https://img.reservoir.tools/images/v2/mainnet/i9YO%2F4yHXUdJsWcTqhqvf6HEpxZbt6Yczt2fhCM1yseoMEmOYzKXXGa6m95N064uU1qi943ALDcPFsvhg8nnQu%2Fy5zD4hAit%2BnOoMP3Hk1s%3D',
    'https://img.reservoir.tools/images/v2/mainnet/i9YO%2F4yHXUdJsWcTqhqvf6HEpxZbt6Yczt2fhCM1yseoMEmOYzKXXGa6m95N064uU1qi943ALDcPFsvhg8nnQkH9bk3gPG%2FLLmBh4TPVuj4%3D',
  ],
  tokenCount: '9312',
  onSaleCount: '579',
  primaryContract: '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42',
  tokenSetId: 'contract:0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42',
  creator: '0xd584fe736e5aad97c437c579e884d15b17a54a51',
  royalties: {
    recipient: '0xc4fd73a45738291853a0937a31554f9a1dc42903',
    breakdown: [
      {
        bps: 500,
        recipient: '0xc4fd73a45738291853a0937a31554f9a1dc42903',
      },
    ],
    bps: 500,
  },
  allRoyalties: {
    eip2981: [
      {
        bps: 500,
        recipient: '0xc4fd73a45738291853a0937a31554f9a1dc42903',
      },
    ],
    onchain: [
      {
        bps: 500,
        recipient: '0xc4fd73a45738291853a0937a31554f9a1dc42903',
      },
    ],
    opensea: [
      {
        bps: 250,
        required: false,
        recipient: '0xc4fd73a45738291853a0937a31554f9a1dc42903',
      },
    ],
  },
  floorAsk: {
    id: '0x6f858e886309b461a789c496129671c4104a1235d1cfd3f9d9d5ef09ef6ba39b',
    sourceDomain: 'blur.io',
    price: {
      currency: {
        contract: '0x0000000000000000000000000000000000000000',
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      amount: {
        raw: '625000000000000000',
        decimal: 0.625,
        usd: 1438.58581,
        native: 0.625,
      },
    },
    maker: '0xbf979cbaf829d5977585e2ace8441345091ff4bf',
    validFrom: 1706916753,
    validUntil: 0,
    token: {
      contract: '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42',
      tokenId: '8582',
      name: 'Magus Aldo of the Quantum Downs',
      image:
        'https://img.reservoir.tools/images/v2/mainnet/i9YO%2F4yHXUdJsWcTqhqvf6HEpxZbt6Yczt2fhCM1yseoMEmOYzKXXGa6m95N064uU1qi943ALDcPFsvhg8nnQmke4onMniRjHxWsRjWlPzWe4c1xEolSXLTSDogAUCSB?width=512',
    },
  },
  topBid: {
    id: '0x765c7a48662c31d732562b7ef7ded11682d99acc12535c0b9c6c5aa78cb99fd6',
    sourceDomain: 'sudoswap.xyz',
    price: {
      currency: {
        contract: '0x0000000000000000000000000000000000000000',
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      amount: {
        raw: '577690476190476057',
        decimal: 0.57769,
        usd: 1329.69172,
        native: 0.57769,
      },
      netAmount: {
        raw: '574802023809523677',
        decimal: 0.5748,
        usd: 1323.04326,
        native: 0.5748,
      },
    },
    maker: '0x89b043ba913963fdc9a3f17f2da437103f53d305',
    validFrom: 1706897230,
    validUntil: 0,
  },
  rank: {
    '1day': 93,
    '7day': 136,
    '30day': 59,
    allTime: 133,
  },
  volume: {
    '1day': 10.1805,
    '7day': 35.74799,
    '30day': 174.4845,
    allTime: 21167.42528,
  },
  volumeChange: {
    '1day': 2.7458466015381577,
    '7day': 1.3265901521298684,
    '30day': 0.8405203239464928,
  },
  floorSale: {
    '1day': 0.5843,
    '7day': 0.62,
    '30day': 0.6102,
  },
  floorSaleChange: {
    '1day': 1.0696559986308403,
    '7day': 1.0080645161290323,
    '30day': 1.0242543428384137,
  },
  salesCount: {
    '1day': '16',
    '7day': '55',
    '30day': '248',
    allTime: '21892',
  },
  collectionBidSupported: true,
  ownerCount: 3091,
  contractKind: 'erc721',
  mintedTimestamp: null,
  mintStages: [],
  securityConfig: {
    operatorBlacklist: [],
  },
}
