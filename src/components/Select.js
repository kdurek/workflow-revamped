import {useState, useRef} from 'react';
import classNames from 'classnames';

import useOnClickOutside from '@/hooks/useOnClickOutside';

const Select = ({fullWidth, label, options, setValue, value}) => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  const onOptionClicked = option => {
    setValue(option);
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className={classNames(
        'relative h-12 rounded-xl bg-coolGray-100 transition-all duration-300',
        {
          'bg-coolGray-200': value !== '',
          'w-full': fullWidth,
          'w-full md:w-48': !fullWidth,
          'ring-2': focus,
        }
      )}
    >
      <div className={classNames('flex items-center h-full justify-between')}>
        <button
          onClick={() => setOpen(!open)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={classNames(
            'flex items-center justify-between w-full h-full px-3 shadow-inner rounded-xl bg-coolGray-100 hover:bg-coolGray-200'
          )}
        >
          {value || label}
          {value === '' && <span className="rounded-xl material-icons">expand_more</span>}
        </button>
        {value !== '' && (
          <button onClick={() => setValue('')}>
            <span className="h-full p-3 rounded-xl material-icons bg-coolGray-200">close</span>
          </button>
        )}
      </div>
      {open && (
        <div className="absolute inset-x-0 top-0 z-10 border shadow-inner border-coolGray-200 rounded-xl mt-14 bg-coolGray-100">
          {options.map(option => (
            <button
              key={option}
              onClick={() => onOptionClicked(option)}
              className={classNames(
                'w-full h-full p-3 text-left hover:bg-coolGray-200 first:rounded-t-xl last:rounded-b-xl hover:shadow-inner'
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
