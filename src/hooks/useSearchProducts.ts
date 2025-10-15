import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import type { IFormState } from '~/types/common.type'
import { schema } from '~/utils/rules'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router'
import omit from 'lodash/omit'
import PATH from '~/constants/path'
type FormData = Pick<IFormState, 'name'>
const nameSchema = schema.pick(['name'])
export default function useSearchProducts() {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const handleSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? createSearchParams(
          omit(
            {
              ...queryConfig,
              name: data.name
            },
            ['order', 'sort_by']
          )
        )
      : createSearchParams(
          omit({
            ...queryConfig,
            name: data.name
          })
        )

    navigate({
      pathname: PATH.home,
      search: config.toString()
    })
  })
  return { register, handleSearch }
}
