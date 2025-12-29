import { Outlet } from 'react-router-dom';
import { Provider } from '@/provider';

export default function RouterProviderWrapper() {
  return (
    <Provider>
      <Outlet />
    </Provider>
  );
}

