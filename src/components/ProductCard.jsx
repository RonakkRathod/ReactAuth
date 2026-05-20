import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => (
  <article className="product-card">
    <div className="product-thumb">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
    </div>
    <div className="product-body">
      <h3>{product.title}</h3>
      <p className="subtle">{product.brand}</p>
      <div className="product-meta">
        <span>${product.price}</span>
        <span>{product.rating} rating</span>
      </div>
      <Link className="text-link" to={`/products/${product.id}`}>
        View details
      </Link>
    </div>
  </article>
)

export default ProductCard
