import PropTypes from 'prop-types';
import Header from '@/modules/Header';
import Footer from '@/modules/Footer';

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
