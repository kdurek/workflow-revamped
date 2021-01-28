import PropTypes from 'prop-types';

import Footer from '../modules/Footer';

const AuthLayout = ({children}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-4 md:bg-white md:shadow-2xl md:rounded-xl">
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
