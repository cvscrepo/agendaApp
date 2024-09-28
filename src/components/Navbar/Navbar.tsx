import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Icon, List } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SchedulerContext } from '../CalendarSheduler/context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };
  const calendarRef = React.useContext(SchedulerContext);
  const hadleClick = () => {

    calendarRef.current.scheduler.triggerDialog(true, {
      start: new Date(), /*Put the start date*/
      end: new Date() /*Put the end date*/
    })

  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Crear Cita'].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index === 1 ? <Icon>event</Icon> : index === 2 ? <Icon>person</Icon> : <Icon>event</Icon>}</ListItemIcon>
              <ListItemText primary={text} onClick={hadleClick} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Abrir Menú</Button>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

