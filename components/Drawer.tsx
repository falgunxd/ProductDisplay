import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import productProperties from '../data/productProperties.json';

interface SubDrawerState {
  open: boolean;
  items: string[];
  currentAttribute: string;
  selectedFilters: string[];
  initialSelectedFilters: string[];
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
    initialSelectedFilters: [],
  });

  useEffect(() => {
    if (subDrawer.open) {
      // Update initial selected filters when the modal opens
      setSubDrawer((prevState) => ({
        ...prevState,
        initialSelectedFilters: [...prevState.selectedFilters],
      }));
    }
  }, [subDrawer.open]);

  const openSubDrawer = (attribute: string, items: string[]) => {
    const initialSelectedFilters = filters[attribute] || [];
    setSubDrawer({ open: true, items, currentAttribute: attribute, selectedFilters: initialSelectedFilters, initialSelectedFilters });
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

  const list = (
    <Box sx={{ width: 150, marginTop: '64px' }} role="presentation">
      <List>
        <Typography variant="h6" sx={{ marginBottom: 2, marginLeft: 2, fontWeight: 'bold' }}>
          Filters
        </Typography>
        {Object.keys(productProperties).map((key) => (
          <ListItem key={key} disablePadding>
            <ListItemButton onClick={() => openSubDrawer(key, productProperties[key as keyof typeof productProperties])}>
              <ListItemText primary={key} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button size='small' onClick={clearFilters} >Clear Filters</Button>
      </Box>
    </Box>
  );

  const subDrawerList = (
    <Box sx={{ width: 300, bgcolor: 'background.paper', p: 2 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        {subDrawer.currentAttribute}
      </Typography>
      <List sx={{ maxHeight: 400, overflow: 'auto' }}>
        {subDrawer.items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleCheckboxChange(item)}>
              <Checkbox checked={subDrawer.selectedFilters.includes(item)} />
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
        <Button variant="contained" onClick={applyFilters}>Apply</Button>
        <Button variant="contained" onClick={closeSubDrawer}>Cancel</Button>
      </Box>
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
      <Modal
        open={subDrawer.open}
        onClose={closeSubDrawer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {subDrawerList}
      </Modal>
    </div>
  );
};

export default DrawerComponent;
