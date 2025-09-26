import * as yup from 'yup'
import type { UseFormGetValues } from 'react-hook-form'
import type { FORM_VALIDATE_TYPE, IFormState } from '~/types/common.type'

export const getRules = (getValues?: UseFormGetValues<IFormState>): FORM_VALIDATE_TYPE => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    validate:
      typeof getRules === 'function'
        ? (value) => value === getValues?.('password') || 'Nhập lại password không khớp'
        : undefined
  }
})
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) > Number(price_min)
  }
  return price_max !== '' || price_min !== ''
}
export const schema = yup.object({
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài tối thiểu 5 ký tự')
    .max(160, 'Độ dài tối đa 160 ký tự')
    .required('Email là bắt buộc'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(5, 'Độ dài tối thiểu 5 ký tự')
    .max(160, 'Độ dài tối đa 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(5, 'Độ dài tối thiểu 5 ký tự')
    .max(160, 'Độ dài tối đa 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required()
})

export const LoginSchema = schema.omit(['confirm_password'])
