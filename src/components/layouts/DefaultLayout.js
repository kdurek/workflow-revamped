import PropTypes from 'prop-types';

import Header from '../modules/Header';
import Footer from '../modules/Footer';

const DefaultLayout = ({children}) => {
  return (
    <div className="w-screen h-screen p-4 bg-gray-700">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.array,
};

export default DefaultLayout;
