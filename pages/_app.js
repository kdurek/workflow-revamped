import {Provider} from 'next-auth/client';
import PropTypes from 'prop-types';

import {FetchProvider} from '@/context/FetchContext';
import '@/styles/tailwind.css';

const CustomApp = ({Component, pageProps}) => {
  return (
    <Provider session={pageProps.session}>
      <FetchProvider>
        <Component {...pageProps} />
      </FetchProvider>
    </Provider>
  );
};

CustomApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default CustomApp;
