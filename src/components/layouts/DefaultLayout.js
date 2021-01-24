import PropTypes from 'prop-types';

import Header from '../modules/Header';
import Footer from '../modules/Footer';

const DefaultLayout = ({user, children}) => {
  return (
    <div className="bg-coolGray-100">
      <div className="container grid w-screen h-screen p-4 mx-auto grid-rows-pancake">
        <Header user={user} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.array,
};

export default DefaultLayout;
