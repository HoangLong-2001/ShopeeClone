import { screen, waitFor, type waitForOptions } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { expect } from 'vitest'
import App from '~/App'

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  option?: waitForOptions
) => {
  const { timeout = 1000 } = option || {}
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      ...option,
      timeout
    }
  )
  screen.debug(body, 999999)
}

export const renderWithRouter = ({ router = '/' } = {}) => {
  window.history.pushState({}, 'Test page', router)
  return {
    user: userEvent.setup(),
    ...render(<App />, { wrapper: BrowserRouter })
  }
}
