import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

import { BrowserRouter, MemoryRouter } from 'react-router'
import { renderWithRouter } from '~/utils/testUtils'
import PATH from '~/constants/path'

describe('Form Login', () => {
  test('Hien thi loi required khong nhap gi', async () => {
    const { user } = renderWithRouter({ router: PATH.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    const submitButton = document.querySelector('form button[type="submit"]') as Element
    user.click(submitButton)
    await waitFor(async () => {
      expect(await screen.findByText('Độ dài tối thiểu 5 ký tự')).toBeTruthy()
      expect(await screen.findByText('Vui lòng nhập mật khẩu')).toBeTruthy()
    },{
      timeout:3000
    })
  })
})
