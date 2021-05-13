import classNames from 'classnames';
import PropTypes from 'prop-types';

import Card from '@/common/components/Card';

const Form = ({children, onSubmit, className}) => {
  return (
    <Card className="p-4">
      <form className={classNames('space-y-4', className)} onSubmit={onSubmit}>
        {children}
      </form>
    </Card>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Form.defaultProps = {
  className: undefined,
};

export default Form;
