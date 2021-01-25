import classNames from 'classnames';

const countRows = content => {
  return content.split(/\r|\r\n|\n/).length;
};

const TextArea = ({
  resizable,
  rows,
  disabled,
  readOnly,
  value,
  onChange,
  onFocus,
  label,
  placeholder = 'Placeholder',
  className,
}) => {
  return (
    <div className={`${className}`}>
      <label className="text-sm font-medium text-coolGray-600">{label}</label>
      <div className="flex items-center gap-4 p-4 border border-coolGray-600 rounded-xl">
        <textarea
          rows={rows || countRows(value)}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          className={classNames(
            'w-full bg-transparent placeholder-coolGray-400 text-coolGray-600',
            {'resize-none': !resizable}
          )}
        />
      </div>
    </div>
  );
};

export default TextArea;
