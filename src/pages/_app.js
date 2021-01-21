import PropTypes from 'prop-types';

import '../styles/tailwind.css';

const CustomApp = ({Component, pageProps}) => {
  return <Component {...pageProps} />;
};

CustomApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default CustomApp;
