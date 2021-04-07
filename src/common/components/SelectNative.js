import PropTypes from 'prop-types';

const SelectNative = ({defaultValue, error, label, options, register}) => {
  return (
    <div className="w-full space-y-1">
      <label htmlFor={label} className="block text-sm font-medium text-gray-500">
        {error ? <span className="text-red-500">{error}</span> : label}
      </label>
      <div className="relative">
        <select
          defaultValue={defaultValue}
          id={label}
          className="relative w-full py-2 pl-4 pr-10 text-left transition bg-white rounded-md shadow cursor-default ring-1 ring-opacity-50 ring-gray-300 focus:ring-2 focus:ring-blue-300"
          {...register}
        >
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 pointer-events-none material-icons">
          unfold_more
        </span>
      </div>
    </div>
  );
};

SelectNative.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  register: PropTypes.object,
};

export default SelectNative;
