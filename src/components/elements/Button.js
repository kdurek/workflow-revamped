import classNames from 'classnames';

const Button = ({primary, fullWidth, onClick, type, className, children}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        `rounded-xl h-12 uppercase font-medium duration-300 hover:shadow-lg transition-all focus:ring-2 ${className}`,
        {
          'bg-blue-400 text-white hover:bg-blue-500': primary,
          'bg-transparent text-coolGray-600': !primary,
          'w-full': fullWidth,
          'w-48': !fullWidth,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
