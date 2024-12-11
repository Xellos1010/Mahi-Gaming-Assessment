import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper';
import CustomQueryClientProvider from './providers/CustomQueryClientProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <CustomQueryClientProvider>
      <AppWrapper />
    </CustomQueryClientProvider>
  </StrictMode>
);
