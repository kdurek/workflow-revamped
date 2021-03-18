import PropTypes from 'prop-types';

const Input = ({label, value, setValue}) => {
  return (
    <div className="w-48">
      <label className="mb-1 text-sm font-medium text-coolGray-600">{label}</label>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full py-2 pl-4 pr-8 bg-white rounded-md shadow ring-1 ring-coolGray-300 ring-opacity-50 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default Input;
