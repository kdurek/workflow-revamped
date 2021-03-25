import PropTypes from 'prop-types';

import Footer from '@/layouts/Footer';
import Card from '../Card';

const AuthLayout = ({children}) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Card className="p-4">
        {children}
        <Footer />
      </Card>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.array,
};

export default AuthLayout;
