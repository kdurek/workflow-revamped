import classNames from 'classnames';

const Input = ({
  className,
  disabled,
  fullWidth,
  label = 'Label',
  onChange,
  onFocus,
  readOnly,
  type = 'text',
  value,
}) => {
  return (
    <div
      className={classNames(`relative floating-input ${className}`, {
        'w-full': fullWidth,
        'w-full md:w-48': !fullWidth,
      })}
    >
      <input
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        id={label}
        className={classNames(
          'h-12 py-4 w-full focus:ring-2 transition-all duration-300 px-3 bg-transparent shadow-inner bg-coolGray-100 rounded-xl focus:outline-none placeholder-transparent'
        )}
        placeholder={label}
        autoComplete="off"
      />

      <label
        htmlFor={label}
        className="absolute top-0 left-0 h-full px-3 py-3 transition-all duration-300 origin-left transform pointer-events-none text-coolGray-400"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
