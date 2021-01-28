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
    <div className={`rounded-xl px-3 bg-coolGray-100 shadow-inner ${className}`}>
      <label className="text-xs text-coolGray-400">{label}</label>
      <div className="flex items-center gap-4 py-1 rounded-xl">
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
            {
              'resize-none': !resizable,
            }
          )}
        />
      </div>
    </div>
  );
};

export default TextArea;
