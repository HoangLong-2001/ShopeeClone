import { waitFor } from '@testing-library/dom'
import { describe, expect, it } from 'vitest'
import PATH from '~/constants/path'
import { access_token } from '~/msw/auth.msw'
import { saveAccessTokenToLS } from '~/utils/auth'
import { renderWithRouter } from '~/utils/testUtils'

describe('Profile', () => {
  it('render profile page', async () => {
    saveAccessTokenToLS(access_token)
    const { container } = renderWithRouter({ router: PATH.profile })
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe('Hoang Long')
    })
  })
})
