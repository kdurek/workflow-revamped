import classNames from 'classnames';

const Button = ({primary, square, fullWidth, onClick, type, className, children}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        `flex items-center justify-center rounded-xl h-12 uppercase font-medium duration-300 transition-all focus:ring-2 ${className}`,
        {
          'bg-blue-400 text-white hover:bg-blue-500 hover:shadow-lg': primary,
          'bg-coolGray-100 hover:bg-coolGray-200 shadow-inner': !primary,
          'w-full': fullWidth,
          'w-48': !square && !fullWidth,
          'w-12 h-12 p-3': square,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
