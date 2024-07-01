import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate,  } from 'react-router-dom';
import queryString from 'query-string';
import testProducts from '../data/newTestProducts.json';
import ProductCard from '../components/ProductCard';
import DrawerComponent from '../components/Drawer';
import ResponsiveAppBar from '../components/Appbar';
import ProductPage from '../components/ProductPage';
import Banner from "./assets/BannerFemaleCrop.png"
import './App.css'; // If you have a CSS file for styling



const App: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [uploadedFilters, setUploadedFilters] = useState<Record<string, string[]>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();

  // Function to synchronize filters with URL
  const syncFiltersWithURL = () => {
    const queryParams = queryString.stringify(filters, { arrayFormat: 'comma' });
    navigate(`/?${queryParams}`, { replace: true });
  };

  // Apply filters from URL parameters
  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    const newFilters: Record<string, string[]> = {};

    Object.keys(queryParams).forEach((key) => {
      newFilters[key] = Array.isArray(queryParams[key])
        ? queryParams[key] as string[]
        : [queryParams[key] as string];
    });

    setFilters(newFilters);
    setIsInitialized(true); // Ensure that the initial URL filters are applied
  }, []);

  // Sync filters with URL only when filters change and after initialization
  useEffect(() => {
    if (isInitialized) {
      syncFiltersWithURL();
    }
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

  const refreshCards = () => {
    // Function to refresh cards
    console.log('Cards refreshed');
  };

  return (
    <div className="app">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/" element={

          <>
            <div className="filter-controls" >
              <input type="file" accept=".json" onChange={handleFileUpload} />
              <button onClick={handleApplyFilters}>Apply</button>
            </div>
            <img src={Banner} style={{marginTop: 0, zIndex:20, width: "220vh"}}/>
            <div >
              <DrawerComponent 
                filters={filters} 
                onFiltersChange={handleFiltersChange} 
                refreshCards={refreshCards} 
              />
              
              <div className="product-list"  style={{marginLeft: 250}}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
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
