import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({children, fullWidth, onClick, square, type, variant}) => {
  const VARIANT_MAPS = {
    default: 'bg-gray-100 hover:bg-gray-200 text-gray-500 ring-gray-300',
    primary: 'bg-blue-100 hover:bg-blue-200 text-blue-500 ring-blue-300',
    danger: ' bg-red-100 hover:bg-red-200 text-red-500 ring-red-300',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        'flex items-center justify-center rounded-xl px-4 py-2 uppercase shadow font-medium ring-1 ring-opacity-25 transition focus:ring-2 focus:ring-opacity-100',
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
