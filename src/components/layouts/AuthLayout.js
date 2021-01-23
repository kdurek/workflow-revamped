import PropTypes from 'prop-types';

import Footer from '../modules/Footer';

const AuthLayout = ({children}) => {
  return (
    <div className="grid h-screen mx-auto bg-gray-800 place-content-center">
      <div className="container">
        {children}
        <Footer />
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.array,
};

export default AuthLayout;
