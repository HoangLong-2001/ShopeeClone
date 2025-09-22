import { useLocation } from 'react-router'
import useRoutesElement from './routes'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
function App() {
  const element = useRoutesElement()
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // hoặc "auto"
    })
  }, [pathname, search])

  return (
    <div>
      {element} <ToastContainer />
    </div>
  )
}

export default App
