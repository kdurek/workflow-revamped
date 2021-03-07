import {useRef} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Hydrate} from 'react-query/hydration';
import {Provider} from 'next-auth/client';
import PropTypes from 'prop-types';
import {ReactQueryDevtools} from 'react-query/devtools';

import {FetchProvider} from '@/context/FetchContext';
import '@/styles/tailwind.css';

const CustomApp = ({Component, pageProps}) => {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <Provider session={pageProps.session}>
      <FetchProvider>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
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
