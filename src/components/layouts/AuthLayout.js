import PropTypes from 'prop-types';

import Footer from '../modules/Footer';

const AuthLayout = ({children}) => {
  return (
    <div className="container grid h-screen mx-auto place-content-center">
      {children}
      <Footer />
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.array,
};

export default AuthLayout;
