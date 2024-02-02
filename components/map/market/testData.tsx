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
        attributes: {
          biome: 'The Golden Steppe',
          size: 'City',
        },
      },
    })
  )
}
