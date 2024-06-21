// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import testProducts from '../data/testProducts.json';
import ProductCard from '../components/ProductCard';
import DrawerComponent from '../components/Drawer';
import ResponsiveAppBar from '../components/Appbar';
import ProductPage from '../components/ProductPage';
import './App.css'; // If you have a CSS file for styling

const App: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [uploadedFilters, setUploadedFilters] = useState<Record<string, string[]>>({});

  const handleFiltersChange = (newFilters: Record<string, string[]>) => {
    setFilters(newFilters);
  };

  const filterProducts = (products: any[]) => {
    return products.filter((product) => {
      for (const key in filters) {
        if (filters[key].length > 0 && !filters[key].includes(product[key])) {
          return false;
        }
      }
      return true;
    });
  };

  const filteredProducts = filterProducts(testProducts);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (content) {
          const jsonContent = JSON.parse(content as string);
          setUploadedFilters(jsonContent);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleApplyFilters = () => {
    setFilters(uploadedFilters);
  };

  return (
    <Router>
      <div className="app">
        <ResponsiveAppBar />
        <DrawerComponent filters={filters} onFiltersChange={handleFiltersChange} />
        <div className="filter-controls">
          <input type="file" accept=".json" onChange={handleFileUpload} />
          <button onClick={handleApplyFilters}>Apply</button>
        </div>
        <Routes>
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/" element={
            <div className="product-list">
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
