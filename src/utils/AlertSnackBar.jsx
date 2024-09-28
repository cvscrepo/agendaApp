// src/contexts/SnackbarContext.js
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Definimos el contexto
const SnackbarContext = createContext(null);

// Proveedor del SnackbarContext
export const SnackbarProvider = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    action: null,
  });

  const showSnackbar = (message, action = null, duration = 6000) => {
    setSnackbarData({
      open: true,
      message,
      action,
      duration,
    });
  };

  const hideSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  const action = snackbarData.action || (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={hideSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={snackbarData.duration}
        onClose={hideSnackbar}
        message={snackbarData.message}
        action={action}
      />
    </SnackbarContext.Provider>
  );
};

// Hook personalizado para usar el Snackbar
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
