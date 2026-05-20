import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusBanner from '../../components/StatusBanner'
import { fetchProductById } from '../../services/productService'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    const loadProduct = async () => {
      setStatus('loading')
      setError('')

      try {
        const data = await fetchProductById(productId)
        if (!isActive) {
          return
        }
        setProduct(data)
        setStatus('ready')
      } catch (loadError) {
        if (!isActive) {
          return
        }
        setError(loadError.message || 'Unable to load product details.')
        setStatus('ready')
      }
    }

    loadProduct()

    return () => {
      isActive = false
    }
  }, [productId])

  if (status === 'loading') {
    return (
      <section className="page">
        <div className="panel">Loading product details...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page">
        <StatusBanner message={error} variant="error" />
        <Link className="text-link" to="/products">
          Back to products
        </Link>
      </section>
    )
  }

  if (!product) {
    return null
  }

  return (
    <section className="page">
      <div className="panel detail-panel">
        <div className="detail-media">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="detail-body">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.title}</h2>
          <p className="subtle">{product.description}</p>
          <div className="detail-meta">
            <div>
              <p className="label">Price</p>
              <p>${product.price}</p>
            </div>
            <div>
              <p className="label">Rating</p>
              <p>{product.rating}</p>
            </div>
            <div>
              <p className="label">Stock</p>
              <p>{product.stock}</p>
            </div>
            <div>
              <p className="label">Brand</p>
              <p>{product.brand}</p>
            </div>
          </div>
          <Link className="text-link" to="/products">
            Back to products
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
