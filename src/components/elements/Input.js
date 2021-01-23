import classNames from 'classnames';

const Input = ({
  type = 'text',
  icon,
  multiline,
  value,
  onChange,
  label,
  placeholder = 'Placeholder',
  className,
}) => {
  return (
    <div className={`${className}`}>
      <label className="text-sm font-medium text-white">{label}</label>
      <div className="flex items-center gap-4 p-4 border border-white rounded-xl">
        <span className="text-white material-icons">{icon}</span>
        {multiline ? (
          <textarea
            rows={3}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full text-white placeholder-white focus:outline-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full text-white placeholder-white placeholder-opacity-50 bg-transparent focus:outline-none"
          />
        )}
      </div>
    </div>
  );
};

export default Input;
