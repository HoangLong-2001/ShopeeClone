import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { AppProvider } from './contexts/app.context'
import { useLocation } from 'react-router'
import useRoutesElement from './routes'
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react'
import { AppContext } from './contexts/app.context'
import { localStorageEvent } from './utils/auth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})
function App() {
  const element = useRoutesElement()
  const { pathname, search } = useLocation()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // hoặc "auto"
    })
  }, [pathname, search])
  useEffect(() => {
    localStorageEvent.addEventListener('clearLS', reset)
    return () => {
      localStorageEvent.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <div>
            {element} <ToastContainer />
          </div>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
