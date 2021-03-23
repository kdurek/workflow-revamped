import PropTypes from 'prop-types';

const Input = ({label, onChange, onClick, type, value}) => {
  return (
    <div className="w-full">
      <label className="mb-1 text-sm font-medium text-coolGray-600">{label}</label>
      <input
        className="w-full px-4 py-2 bg-white rounded-md shadow ring-1 ring-coolGray-300 ring-opacity-50 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        onChange={e => onChange(e.target.value)}
        onClick={onClick}
        type={type}
        value={value}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
