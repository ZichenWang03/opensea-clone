import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { HiTag } from 'react-icons/hi'
import { IoMdWallet, IoIosPricetags } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
  test: `bg-white`,
  modalWrapper: `justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`,
  modalOutline: `relative w-auto my-6 mx-auto max-w-2xl`,
  modalContent: `border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`,
  modalHeader: `flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t`,
  modalBody: `relative p-6 flex-auto`,
  modalFooter: `flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b`,
}

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState(false)

  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(selectedNft)
    })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  const buyItem = async (
    // listingId = selectedMarketNft.metadata.id.toNumber(),

    quantityDesired = 1,
    module = marketPlaceModule
    // marketPlaceModule = useMarketplace(
    //   '0x8204f99AfE1caF2fA961b509a6988a11CD48E727'
    // )
  ) => {
    // can use marketPlaceModule.direct.buyoutListing or below
    await module.buyoutListing(2, quantityDesired)

    confirmPurchase()
  }

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="top-center" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <div
            onClick={() => {
              // buyItem(selectedMarketNft.id, 1)
              enableButton ? buyItem(1) : null
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div>
          <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
            <IoIosPricetags className={style.buttonIcon} />
            <div
              className={style.buttonText}
              onClick={() => setShowModal(true)}
            >
              Sell
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MakeOffer
