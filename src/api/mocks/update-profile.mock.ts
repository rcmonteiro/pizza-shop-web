import { http, HttpResponse } from 'msw'

import { UpdateProfileBody } from '../update-profile'

export const updateProfileMock = http.put<never, UpdateProfileBody>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Invalid name') {
      return new HttpResponse(null, { status: 400 })
    } else {
      return new HttpResponse(null, { status: 204 })
    }
  },
)
