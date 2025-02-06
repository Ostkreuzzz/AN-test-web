import { AlertColor } from '@mui/material';

export interface Message {
  type: AlertColor;
  text: string;
  isMessage: boolean;
}
