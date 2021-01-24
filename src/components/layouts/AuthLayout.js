import PropTypes from 'prop-types';

import Footer from '../modules/Footer';

const AuthLayout = ({children}) => {
  return (
    <div className="grid h-screen bg-coolGray-100 place-content-center">
      <div className="container p-4 bg-white rounded-xl">
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
