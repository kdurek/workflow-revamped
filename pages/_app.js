import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'next-auth/client';
import PropTypes from 'prop-types';
import {ReactQueryDevtools} from 'react-query/devtools';

import {FetchProvider} from '@/context/AuthContext';
import '@/styles/tailwind.css';

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
