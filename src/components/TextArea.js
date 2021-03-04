import classNames from 'classnames';

const countRows = content => {
  return content.split(/\r|\r\n|\n/).length;
};

const TextArea = ({
  className,
  disabled,
  fullWidth,
  label,
  onChange,
  onFocus,
  placeholder = 'Placeholder',
  readOnly,
  resizable,
  rows,
  value,
}) => {
  return (
    <div
      className={classNames(`rounded-xl px-3 bg-coolGray-100 shadow-inner ${className}`, {
        'w-full': fullWidth,
        'w-48': !fullWidth,
      })}
    >
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
          className={classNames('bg-transparent placeholder-coolGray-400 ', {
            'resize-none': !resizable,
            'w-full': fullWidth,
            'w-48': !fullWidth,
          })}
        />
      </div>
    </div>
  );
};

export default TextArea;
