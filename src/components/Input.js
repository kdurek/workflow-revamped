import PropTypes from 'prop-types';

const Input = ({defaultValue, label, onChange, onClick, readOnly, type, value}) => {
  return (
    <div className="w-full">
      <label className="mb-1 text-sm font-medium text-coolGray-600">{label}</label>
      <input
        className="w-full px-4 py-2 bg-white rounded-md shadow ring-1 ring-coolGray-300 ring-opacity-50 focus:ring-blue-500 focus:border-blue-500"
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
