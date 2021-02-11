import {useState, useRef} from 'react';
import classNames from 'classnames';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Select = ({label, fullWidth, value, setValue, options}) => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  const onOptionClicked = option => {
    setValue(option);
    setOpen(false);
  };

  const uniqueOptions = [...new Set(options.map(option => option[label.toLowerCase()]))];

  return (
    <div
      ref={ref}
      className={classNames(
        'relative h-12 rounded-xl text-coolGray-600 bg-coolGray-100 transition-all duration-300',
        {
          'bg-coolGray-200': value !== '',
          'w-full': fullWidth,
          'w-48': !fullWidth,
          'ring-2': focus,
        }
      )}
    >
      <div
        className={classNames('flex items-center h-full justify-between w-48', {
          'w-full': fullWidth,
        })}
      >
        <button
          onClick={() => setOpen(!open)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={classNames(
            'flex items-center justify-between w-full h-full px-3 shadow-inner rounded-xl bg-coolGray-100 hover:bg-coolGray-200'
          )}
        >
          <span>{value || label}</span>
          {value === '' && <span className="rounded-xl material-icons">expand_more</span>}
        </button>
        {value !== '' && (
          <button onClick={() => setValue('')} className="">
            <span className="h-full p-3 rounded-xl material-icons bg-coolGray-200">close</span>
          </button>
        )}
      </div>
      {open && (
        <div className="absolute inset-x-0 top-0 z-10 shadow-inner rounded-xl mt-14 bg-coolGray-100">
          {uniqueOptions.map(option => (
            <button
              key={option}
              onClick={() => onOptionClicked(option)}
              className={classNames(
                'w-full h-full p-3 text-left hover:bg-coolGray-200 first:rounded-t-xl last:rounded-b-xl hover:shadow-inner',
                {'w-full': fullWidth}
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
