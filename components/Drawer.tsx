import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import productProperties from '../data/productProperties.json';

interface SubDrawerState {
  open: boolean;
  items: string[];
  currentAttribute: string;
  selectedFilters: string[];
}

interface FilterProps {
  filters: Record<string, string[]>;
  onFiltersChange: (filters: Record<string, string[]>) => void;
  refreshCards: () => void; // Function to refresh cards
}

const DrawerComponent: React.FC<FilterProps> = ({ filters, onFiltersChange, refreshCards }) => {
  const [subDrawer, setSubDrawer] = useState<SubDrawerState>({
    open: false,
    items: [],
    currentAttribute: '',
    selectedFilters: [],
  });

  const toggleSubDrawer = (attribute: string, items: string[]) => {
    if (subDrawer.open && subDrawer.currentAttribute === attribute) {
      closeSubDrawer();
    } else {
      openSubDrawer(attribute, items);
    }
  };

  const openSubDrawer = (attribute: string, items: string[]) => {
    const initialSelectedFilters = filters[attribute] || [];
    setSubDrawer({ open: true, items, currentAttribute: attribute, selectedFilters: initialSelectedFilters });
  };

  const closeSubDrawer = () => {
    setSubDrawer({ ...subDrawer, open: false });
  };

  const handleCheckboxChange = (value: string) => {
    const updatedSelectedFilters = subDrawer.selectedFilters.includes(value)
      ? subDrawer.selectedFilters.filter((item) => item !== value)
      : [...subDrawer.selectedFilters, value];

    setSubDrawer((prevState) => ({
      ...prevState,
      selectedFilters: updatedSelectedFilters,
    }));
  };

  const clearFilters = () => {
    onFiltersChange({});
    refreshCards(); // Refresh cards after clearing filters
  };

  const applyFilters = () => {
    const newFilters = { ...filters };
    newFilters[subDrawer.currentAttribute] = subDrawer.selectedFilters;
    onFiltersChange(newFilters);
    closeSubDrawer();
    refreshCards(); // Refresh cards with applied filters
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="left"
        open
        sx={{
          '& .MuiDrawer-paper': { position: 'fixed', zIndex: 1, marginTop: '64px' },
        }}
      >
        <Box sx={{ width: 250, marginTop: '64px' }} role="presentation">
          <List>
            <Typography variant="h6" sx={{ marginBottom: 2, marginLeft: 2, fontWeight: 'bold' }}>
              Filters
            </Typography>
            {Object.keys(productProperties).map((key) => (
              <div key={key}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => toggleSubDrawer(key, productProperties[key as keyof typeof productProperties])}>
                    <ListItemText primary={key} />
                  </ListItemButton>
                </ListItem>
                {subDrawer.open && subDrawer.currentAttribute === key && (
                  <Box sx={{ borderLeft: '2px solid #ddd', paddingLeft: 2 }}>
                    <List sx={{ marginLeft: 2 }}>
                      {subDrawer.items.map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton onClick={() => handleCheckboxChange(item)}>
                            <Checkbox checked={subDrawer.selectedFilters.includes(item)} />
                            <ListItemText primary={item} sx={{ fontSize: '0.875rem' }} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
                      <Button variant="contained" color="secondary"  onClick={applyFilters}>Apply</Button>
                      <Button variant="outlined" onClick={closeSubDrawer}>Cancel</Button>
                    </Box>
                  </Box>
                )}
              </div>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button size='small' onClick={clearFilters} >Clear Filters</Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
