import {createRoot} from 'react-dom/client';

import {GlobalStyles} from '@contentful/f36-components';
import {SDKProvider} from '@contentful/react-apps-toolkit';

import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const container = document.getElementById('root')!;
const root = createRoot(container);
const queryClient = new QueryClient()

root.render(
  <SDKProvider>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles/>
      <App/>
    </QueryClientProvider>
  </SDKProvider>
);
