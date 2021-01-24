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
      <label className="text-sm font-medium text-coolGray-600">{label}</label>
      <div className="flex items-center gap-4 p-4 border border-coolGray-600 rounded-xl">
        <span className="text-coolGray-600 material-icons">{icon}</span>
        {multiline ? (
          <textarea
            rows={6}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent placeholder-coolGray-400 text-coolGray-600"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent placeholder-coolGray-400 text-coolGray-600"
          />
        )}
      </div>
    </div>
  );
};

export default Input;
