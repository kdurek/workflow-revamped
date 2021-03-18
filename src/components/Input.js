import PropTypes from 'prop-types';

const Input = ({label, setValue, type, value}) => {
  return (
    <div className="w-48">
      <label className="mb-1 text-sm font-medium text-coolGray-600">{label}</label>
      <input
        className="w-full py-2 pl-4 pr-8 bg-white rounded-md shadow ring-1 ring-coolGray-300 ring-opacity-50 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        onChange={e => setValue(e.target.value)}
        type={type}
        value={value}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  setValue: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
