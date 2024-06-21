// ProductPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import testProducts from '../data/testProducts.json';
import './ProductPage.css'; // Ensure CSS file is imported

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = testProducts.find((p) => p.Product_id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page" style={{marginTop: 30}}>
      <div className="product-image-container">
        <img src={product.ImageLink} alt={product.BrandName} />
      </div>
      <div className="product-details-container">
        <h1>{product.BrandName}</h1>
        <p>Category: {product.Category}</p>
        <p>Gender: {product.category_by_Gender}</p>
        <p>Original Price: {product.OriginalPrice} INR</p>
        <p>Discount Price: {product.DiscountPrice} INR</p>
        <p>Fabric: {product.Fabric}</p>
        <p>Length: {product.Length}</p>
        <p>Pattern: {product.Pattern}</p>
        <p>Neck: {product.Neck}</p>
        <p>Occasion: {product.Occasion}</p>
        <p>Print: {product.Print}</p>
        <p>Shape: {product.Shape}</p>
        <p>Sleeve Length: {product.SleeveLength}</p>
        <p>Sleeve Styling: {product.SleeveStyling}</p>
        <p>Description: {product.Description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
