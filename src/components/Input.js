import classNames from 'classnames';
import PropTypes from 'prop-types';

const Input = ({defaultValue, error, label, onChange, onClick, readOnly, type, value}) => {
  return (
    <div className="w-full">
      <label className="mb-1 text-sm font-medium text-coolGray-500">
        {error ? <span className="text-red-500">{error}</span> : label}
      </label>
      <input
        className={classNames(
          'w-full px-4 py-2 bg-white rounded-md shadow ring-1 ring-opacity-50 ring-coolGray-300 focus:ring-blue-500',
          {'ring-red-300 focus:ring-red-500': error}
        )}
        defaultValue={defaultValue}
        onChange={e => onChange(e.target.value)}
        onClick={onClick}
        readOnly={readOnly}
        type={type}
        value={value}
      />
    </div>
  );
};

Input.propTypes = {
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
