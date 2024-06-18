// ProductCard.tsx
import React from 'react';
import './ProductCard.css'; // Ensure CSS file is imported

interface Product {
  ProductWebsite: string;
  ImageLink: string;
  Product_id: number;
  BrandName: string;
  Category: string;
  category_by_Gender: string;
  OriginalPrice: number;
  DiscountPrice: number;
  Fabric: string;
  Length: string;
  Pattern: string;
  Neck: string;
  Occasion: string;
  Print: string;
  Shape: string;
  SleeveLength: string;
  SleeveStyling: string;
  Description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleClick = () => {
    window.open(product.ProductWebsite, '_blank');
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="image-container">
        <img className="product-image" src={product.ImageLink} alt={product.BrandName} />
      </div>
      <div className="product-details">
        <h2>{product.BrandName}</h2>
        <p>Product ID: {product.Product_id}</p>
        <p>Category: {product.category_by_Gender}</p>
        <p>
          Original Price: <span className="original-price">{product.OriginalPrice} INR</span>
        </p>
        <p className="discount-price">Discount Price: {product.DiscountPrice} INR</p>
        <p>Fabric: {product.Fabric}</p>
        <p>Length: {product.Length}</p>
        <p>Pattern: {product.Pattern}</p>
        <p>Neck: {product.Neck}</p>
        <p>Occasion: {product.Occasion}</p>
        <p>Print: {product.Print}</p>
        <p>Shape: {product.Shape}</p>
        <p>Sleeve Length: {product.SleeveLength}</p>
        <p>Sleeve Styling: {product.SleeveStyling}</p>
        <div className="description-popup">{product.Description}</div>
      </div>
    </div>
  );
};

export default ProductCard;
