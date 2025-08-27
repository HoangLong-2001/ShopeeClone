import useRoutesElement from './routes'
import { ToastContainer } from 'react-toastify'
function App() {
  const element = useRoutesElement()
  return (
    <div>
      {element} <ToastContainer />
    </div>
  )
}

export default App
