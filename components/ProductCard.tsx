// ProductCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Ensure CSS file is imported

interface Product {
  ProductWebsite: string;
  ImageLink: string;
  Product_id: number;
  BrandName: string;
  Fabric: string;
  Length: string;
  Pattern: string;
  Shape: string;
  OriginalPrice: number;
  DiscountPrice: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.Product_id}`);
  };

  return (
    <div className="product-card" onClick={handleClick} style={{display: "block", width: 350}}>
      <div className="image-container">
        <img className="product-image" src={product.ImageLink} alt={product.BrandName} />
      </div>
      <div className="product-details">
        <h2>{product.BrandName}</h2>
        <p>{product.Fabric} {product.Length} {product.Pattern} {product.Shape}</p>
        <span className="discount-price">{product.DiscountPrice} INR</span> 
        <span className="original-price">{product.OriginalPrice} INR</span>
      </div>
    </div>
  );
};

export default ProductCard;
