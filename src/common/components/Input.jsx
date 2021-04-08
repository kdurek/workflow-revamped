import classNames from 'classnames';
import PropTypes from 'prop-types';

const Input = ({
  defaultValue,
  error,
  label,
  onChange,
  onClick,
  readOnly,
  type,
  value,
  register,
}) => {
  return (
    <div className="w-full space-y-1">
      <label htmlFor={label} className="block text-sm font-medium text-gray-500">
        {error ? <span className="text-red-500">{error}</span> : label}
      </label>
      <input
        id={label}
        className={classNames(
          'w-full px-4 py-2 transition bg-white rounded-md shadow ring-1 ring-opacity-50 ring-gray-300 focus:ring-2 focus:ring-blue-300',
          {'ring-red-300 focus:ring-red-400': error}
        )}
        defaultValue={defaultValue}
        onChange={onChange}
        onClick={onClick}
        readOnly={readOnly}
        type={type}
        value={value}
        {...register}
      />
    </div>
  );
};

Input.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool,
  register: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    ref: PropTypes.func,
  }),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  defaultValue: undefined,
  error: undefined,
  label: undefined,
  onChange: undefined,
  onClick: undefined,
  readOnly: false,
  register: {},
  type: 'text',
  value: undefined,
};

export default Input;
