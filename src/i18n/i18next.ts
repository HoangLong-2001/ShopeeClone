import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import HOME_EN from '~/locales/en/home.json'
import PRODUCT_EN from '~/locales/en/product.json'
import HOME_VI from '~/locales/vi/home.json'
import PRODUCT_VI from '~/locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
} as const

export const defaultNS = 'home'

i18next.use(initReactI18next).init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  ns: ['home', 'product'],
  resources,
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
