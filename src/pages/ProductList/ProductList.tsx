import { useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'
import { getProducts } from '~/apis/product.api'
import Pagination from '~/components/Pagination'
import type { ProductListConfig } from '~/types/product.type'
import { getCategories } from '~/apis/category.api'
import useQueryConfig from '~/hooks/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig()
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true,
    staleTime: Infinity
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter categories={categoryData?.data || []} queryConfig={queryConfig} />
          </div>
          <div className='col-span-9'>
            <SortProductList pageSize={data?.data?.pagination.page_size || 1} queryConfig={queryConfig} />
            {data?.data && (
              <>
                <div className='mt-6 grid grid-cols-12 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                <Pagination queryConfig={queryConfig} pageSize={data.data.pagination.page_size} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
