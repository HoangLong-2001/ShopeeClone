import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router'
import { getProduct } from '~/apis/product.api'
import Rating from '~/components/Ranting'
import PATH from '~/constants/path'
import type { Product as ProductType } from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '~/utils/utils'
interface IProductProps {
  product: ProductType
}
export default function Product({ product }: IProductProps) {
  const queryClient = useQueryClient()
  const handlePreFetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', product._id],
      queryFn: () => getProduct(product._id),
      staleTime: 3 * 60 * 1000
    })
  }
  return (
    <Link to={`${PATH.home}${generateNameId({ name: product.name, id: product._id })}`} onMouseEnter={handlePreFetch}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[2rem] text-xs'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>đ</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <Rating rating={product.rating} />
            </div>
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
