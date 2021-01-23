import classNames from 'classnames';

const Button = ({primary, fullWidth, onClick, type, className, children}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        `border rounded-xl py-2 px-8 focus:outline-none font-medium ${className}`,
        {
          'border-blue-700 bg-blue-700 text-white hover:bg-blue-800 hover:border-blue-800 hover:text-opacity-40 transition-all duration-300': primary,
          'border-white bg-transparent text-white': !primary,
          'w-full': fullWidth,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
