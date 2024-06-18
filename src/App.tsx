// App.tsx
import React, { useState } from 'react';
import testProducts from '../data/testProducts.json';
import ProductCard from '../components/ProductCard';
import DrawerComponent from '../components/Drawer';
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
    <div className="app">
      <div className="filter-controls">
        <input type="file" accept=".json" onChange={handleFileUpload} />
        <button onClick={handleApplyFilters}>Apply</button>
      </div>
      <DrawerComponent filters={filters} onFiltersChange={handleFiltersChange} />
      {filteredProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default App;
