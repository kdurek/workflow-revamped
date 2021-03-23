import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({children, fullWidth, onClick, square, type, variant}) => {
  const VARIANT_MAPS = {
    default: 'bg-coolGray-100 hover:bg-coolGray-200 shadow-inner',
    primary: 'bg-blue-400 text-white hover:bg-blue-500 hover:shadow-lg',
    danger: 'bg-red-400 text-white hover:bg-red-500 hover:shadow-lg',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        'flex items-center justify-center rounded-xl px-4 py-2 uppercase font-medium duration-300 transition-all focus:ring-2',
        VARIANT_MAPS[variant],
        {
          'w-full': fullWidth,
          'w-10 h-10': square,
        }
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  square: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
};

Button.defaultProps = {
  children: 'button',
  variant: 'default',
};

export default Button;
