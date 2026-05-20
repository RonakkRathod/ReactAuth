import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import ProductCard from '../../components/ProductCard'
import StatusBanner from '../../components/StatusBanner'
import { fetchProducts } from '../../services/productService'
import { PRODUCTS_PAGE_SIZE } from '../../utils/constants'

const ProductsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = Number(searchParams.get('page') || 1)
  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    const loadProducts = async () => {
      setStatus('loading')
      setError('')

      try {
        const data = await fetchProducts({
          limit: PRODUCTS_PAGE_SIZE,
          skip: (currentPage - 1) * PRODUCTS_PAGE_SIZE,
        })

        if (!isActive) {
          return
        }

        setProducts(data.products || [])
        setTotal(data.total || 0)
        setStatus('ready')
      } catch (loadError) {
        if (!isActive) {
          return
        }
        setError(loadError.message || 'Unable to load products.')
        setStatus('ready')
      }
    }

    loadProducts()

    return () => {
      isActive = false
    }
  }, [currentPage])

  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PAGE_SIZE))

  const handlePageChange = (nextPage) => {
    const safePage = Math.min(Math.max(1, nextPage), totalPages)
    setSearchParams({ page: String(safePage) })
  }

  return (
    <section className="page">
      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Catalog</p>
            <h2>Products</h2>
          </div>
          <span className="pill">{total} items</span>
        </div>

        <StatusBanner message={error} variant="error" />

        {status === 'loading' ? (
          <div className="panel">Loading products...</div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  )
}

export default ProductsListPage
