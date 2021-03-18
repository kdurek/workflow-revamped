import useClickOutside from '../hooks/useClickOutside';
import {Transition} from '@headlessui/react';
import {useRef, useState} from 'react';
import classNames from 'classnames';

const Select = ({label, optionLabel, options, value, setValue}) => {
  const [open, setOpen] = useState(false);

  const ref = useRef();
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative w-48 select-none">
      <label className="mb-1 text-sm font-medium text-coolGray-600">{label}</label>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-full py-2 pl-4 pr-8 text-left bg-white rounded-md shadow cursor-default ring-1 ring-coolGray-300 ring-opacity-50 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        {value ? (
          <span className="flex items-center">
            <span className="truncate">{optionLabel ? value[optionLabel] : value}</span>
          </span>
        ) : (
          <span className="flex items-center">
            <span className="truncate">Click to select...</span>
          </span>
        )}

        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-coolGray-400 material-icons">
          unfold_more
        </span>
      </button>
      <Transition
        show={open}
        leave="transition-all duration-100 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute z-40 w-full mt-1 bg-white rounded-md shadow-lg"
      >
        <ul className="py-1 overflow-auto rounded-md scrollbar scrollbar-thumb-coolGray-300 scrollbar-thumb-rounded-md scrollbar-thin max-h-56 ring-1 ring-coolGray-300 ring-opacity-50 focus:outline-none sm:text-sm">
          {options?.map((option, i) => (
            <li key={optionLabel ? option._id : i}>
              <button
                onClick={() => {
                  setOpen(false);
                  setValue(option);
                }}
                className={classNames(
                  'relative flex items-center w-full py-2 pl-4 pr-10 cursor-default group hover:bg-blue-500',
                  {'font-semibold': option === value}
                )}
              >
                <span className="truncate group-hover:text-white">
                  {optionLabel ? option[optionLabel] : option}
                </span>
                {option === value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500 group-hover:text-white material-icons">
                    check
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </Transition>
    </div>
  );
};

export default Select;
