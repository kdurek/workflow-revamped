import {Provider} from 'next-auth/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import PropTypes from 'prop-types';

import {FetchProvider} from '@/app/contexts/FetchContext';
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
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.object),
};

CustomApp.defaultProps = {
  pageProps: {},
};

export default CustomApp;
