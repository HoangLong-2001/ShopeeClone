import { beforeAll, describe, expect, test } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { logScreen, renderWithRouter } from '~/utils/testUtils'
import PATH from '~/constants/path'

describe('Form Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  beforeAll(async () => {
    renderWithRouter({ router: PATH.login })
    await waitFor(() => {
      expect(screen.queryAllByPlaceholderText('Email')).toBeTruthy()
    })
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })
  test('Hien thi loi required khong nhap gi', async () => {
    fireEvent.submit(submitButton)

    await waitFor(
      async () => {
        expect(screen.queryByText('Độ dài tối thiểu 5 ký tự')).toBeTruthy()
        expect(screen.queryByText('Vui lòng nhập mật khẩu')).toBeTruthy()
      },
      {
        timeout: 3000
      }
    )
  })
  test('Không nên hiển thị lỗi khi nhập lại value đúng', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'd3@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: 'useruser'
      }
    })
    // Những trường hợp chứng minh rằng tìm không ra text hay là element
    // Thì nên dùng query hơn là find hay get
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeFalsy()
    })
    await logScreen()
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })
    // console.log(await screen.findByText('Email không đúng định dạng'))
  })
})
