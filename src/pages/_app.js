import PropTypes from 'prop-types';
import '../styles/tailwind.css';

import {AuthProvider} from '../context/auth';

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
