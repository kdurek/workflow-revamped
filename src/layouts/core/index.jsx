import PropTypes from 'prop-types';

import NavBar from '@/layouts/core/Navbar';
import Footer from '@/layouts/core/Footer';

const DefaultLayout = ({children}) => {
  return (
    <div className="container grid min-h-screen gap-4 p-4 mx-auto grid-rows-pancake">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
