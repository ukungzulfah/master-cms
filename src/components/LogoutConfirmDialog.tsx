import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

interface LogoutConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="logout-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoutIcon color="warning" />
        Konfirmasi Logout
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          Apakah Anda yakin ingin logout? Anda akan keluar dari sistem dan perlu login kembali.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          disabled={isLoading}
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
