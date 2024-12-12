import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import AppLayout from './AppLayout';
import CustomQueryClientProvider from './providers/CustomQueryClientProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <CustomQueryClientProvider>
      <AppLayout />
    </CustomQueryClientProvider>
  </StrictMode>
);
