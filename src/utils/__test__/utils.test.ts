import { test, expect } from 'vitest'
import { isAxiosError, isNotAxiosUnprocessableEntityError } from '../utils'
import { AxiosError, HttpStatusCode } from 'axios'
test('isAxiosError', () => {
  expect(isAxiosError(new AxiosError())).toBe(true)
  expect(isAxiosError(new Error())).toBe(false)
})

test('isNotAxiosUnprocessableEntityError', () => {
  expect(
    isNotAxiosUnprocessableEntityError(
      new AxiosError(undefined, undefined, undefined, undefined, {
        status: HttpStatusCode.BadGateway
      } as any)
    )
  ).toBe(true)
})
