import React from 'react';
import { useParams } from 'react-router-dom';
import testProducts from '../data/newTestProducts.json';
import './ProductPage.css'; // Ensure CSS file is imported
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = testProducts.find((p) => p.Product_id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <div className="product-image-container" style={{ padding: "40px" }}>
        <img src={product.ImageLink} alt={product.BrandName} />
      </div>
      <div className="product-details-container">
        <h1>{product.BrandName}</h1>
        <h4>{product.Title}</h4>
        {product.category_by_Gender === "Female" ? <p>For her</p> : <p>For him</p>}
        {/* <p>For: ({product.category_by_Gender==="Female"})?Her:Him</p> */}
        <span className="discount-percent">-{product['DiscountOffer(percentage)']}%</span>
        <span className="discount-price">{product.DiscountPrice} INR</span>
        <p className="original-price">{product.OriginalPrice} INR</p>
        <p>Sizes Available</p>
        <p> {product.SizeOption}</p>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button color="secondary">Buy Now</Button>
          <Button variant="outlined" color="secondary">Add to Cart</Button>
        </ButtonGroup>
        <br/>
        <br/>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <p>Fabric: {product.Fabric}</p>
            <p>Length: {product.Length}</p>
            <p>Pattern: {product.Pattern}</p>
            <p>Neck: {product.Neck}</p>
            <p>Occasion: {product.Occasion}</p>
            <p>Print: {product.Print}</p>
            <p>Shape: {product.Shape}</p>
            <p>Sleeve Length: {product.SleeveLength}</p>
            <p>Sleeve Styling: {product.SleeveStyling}</p>

          </AccordionDetails>
        </Accordion>

      </div>
    </div>
  );
};

export default ProductPage;
