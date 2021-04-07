import {Menu} from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({children, className}) => {
  return (
    <Menu.Button
      className={classNames(
        'px-4 transition shadow-inner bg-coolGray-200 hover:bg-coolGray-300',
        className
      )}
    >
      {children}
    </Menu.Button>
  );
};

Button.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
};

const Items = ({children, className}) => {
  return (
    <Menu.Items
      className={classNames(
        'absolute right-0 w-60 bg-white divide-y py-1 divide-coolGray-100 ring-1 ring-opacity-50 ring-coolGray-300 rounded-md shadow-lg outline-none mt-14',
        className
      )}
    >
      {children}
    </Menu.Items>
  );
};

Items.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
};

const Item = ({children, className, onClick}) => {
  return (
    <Menu.Item>
      <button
        className={classNames(
          'w-full px-4 py-2 text-left text-coolGray-600 hover:bg-coolGray-300 hover:text-coolGray-900',
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </Menu.Item>
  );
};

Item.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const Dropdown = ({children}) => {
  return <Menu>{children}</Menu>;
};

Dropdown.Button = Button;
Dropdown.Items = Items;
Dropdown.Item = Item;

Dropdown.propTypes = {
  children: PropTypes.array,
};

export default Dropdown;
