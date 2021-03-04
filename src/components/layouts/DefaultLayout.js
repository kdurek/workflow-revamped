import PropTypes from 'prop-types';

import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';

const DefaultLayout = ({children}) => {
  return (
    <div className="container grid min-h-screen p-4 mx-auto grid-rows-pancake">
      <Header />
      <div className="h-full">{children}</div>
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.array,
};

export default DefaultLayout;
