import PropTypes from 'prop-types';
import '../src/styles/tailwind.css';

import {AuthProvider} from '../src/context/auth';

const CustomApp = ({Component, pageProps}) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

CustomApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default CustomApp;
