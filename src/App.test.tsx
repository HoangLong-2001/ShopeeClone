import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router'

// matchers && expect.extend(matchers)

describe('App', () => {
  test('App render va chuyen trang', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    })
    const user = userEvent.setup()
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })
    await user.click(screen.getByText(/Login/i))
    await waitFor(
      () => {
        expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
        expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
      },
      {
        timeout: 3000
      }
    )
    screen.debug(document.body.parentElement as HTMLElement, 9999999)
  })
  test('Về trang not found', async () => {
    const badRoute = '/some/bad/route'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/Not Found/i)).toBeInTheDocument()
    })
    // await logScreen()
  })
})
