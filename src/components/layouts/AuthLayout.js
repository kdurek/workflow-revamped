import PropTypes from 'prop-types';

import Card from '@/components/Card';
import Footer from '@/layouts/Footer';

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
