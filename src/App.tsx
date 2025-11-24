import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { useLocation } from 'react-router'
import useRoutesElement from './routes'
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react'
import { AppContext } from './contexts/app.context'
import { localStorageEvent } from './utils/auth'

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
      <div>
        {element} <ToastContainer />
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
