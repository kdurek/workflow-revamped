import classNames from 'classnames';

const Button = ({primary, fullWidth, onClick, type, className, children}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        `rounded-xl py-2 px-8 font-medium transform focus:scale-95 duration-300 hover:shadow-lg transition-all ${className}`,
        {
          'bg-blue-400 text-white hover:bg-blue-500': primary,
          'bg-transparent text-coolGray-600': !primary,
          'w-full': fullWidth,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
