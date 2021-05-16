import classNames from 'classnames';
import PropTypes from 'prop-types';

const Form = ({children, onSubmit, className, label}) => {
  return (
    <form
      className={classNames('space-y-4 p-4 rounded-xl bg-white shadow', className)}
      onSubmit={onSubmit}
    >
      <>
        <span className="text-xl font-medium select-none">{label}</span>
        {children}
      </>
    </form>
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
