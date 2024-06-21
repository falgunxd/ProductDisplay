// Drawer.tsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import productProperties from '../data/productProperties.json';

interface SubDrawerState {
  open: boolean;
  items: string[];
  currentAttribute: string;
}

interface FilterProps {
  filters: Record<string, string[]>;
  onFiltersChange: (filters: Record<string, string[]>) => void;
}

const DrawerComponent: React.FC<FilterProps> = ({ filters, onFiltersChange }) => {
  const [subDrawer, setSubDrawer] = useState<SubDrawerState>({
    open: false,
    items: [],
    currentAttribute: '',
  });

  const openSubDrawer = (attribute: string, items: string[]) => {
    setSubDrawer({ open: true, items, currentAttribute: attribute });
  };

  const closeSubDrawer = () => {
    setSubDrawer({ open: false, items: [], currentAttribute: '' });
  };

  const handleCheckboxChange = (attribute: string, value: string) => {
    const newFilters = { ...filters };
    if (!newFilters[attribute]) {
      newFilters[attribute] = [];
    }
    if (newFilters[attribute].includes(value)) {
      newFilters[attribute] = newFilters[attribute].filter((item) => item !== value);
    } else {
      newFilters[attribute].push(value);
    }
    onFiltersChange(newFilters);
  };

  const list = (
    <Box sx={{ width: 150, marginTop: '64px' }} role="presentation">
      <List>
        {Object.keys(productProperties).map((key) => (
          <ListItem key={key} disablePadding>
            <ListItemButton onClick={() => openSubDrawer(key, productProperties[key as keyof typeof productProperties])}>
              <ListItemText primary={key} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const subDrawerList = (
    <Box sx={{ width: 250, marginTop: '64px' }} role="presentation">
      <List>
        {subDrawer.items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleCheckboxChange(subDrawer.currentAttribute, item)}>
              <Checkbox checked={filters[subDrawer.currentAttribute]?.includes(item)} />
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
        {list}
      </Drawer>
      <Drawer
        anchor="right"
        open={subDrawer.open}
        onClose={closeSubDrawer}
        sx={{
          '& .MuiDrawer-paper': { position: 'fixed', zIndex: 1, marginTop: '64px' },
        }}
      >
        {subDrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
