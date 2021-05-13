import PropTypes from 'prop-types';

import Card from '@/common/components/Card';

const AuthLayout = ({children}) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Card className="w-full max-w-xs space-y-4">{children}</Card>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
