import {Provider} from 'next-auth/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import PropTypes from 'prop-types';

import {FetchProvider} from '@/app/contexts/AuthContext';
import '@/app/styles/tailwind.css';

const CustomApp = ({Component, pageProps}) => {
  const queryClient = new QueryClient();

  return (
    <Provider session={pageProps.session}>
      <FetchProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </FetchProvider>
    </Provider>
  );
};

CustomApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default CustomApp;
