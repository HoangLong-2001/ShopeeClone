import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { getProduct } from '~/apis/product.api'
import InputNumber from '~/components/InputNumber/InputNumber'
import Rating from '~/components/Ranting'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '~/utils/utils'

export default function ProductDetail() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as string)
  })
  const imgRef = useRef<HTMLImageElement>(null)
  const [currentIndexImages, setCurrentIndexImages] = useState<[number, number]>([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const product = productData?.data
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  useEffect(() => {
    if (product && product.images.length > 0) setActiveImage(product.images[0])
  }, [product])
  const next = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    if (product && currentIndexImages[1] < product?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const chooseActive = (img: string) => {
    setActiveImage(img)
  }
  const handleZoomIn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imgRef.current as HTMLImageElement
    const { offsetX, offsetY } = e.nativeEvent
    const { naturalHeight, naturalWidth } = image

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    ;((image.style.width = naturalWidth + 'px'), (image.style.height = naturalHeight + 'px'))
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleZoomOut = () => {
    imgRef.current?.removeAttribute('style')
  }
  return (
    product && (
      <div className='bg-gray-200 py-6'>
        <div className='container'>
          <div className='bg-white p-4 shadow'>
            <div className='grid grid-cols-12 gap-9'>
              <div className='col-span-5'>
                <div
                  className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                  onMouseMove={handleZoomIn}
                  onMouseLeave={handleZoomOut}
                >
                  <img
                    ref={imgRef}
                    src={activeImage}
                    alt={product.name}
                    className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  />
                </div>
                <div className='relative mt-4 grid grid-cols-5 gap-1'>
                  <button
                    className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                    onClick={prev}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                    </svg>
                  </button>
                  {currentImages.slice(0, 5).map((img) => {
                    const isActive = img === activeImage
                    return (
                      <div
                        className='relative w-full pt-[100%] shadow'
                        key={img}
                        onMouseEnter={() => chooseActive(img)}
                      >
                        <img
                          src={img}
                          alt={product.name}
                          className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                        />
                        {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                      </div>
                    )
                  })}
                  <button
                    className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                    onClick={next}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='col-span-7'>
                <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
                <div className='mt-8 flex items-center'>
                  <div className='flex items-center'>
                    <span className='mr-1 border-b-orange text-orange'>{product.rating}</span>
                    <Rating
                      rating={product.rating}
                      activeClassname='fill-orange text-orange h-4 w-4'
                      nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                    />
                  </div>
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'>
                    <span>{formatNumberToSocialStyle(product.sold)}</span>
                    <span className='ml-1 text-gray-500'>Đã bán</span>
                  </div>
                </div>
                <div className='mt-8 flex items-center bg-gray-50 px-5 py-5'>
                  <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                  <div className='ml-3 text-3xl font-medium text-orange'>{formatCurrency(product.price)}</div>
                  <div className='rounded-xs ml-2 bg-orange px-[2px] py-[1px] text-sm text-white'>
                    {rateSale(product.price_before_discount, product.price)} giảm
                  </div>
                </div>
                <div className='mt-8 flex items-center'>
                  <div className='capitalize text-gray-500'>Số lượng</div>
                  <div className='ml-10 flex items-center'>
                    <button className='rounded-1-sm flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-4 w-4'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                      </svg>
                    </button>
                    <InputNumber
                      value={1}
                      classNameError='hidden'
                      classNameInput='h-8 w-14 border-b border-gray-300 border-t text-center p-1 outline-none'
                    />
                    <button className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-4 w-4'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                      </svg>
                    </button>
                    <span className='ml-2'>Thêm vào giỏ hàng</span>
                    <button className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>{' '}
            <div className='mt-8 bg-white p-4 shadow'>
              <div className='container'>
                <div className='bg-gray-5 rounded p-4 text-lg capitalize text-slate-700'>
                  <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(product.description)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
