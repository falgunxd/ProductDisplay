// App.tsx
import React, { useState } from 'react';
import testProducts from '../data/testProducts.json';
import ProductCard from '../components/ProductCard';
import DrawerComponent from '../components/Drawer';
import './App.css'; // If you have a CSS file for styling

const App: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});

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

  return (
    <div className="app">
      <DrawerComponent filters={filters} onFiltersChange={handleFiltersChange} />
      {filteredProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default App;
