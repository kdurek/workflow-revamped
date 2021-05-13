import classNames from 'classnames';
import PropTypes from 'prop-types';

import Card from '@/common/components/Card';

const Form = ({children, onSubmit, className, label}) => {
  return (
    <Card>
      <form className={classNames('space-y-4', className)} onSubmit={onSubmit}>
        <>
          <span className="text-xl font-medium select-none">{label}</span>
          {children}
        </>
      </form>
    </Card>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
};

Form.defaultProps = {
  className: undefined,
  label: undefined,
};

export default Form;
