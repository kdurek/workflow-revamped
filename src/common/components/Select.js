import {Listbox, Transition} from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Select = ({label, onChange, optionLabel, options, value}) => {
  return (
    <Listbox as="div" className="w-full space-y-1" value={value} onChange={onChange}>
      {({open}) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-500">{label}</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full py-2 pl-4 pr-10 text-left transition bg-white rounded-md shadow cursor-default ring-1 ring-opacity-50 ring-gray-300 focus:ring-blue-300">
              <span className="block truncate">
                {value ? (optionLabel ? value[optionLabel] : value) : 'Click to select...'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400 material-icons">
                unfold_more
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute z-40 w-full mt-1 bg-white rounded-md shadow-lg ring-1 ring-opacity-50 ring-gray-300"
            >
              <Listbox.Options
                static
                className="w-full py-1 overflow-auto rounded-md max-h-60 focus:outline-none"
              >
                {options?.map(option => (
                  <Listbox.Option
                    className="focus:outline-none"
                    key={optionLabel ? option._id : option}
                    value={option}
                  >
                    {({selected, active}) => (
                      <div
                        className={classNames(
                          'cursor-default select-none relative py-2 pl-10 pr-4',
                          {'text-white bg-blue-600': active}
                        )}
                      >
                        <span
                          className={classNames('block truncate', {
                            'font-semibold': selected,
                            'font-normal': !selected,
                          })}
                        >
                          {optionLabel ? option[optionLabel] : option}
                        </span>
                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 left-0 flex items-center pl-2 material-icons',
                              {
                                'text-white': active,
                                'text-blue-600': !active,
                              }
                            )}
                          >
                            check
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  optionLabel: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Select;
