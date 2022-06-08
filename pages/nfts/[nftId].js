import Header from '../../components/Header'
import React, { useEffect, useState, useMemo } from 'react'
import { useNFTCollection } from '@thirdweb-dev/react'
import { useMarketplace } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import GeneralDetails from '../../components/nft/GeneralDetails'
import NFTImages from '../../components/nft/NFTImage'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nfts = () => {
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const router = useRouter()

  // get an instance of your own collection contract
  const nftCollection = useNFTCollection(
    '0x590fdD16B311fe85722D57FFB564C1F3b82C966E'
  )

  useEffect(() => {
    if (!nftCollection) return
    ;(async () => {
      const nfts = await nftCollection.getAll()
      const selectedNftItem = nfts.find(
        (nft) => nft.metadata.id.toNumber() == router.query.nftId
      )
      setSelectedNft(selectedNftItem)
    })()
  }, [nftCollection])

  // Initialize marketplace contract by passing in the contract address
  const marketplaceAddress = '0x8204f99AfE1caF2fA961b509a6988a11CD48E727'
  const marketPlaceModule = useMarketplace(marketplaceAddress)

  // Get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImages selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nfts
