import PropTypes from 'prop-types';

import Footer from '@/layouts/Footer';
import {NavBar} from '@/components/Navbar/Navbar';

const DefaultLayout = ({children}) => {
  return (
    <div className="container grid min-h-screen gap-4 p-4 mx-auto grid-rows-pancake">
      <NavBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.array,
};

export default DefaultLayout;
