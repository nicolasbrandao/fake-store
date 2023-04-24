import classNames from 'classnames'
import Sidebar from '../components/Sidebar'
import ProductsList from '../components/ProductsList'

export default function Home() {
  const filterContainerClass = classNames('flex')
  return (
    <main className={filterContainerClass}>
      <Sidebar />
      <ProductsList />
    </main>
  )
}
