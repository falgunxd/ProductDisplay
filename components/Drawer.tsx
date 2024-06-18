// Drawer.tsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import productProperties from '../data/productProperties.json';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

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
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [subDrawer, setSubDrawer] = useState<SubDrawerState>({
    open: false,
    items: [],
    currentAttribute: '',
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

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

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
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
    <Box sx={{ width: 250 }} role="presentation">
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
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
          <Drawer
            anchor="right"
            open={subDrawer.open}
            onClose={closeSubDrawer}
          >
            {subDrawerList}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DrawerComponent;
