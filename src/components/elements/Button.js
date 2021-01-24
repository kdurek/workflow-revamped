import classNames from 'classnames';

const Button = ({primary, fullWidth, onClick, type, className, children}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        `border rounded-xl py-2 px-8 font-medium transform hover:scale-95 transition-all ${className}`,
        {
          'border-blue-600 bg-blue-600 text-coolGray-100 hover:bg-blue-700 hover:border-blue-700': primary,
          'border-coolGray-600 hover:border-coolGray-700 bg-transparent text-coolGray-600 hover:text-coolGray-700': !primary,
          'w-full': fullWidth,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
