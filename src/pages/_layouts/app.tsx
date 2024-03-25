import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export const AppLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const statusCode = error.response?.status
          const errorCode = error.response?.data.code

          if (statusCode === 401 && errorCode === 'UNAUTHORIZED') {
            navigate('/sign-in', { replace: true })
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
