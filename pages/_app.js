import '@/styles/tailwind.css';

import PropTypes from 'prop-types';
import {AuthProvider} from '@/context/AuthContext';
import {ConfigProvider} from '@/context/ConfigContext';

const CustomApp = ({Component, pageProps}) => {
  return (
    <AuthProvider>
      <ConfigProvider>
        <Component {...pageProps} />
      </ConfigProvider>
    </AuthProvider>
  );
};

CustomApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default CustomApp;
