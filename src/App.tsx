// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import testProducts from '../data/testProducts.json';
import ProductCard from '../components/ProductCard';
import DrawerComponent from '../components/Drawer';
import ResponsiveAppBar from '../components/Appbar';
import ProductPage from '../components/ProductPage';
import './App.css'; // If you have a CSS file for styling

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const App: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [uploadedFilters, setUploadedFilters] = useState<Record<string, string[]>>({});

  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    const newFilters: Record<string, string[]> = {};

    Object.keys(queryParams).forEach((key) => {
      newFilters[key] = Array.isArray(queryParams[key])
        ? queryParams[key] as string[]
        : [queryParams[key] as string];
    });

    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const queryParams = queryString.stringify(filters, { arrayFormat: 'comma' });
    navigate(`/?${queryParams}`, { replace: true });
  }, [filters]);

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
    <div className="app">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/" element={
          <>
            <DrawerComponent filters={filters} onFiltersChange={handleFiltersChange} />
            <div className="filter-controls">
              <input type="file" accept=".json" onChange={handleFileUpload} />
              <button onClick={handleApplyFilters}>Apply</button>
            </div>
            <div className="product-list">
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </>
        } />
      </Routes>
    </div>
  );
};

const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
