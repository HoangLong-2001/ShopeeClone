import { useRoutes } from 'react-router'
import routes from './routes'
export default function useRoutesElement() {
  const element = useRoutes(routes)
  return element
}
